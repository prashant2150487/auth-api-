import { verifyToken } from '../utils/jwt.js';
import User from "../models/User.js";
import Role from "../models/Role.js";

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// Authorize by role name(s)
export const authorizeRoles = (allowedRoles = []) => {
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const user = await User.findByPk(req.user.id, { include: [{ model: Role, as: "role" }] });
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const userRoleName = user.role?.name;
      if (!userRoleName || (allowed.length > 0 && !allowed.includes(userRoleName))) {
        return res.status(403).json({ success: false, message: "Forbidden: insufficient role" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to authorize role" });
    }
  };
};

// Authorize by permission name(s). Effective permissions = role.permissionIds ∪ user.permissionIds
export const authorizePermissions = (requiredPermissions = []) => {
  const required = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const user = await User.findByPk(req.user.id, { include: [{ model: Role, as: "role" }] });
      if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const rolePermissionIds = Array.isArray(user.role?.permissionIds) ? user.role.permissionIds : [];
      const userPermissionIds = Array.isArray(user.permissionIds) ? user.permissionIds : [];

      // permissionIds here are names or ids? We'll use names for simplicity in this project.
      const effective = new Set([...rolePermissionIds, ...userPermissionIds]);

      const hasAll = required.every((perm) => effective.has(perm));
      if (!hasAll) {
        return res.status(403).json({ success: false, message: "Forbidden: insufficient permission" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to authorize permissions" });
    }
  };
};
