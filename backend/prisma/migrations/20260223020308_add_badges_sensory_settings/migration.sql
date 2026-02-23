-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('SONGS', 'SPORTS', 'MATH', 'COOKING', 'DRAWING', 'COMPUTER', 'MUSIC', 'SCIENCE', 'STORIES');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('IMAGE', 'AUDIO', 'VIDEO', 'TEXT');

-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'MATCH');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BadgeType" ADD VALUE 'SKILL_MASTER';
ALTER TYPE "BadgeType" ADD VALUE 'QUIZ_CHAMPION';
ALTER TYPE "BadgeType" ADD VALUE 'FIRST_LESSON';
ALTER TYPE "BadgeType" ADD VALUE 'CATEGORY_MASTER';

-- AlterTable
ALTER TABLE "ChildProfile" ADD COLUMN     "largeFonts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reducedColors" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "soundEnabled" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "SkillItem" (
    "id" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "difficulty" "DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "ageMin" INTEGER NOT NULL DEFAULT 3,
    "ageMax" INTEGER NOT NULL DEFAULT 12,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillContent" (
    "id" TEXT NOT NULL,
    "skillItemId" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "url" TEXT,
    "text" TEXT,
    "title" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkillContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillQuiz" (
    "id" TEXT NOT NULL,
    "skillItemId" TEXT NOT NULL,
    "type" "QuizType" NOT NULL,
    "question" TEXT NOT NULL,
    "imageUrl" TEXT,
    "audioUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkillQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizOption" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuizOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildPreference" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChildPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillProgress" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "skillItemId" TEXT NOT NULL,
    "level" "DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "score" INTEGER NOT NULL DEFAULT 0,
    "bestScore" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillLog" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "skillItemId" TEXT NOT NULL,
    "score" INTEGER,
    "timeSpent" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkillLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SkillItem_category_idx" ON "SkillItem"("category");

-- CreateIndex
CREATE INDEX "SkillItem_difficulty_idx" ON "SkillItem"("difficulty");

-- CreateIndex
CREATE INDEX "SkillItem_isActive_idx" ON "SkillItem"("isActive");

-- CreateIndex
CREATE INDEX "SkillContent_skillItemId_idx" ON "SkillContent"("skillItemId");

-- CreateIndex
CREATE INDEX "SkillContent_type_idx" ON "SkillContent"("type");

-- CreateIndex
CREATE INDEX "SkillQuiz_skillItemId_idx" ON "SkillQuiz"("skillItemId");

-- CreateIndex
CREATE INDEX "QuizOption_quizId_idx" ON "QuizOption"("quizId");

-- CreateIndex
CREATE INDEX "ChildPreference_childId_idx" ON "ChildPreference"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "ChildPreference_childId_category_key" ON "ChildPreference"("childId", "category");

-- CreateIndex
CREATE INDEX "SkillProgress_childId_idx" ON "SkillProgress"("childId");

-- CreateIndex
CREATE INDEX "SkillProgress_skillItemId_idx" ON "SkillProgress"("skillItemId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillProgress_childId_skillItemId_key" ON "SkillProgress"("childId", "skillItemId");

-- CreateIndex
CREATE INDEX "SkillLog_childId_idx" ON "SkillLog"("childId");

-- CreateIndex
CREATE INDEX "SkillLog_skillItemId_idx" ON "SkillLog"("skillItemId");

-- CreateIndex
CREATE INDEX "SkillLog_viewedAt_idx" ON "SkillLog"("viewedAt");

-- AddForeignKey
ALTER TABLE "SkillContent" ADD CONSTRAINT "SkillContent_skillItemId_fkey" FOREIGN KEY ("skillItemId") REFERENCES "SkillItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillQuiz" ADD CONSTRAINT "SkillQuiz_skillItemId_fkey" FOREIGN KEY ("skillItemId") REFERENCES "SkillItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOption" ADD CONSTRAINT "QuizOption_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "SkillQuiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildPreference" ADD CONSTRAINT "ChildPreference_childId_fkey" FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillProgress" ADD CONSTRAINT "SkillProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillProgress" ADD CONSTRAINT "SkillProgress_skillItemId_fkey" FOREIGN KEY ("skillItemId") REFERENCES "SkillItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLog" ADD CONSTRAINT "SkillLog_childId_fkey" FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillLog" ADD CONSTRAINT "SkillLog_skillItemId_fkey" FOREIGN KEY ("skillItemId") REFERENCES "SkillItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
