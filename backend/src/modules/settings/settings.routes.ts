import { Router } from "express";
import {
    getProfileController,
    updateProfileController,
    changePasswordController,
    getSensoryController,
    updateSensoryController,
} from "./settings.controller";
import { requireAuth, requireParent } from "../../middlewares/auth";
import { validate } from "../../utils/validate";
import { updateProfileSchema, changePasswordSchema } from "./settings.schemas";

const router = Router();

// ==========================================
// ✅ Settings Routes
// ==========================================

// الحصول على البروفايل
router.get("/profile", requireAuth, requireParent, getProfileController);

// تحديث البروفايل
router.patch(
    "/profile",
    requireAuth,
    requireParent,
    validate(updateProfileSchema),
    updateProfileController
);

// تغيير كلمة المرور
router.post(
    "/change-password",
    requireAuth,
    requireParent,
    validate(changePasswordSchema),
    changePasswordController
);

// ✅ إعدادات حسية للطفل
router.get("/sensory/:childId", requireAuth, requireParent, getSensoryController);
router.patch("/sensory/:childId", requireAuth, requireParent, updateSensoryController);

export default router;