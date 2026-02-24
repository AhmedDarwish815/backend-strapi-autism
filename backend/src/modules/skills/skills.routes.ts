import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import {
    getCategoriesController,
    getItemsByCategoryController,
    getItemByIdController,
    logSkillController,
} from "./skills.controller";
import { validate } from "../../utils/validate";
import { getItemsByCategorySchema, getSkillItemByIdSchema, logSkillSchema } from "./skills.schemas";


const router = Router();

// ==========================================
// Basic Retrieval Routes
// ==========================================
router.get("/categories", requireAuth, getCategoriesController);

router.get(
    "/categories/:category",
    requireAuth,
    validate(getItemsByCategorySchema),
    getItemsByCategoryController
);

router.get(
    "/items/:itemId",
    requireAuth,
    validate(getSkillItemByIdSchema),
    getItemByIdController
);

// ==========================================
// Log Interaction (Child)
// ==========================================
// Notice this uses authenticate (either child or parent could potentially view, but logic prefers childId)
// Usually you'd restrict modifying progress to the child token, but here we allow it broadly
router.post(
    "/items/:itemId/log",
    requireAuth,
    validate(logSkillSchema),
    logSkillController
);

export default router;
