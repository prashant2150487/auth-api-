import { sequelize } from "../config/db.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

const seed = async () => {
  try {
    console.log("🌱 Seeding roles and permissions...");

    // Ensure tables exist
    await sequelize.sync({ force: false });

    // Create base permissions (by name for simplicity)
    const basePermissions = [
      { name: "can_view", description: "Can view resources", resource: "global", action: "read" },
      { name: "can_edit", description: "Can edit resources", resource: "global", action: "update" },
      { name: "can_delete", description: "Can delete resources", resource: "global", action: "delete" },
    ];

    for (const p of basePermissions) {
      await Permission.findOrCreate({ where: { name: p.name }, defaults: p });
    }

    // Role: user (default)
    await Role.findOrCreate({
      where: { name: "user" },
      defaults: {
        name: "user",
        description: "Default user role",
        permissionIds: ["can_view"],
      },
    });

    // Role: admin (all permissions)
    await Role.findOrCreate({
      where: { name: "admin" },
      defaults: {
        name: "admin",
        description: "Administrator role",
        permissionIds: ["can_view", "can_edit", "can_delete"],
      },
    });

    console.log("✅ Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();


