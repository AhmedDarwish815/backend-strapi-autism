import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/auth";
import { getProfile, updateProfile, changePassword, getSensorySettings, updateSensorySettings } from "./settings.service";

// ==========================================
// ✅ Controller: الحصول على البروفايل
// ==========================================
export const getProfileController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.userId;
        const profile = await getProfile(userId);
        return res.json(profile);
    } catch (err) {
        next(err);
    }
};

// ==========================================
// ✅ Controller: تحديث البروفايل
// ==========================================
export const updateProfileController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.userId;
        const { fullName, phone } = req.body;

        const user = await updateProfile(userId, { fullName, phone });
        return res.json(user);
    } catch (err) {
        next(err);
    }
};

// ==========================================
// ✅ Controller: تغيير كلمة المرور
// ==========================================
export const changePasswordController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.userId;
        const { currentPassword, newPassword } = req.body;

        const result = await changePassword(userId, currentPassword, newPassword);
        return res.json(result);
    } catch (err) {
        next(err);
    }
};

// ==========================================
// ✅ Controller: إعدادات حسية
// ==========================================
export const getSensoryController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const parentId = req.user!.userId;
        const childId = req.params.childId as string;
        const settings = await getSensorySettings(parentId, childId);
        return res.json(settings);
    } catch (err) {
        next(err);
    }
};

export const updateSensoryController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const parentId = req.user!.userId;
        const childId = req.params.childId as string;
        const settings = await updateSensorySettings(parentId, childId, req.body);
        return res.json(settings);
    } catch (err) {
        next(err);
    }
};