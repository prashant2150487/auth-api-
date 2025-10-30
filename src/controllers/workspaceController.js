import WorkspaceItem from "../models/WorkspaceItem.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "name is required" });
    const item = await WorkspaceItem.create({ name, type: "folder", parentId: parentId || null, ownerId: req.user.id });
    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createFile = async (req, res) => {
  try {
    const { name, parentId, content } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "name is required" });
    const item = await WorkspaceItem.create({ name, type: "file", content: content || null, parentId: parentId || null, ownerId: req.user.id });
    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, parentId, description, status } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "name is required" });
    const item = await WorkspaceItem.create({ name, type: "task", content: description || null, status: status || "todo", parentId: parentId || null, ownerId: req.user.id });
    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listChildren = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;
    const where = { parentId, isDeleted: false };
    const items = await WorkspaceItem.findAll({ where, order: [["type", "ASC"], ["name", "ASC"]] });
    return res.status(200).json({ success: true, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getTree = async (req, res) => {
  try {
    const buildTree = async (parentId = null) => {
      const nodes = await WorkspaceItem.findAll({ where: { parentId, isDeleted: false } });
      const result = [];
      for (const n of nodes) {
        const entry = { id: n.id, name: n.name, type: n.type, status: n.status, parentId: n.parentId };
        if (n.type === "file" || n.type === "task") entry.content = n.content;
        entry.children = await buildTree(n.id);
        result.push(entry);
      }
      return result;
    };
    const tree = await buildTree(req.query.parentId || null);
    return res.status(200).json({ success: true, data: tree });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId, content, status } = req.body;
    const item = await WorkspaceItem.findByPk(id);
    if (!item || item.isDeleted) return res.status(404).json({ success: false, message: "Item not found" });
    if (name !== undefined) item.name = name;
    if (parentId !== undefined) item.parentId = parentId;
    if (content !== undefined) item.content = content;
    if (status !== undefined) item.status = status;
    await item.save();
    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const softDeleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await WorkspaceItem.findByPk(id);
    if (!item || item.isDeleted) return res.status(404).json({ success: false, message: "Item not found" });
    item.isDeleted = true;
    await item.save();
    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


