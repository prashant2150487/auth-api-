import { sequelize } from '../config/db.js';
import User from '../models/User.js';

const createTables = async () => {
    try {
        console.log('🔄 Creating database tables...');
        
        // Sync all models with database
        await sequelize.sync({ force: false });
        
        console.log('✅ Database tables created successfully!');
        console.log('📊 Tables created:');
        console.log('   - Users');
        
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        process.exit(1);
    }
};

// Run the migration
createTables().then(() => {
    console.log('🎉 Database setup complete!');
    process.exit(0);
});
