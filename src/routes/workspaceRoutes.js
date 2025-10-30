import express from "express";
import { authenticateToken, authorizePermissions } from "../middleware/auth.js";
import { createFile, createFolder, createTask, getTree, listChildren, softDeleteItem, updateItem } from "../controllers/workspaceController.js";

const router = express.Router();

// List children of a node or root
router.get(
  "/list",
  authenticateToken,
  authorizePermissions(["can_view"]),
  listChildren
);

// Get full tree from a parent (default root)
router.get(
  "/tree",
  authenticateToken,
  authorizePermissions(["can_view"]),
  getTree
);

// Create folder/file/task
router.post(
  "/folder",
  authenticateToken,
  authorizePermissions(["can_edit"]),
  createFolder
);
router.post(
  "/file",
  authenticateToken,
  authorizePermissions(["can_edit"]),
  createFile
);
router.post(
  "/task",
  authenticateToken,
  authorizePermissions(["can_edit"]),
  createTask
);

// Update or move/rename
router.patch(
  "/:id",
  authenticateToken,
  authorizePermissions(["can_edit"]),
  updateItem
);

// Delete
router.delete(
  "/:id",
  authenticateToken,
  authorizePermissions(["can_delete"]),
  softDeleteItem
);

export default router;


