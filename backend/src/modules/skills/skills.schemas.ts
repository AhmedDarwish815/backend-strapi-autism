import { z } from "zod";
import { SkillCategory } from "@prisma/client";

export const getItemsByCategorySchema = z.object({
    params: z.object({
        category: z.nativeEnum(SkillCategory, { message: "Invalid category" }),
    }),
});

export const getSkillItemByIdSchema = z.object({
    params: z.object({
        itemId: z.string().uuid("Invalid item ID format"),
    }),
});

export const logSkillSchema = z.object({
    params: z.object({
        itemId: z.string().uuid("Invalid item ID format"),
    }),
    body: z.object({
        score: z.number().optional(),
        timeSpent: z.number().optional(),
        completed: z.boolean().optional(),
    }).optional(),
});
