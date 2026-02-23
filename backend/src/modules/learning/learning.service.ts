import { prisma } from "../../config/prisma";
import { LearningCategory } from "@prisma/client";

const ALL_CATEGORIES = [
    { key: "PEOPLE", label: "People", emoji: "👨‍👩‍👧" },
    { key: "SCHOOL", label: "School", emoji: "🏫" },
    { key: "ANIMALS", label: "Animals", emoji: "🐾" },
    { key: "COLORS", label: "Colors", emoji: "🎨" },
    { key: "NUMBERS", label: "Numbers", emoji: "🔢" },
    { key: "ARABIC_ALPHABET", label: "Arabic Alphabet", emoji: "ا" },
    { key: "ENGLISH_ALPHABET", label: "English Alphabet", emoji: "A" },
    { key: "CONVERSATION", label: "Conversation", emoji: "💬" },
    { key: "EMOTIONS", label: "Emotions", emoji: "😊" },
    { key: "COMMUNICATION", label: "Communication", emoji: "🗣️" },
];

// ==========================================
// Get all categories
// ==========================================
export const getCategories = async () => {
    return ALL_CATEGORIES;
};

// ==========================================
// Get items by category
// ==========================================
export const getItemsByCategory = async (category: string) => {
    if (!Object.values(LearningCategory).includes(category as LearningCategory)) {
        throw Object.assign(new Error("Invalid category"), { status: 400 });
    }

    const items = await prisma.learningItem.findMany({
        where: { category: category as LearningCategory },
        select: {
            id: true,
            category: true,
            title: true,
            imageUrl: true,
            audioUrl: true,
            phrases: true,
            sortOrder: true,
        },
        orderBy: { sortOrder: "asc" },
    });

    return items;
};

// ==========================================
// Get single item
// ==========================================
export const getItemById = async (itemId: string) => {
    const item = await prisma.learningItem.findUnique({
        where: { id: itemId },
        select: {
            id: true,
            category: true,
            title: true,
            imageUrl: true,
            audioUrl: true,
            phrases: true,
            sortOrder: true,
        },
    });

    if (!item) {
        throw Object.assign(new Error("Item not found"), { status: 404 });
    }

    return item;
};

// ==========================================
// Log learning (child viewed item)
// ==========================================
export const logLearning = async (childId: string, itemId: string) => {
    const item = await prisma.learningItem.findUnique({
        where: { id: itemId },
        select: { id: true, category: true },
    });

    if (!item) {
        throw Object.assign(new Error("Item not found"), { status: 404 });
    }

    await prisma.learningLog.create({
        data: { childId, itemId },
    });

    // ✅ اضف نجمة للطفل عند كل تعلم
    await addStarToChild(childId, 1);

    // ✅ تشيك على badges التعلم
    await checkLearningBadges(childId, item.category);

    return { ok: true, message: "Learning logged successfully" };
};

// ==========================================
// Helper: Add stars to child + Level Up
// ==========================================
const STARS_PER_LEVEL = 20;

export const addStarToChild = async (childId: string, stars: number) => {
    const reward = await prisma.reward.upsert({
        where: { childId },
        create: {
            childId,
            stars,
            totalStars: stars,
            level: 1,
        },
        update: {
            stars: { increment: stars },
            totalStars: { increment: stars },
        },
    });

    // ✅ Level Up Logic — لما يجمع نجوم كافية يطلع level
    const newLevel = Math.floor(reward.totalStars / STARS_PER_LEVEL) + 1;
    if (newLevel > reward.level) {
        await prisma.reward.update({
            where: { childId },
            data: {
                level: newLevel,
                stars: reward.stars - STARS_PER_LEVEL, // reset stars للـ level الجديد
            },
        });
    }
};

// ==========================================
// Helper: Check Learning Badges
// ==========================================
const checkLearningBadges = async (childId: string, category: LearningCategory) => {
    // 🏅 FIRST_LESSON badge — أول مرة يتعلم حاجة
    const totalLearned = await prisma.learningLog.count({ where: { childId } });
    if (totalLearned === 1) {
        await prisma.badge.upsert({
            where: { childId_type: { childId, type: "FIRST_LESSON" } },
            create: { childId, type: "FIRST_LESSON" },
            update: {},
        });
    }

    // 🏅 CATEGORY_MASTER — لما يخلّص category كاملة
    const totalInCategory = await prisma.learningItem.count({
        where: { category },
    });
    const viewedInCategory = await prisma.learningLog.count({
        where: {
            childId,
            item: { category },
        },
    });
    if (viewedInCategory >= totalInCategory && totalInCategory > 0) {
        await prisma.badge.upsert({
            where: { childId_type: { childId, type: "CATEGORY_MASTER" } },
            create: { childId, type: "CATEGORY_MASTER" },
            update: {},
        });
    }
};