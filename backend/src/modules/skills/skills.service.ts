import { prisma } from "../../config/prisma";
import { SkillCategory } from "@prisma/client";
import { addStarToChild } from "../learning/learning.service";

const ALL_SKILLS_CATEGORIES = [
    { key: "SONGS", label: "Songs", emoji: "🎤" },
    { key: "SPORTS", label: "Sports", emoji: "⚽" },
    { key: "MATH", label: "Math", emoji: "🔢" },
    { key: "COOKING", label: "Cooking", emoji: "🍳" },
    { key: "DRAWING", label: "Drawing", emoji: "🎨" },
    { key: "COMPUTER", label: "Computer", emoji: "💻" },
    { key: "MUSIC", label: "Music", emoji: "🎵" },
    { key: "SCIENCE", label: "Science", emoji: "🔬" },
    { key: "STORIES", label: "Stories", emoji: "📖" },
];

export const getCategories = async () => {
    return ALL_SKILLS_CATEGORIES;
};

export const getItemsByCategory = async (category: string) => {
    if (!Object.values(SkillCategory).includes(category as SkillCategory)) {
        throw Object.assign(new Error("Invalid category"), { status: 400 });
    }

    const items = await prisma.skillItem.findMany({
        where: { category: category as SkillCategory, isActive: true },
        select: {
            id: true,
            category: true,
            title: true,
            description: true,
            imageUrl: true,
            difficulty: true,
            sortOrder: true,
            contents: {
                select: {
                    id: true,
                    type: true,
                    title: true,
                    text: true,
                    url: true,
                },
                orderBy: { sortOrder: "asc" }
            },
            quizzes: {
                select: {
                    id: true,
                    type: true,
                    question: true,
                    options: {
                        select: {
                            id: true,
                            text: true,
                            isCorrect: true
                        },
                        orderBy: { sortOrder: "asc" }
                    }
                },
                orderBy: { sortOrder: "asc" }
            }
        },
        orderBy: { sortOrder: "asc" },
    });

    return items;
};

export const getItemById = async (itemId: string) => {
    const item = await prisma.skillItem.findUnique({
        where: { id: itemId },
        include: {
            contents: { orderBy: { sortOrder: "asc" } },
            quizzes: {
                include: { options: { orderBy: { sortOrder: "asc" } } },
                orderBy: { sortOrder: "asc" }
            }
        }
    });

    if (!item) {
        throw Object.assign(new Error("Item not found"), { status: 404 });
    }

    return item;
};

export const logSkill = async (childId: string, itemId: string, scoreParam?: number, timeSpentParam?: number, completedParam?: boolean) => {
    // Since skills are managed in Strapi, the itemId here is actually the Strapi documentId.
    // To satisfy Prisma's foreign key constraint on SkillLog and SkillProgress, 
    // we upsert a dummy SkillItem in our local DB if it doesn't exist yet.
    await prisma.skillItem.upsert({
        where: { id: itemId },
        create: {
            id: itemId,
            category: "SONGS", // Default placeholder
            title: "Strapi Skill Item",
            difficulty: "EASY",
            isActive: true
        },
        update: {}
    });

    const completed = completedParam ?? true;

    await prisma.skillLog.create({
        data: {
            childId,
            skillItemId: itemId,
            score: scoreParam,
            timeSpent: timeSpentParam,
            completed
        },
    });

    const currentProgress = await prisma.skillProgress.findUnique({
        where: { childId_skillItemId: { childId, skillItemId: itemId } }
    });

    await prisma.skillProgress.upsert({
        where: { childId_skillItemId: { childId, skillItemId: itemId } },
        create: {
            childId,
            skillItemId: itemId,
            level: "EASY",
            score: scoreParam || 0,
            bestScore: scoreParam || 0,
            attempts: 1,
            completed,
            completedAt: completed ? new Date() : null
        },
        update: {
            score: scoreParam || 0,
            bestScore: Math.max(currentProgress?.bestScore || 0, scoreParam || 0),
            attempts: { increment: 1 },
            completed: completed || currentProgress?.completed,
            completedAt: completed && !currentProgress?.completed ? new Date() : undefined
        }
    });

    if (completed) {
        await addStarToChild(childId, 2);
    }

    return { ok: true, message: "Skill progress logged successfully" };
};
