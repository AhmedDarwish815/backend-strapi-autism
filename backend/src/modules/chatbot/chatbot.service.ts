import { prisma } from "../../config/prisma";

export const createChatSession = async (
    userId: string,
    title?: string
) => {
    const session = await prisma.chatSession.create({
        data: {
            userId,
            title: title || "New Chat",
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return session;
};

export const getChatSessions = async (
    userId: string,
    limit = 20,
    offset = 0
) => {
    const sessions = await prisma.chatSession.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: { messages: true },
            },
        },
        orderBy: { updatedAt: "desc" },
        take: limit,
        skip: offset,
    });

    return sessions.map((session) => ({
        id: session.id,
        title: session.title,
        messagesCount: session._count.messages,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
    }));
};

export const getChatMessages = async (
    sessionId: string,
    userId: string,
    limit = 50,
    offset = 0
) => {
    const session = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId },
        select: { id: true },
    });

    if (!session) {
        throw Object.assign(new Error("Chat session not found"), { status: 404 });
    }

    const messages = await prisma.chatMessage.findMany({
        where: { sessionId },
        select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
        },
        orderBy: { createdAt: "asc" },
        take: limit,
        skip: offset,
    });

    return messages;
};

export const sendMessage = async (
    sessionId: string,
    userId: string,
    content: string
) => {
    if (!content || content.trim().length === 0) {
        throw Object.assign(new Error("Message content is required"), { status: 400 });
    }

    const session = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId },
        select: { id: true },
    });

    if (!session) {
        throw Object.assign(new Error("Chat session not found"), { status: 404 });
    }

    const userMessage = await prisma.chatMessage.create({
        data: {
            sessionId,
            role: "user",
            content: content.trim(),
        },
        select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
        },
    });

    const history = await prisma.chatMessage.findMany({
        where: { sessionId },
        select: { role: true, content: true },
        orderBy: { createdAt: "asc" },
    });

    const aiResponse = await generateAIResponse(history);

    const assistantMessage = await prisma.chatMessage.create({
        data: {
            sessionId,
            role: "assistant",
            content: aiResponse,
        },
        select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
        },
    });


    await prisma.chatSession.update({
        where: { id: sessionId },
        data: { updatedAt: new Date() },
    });

    return { userMessage, assistantMessage };
};


async function generateAIResponse(
    history: { role: string; content: string }[]
): Promise<string> {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        throw Object.assign(new Error("GROQ_API_KEY is not configured"), { status: 500 });
    }


    const messages = [
        {
            role: "system",
            content: `You are "Autimate Assistant", a compassionate, knowledgeable AI helper for parents of children with autism spectrum disorder (ASD).

LANGUAGE: If the user writes in Arabic, respond in Arabic. If in English, respond in English.

YOUR EXPERTISE:
- Applied Behavior Analysis (ABA) strategies
- Picture Exchange Communication System (PECS)
- Sensory processing and sensory-friendly environments
- Social skills and communication development
- Daily routine building for autistic children
- Emotional regulation techniques
- Play-based learning activities

GUIDELINES:
1. Be warm, patient, and encouraging — parents are doing their best
2. Give practical, actionable advice with step-by-step instructions
3. Suggest specific activities the child can do (drawing, music, cooking, puzzles)
4. Celebrate every small win — progress looks different for every child
5. NEVER diagnose — always recommend consulting a specialist/doctor
6. Acknowledge the parent's feelings and validate their experiences
7. Keep responses concise but helpful (under 200 words when possible)
8. Use emojis sparingly to keep a friendly tone 😊`,
        },
        ...history.map((msg) => ({
            role: msg.role,
            content: msg.content,
        })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Groq API error:", error);
        throw Object.assign(new Error("AI service error"), { status: 502 });
    }

    const data = await response.json() as any;
    return data.choices[0].message.content;
}


export const deleteChatSession = async (
    sessionId: string,
    userId: string
) => {
    const session = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId },
        select: { id: true },
    });

    if (!session) {
        throw Object.assign(new Error("Chat session not found"), { status: 404 });
    }

    await prisma.chatSession.delete({
        where: { id: sessionId },
    });

    return { ok: true, message: "Chat session deleted successfully" };
};