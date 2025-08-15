/**
 * Simple MongoDB Database Inspector
 * Check what records exist in your MongoDB database
 */

const mongoose = require('mongoose');

// Database connection
const config = require('./config/config');

async function inspectDatabase() {
    try {
        console.log('🔍 Connecting to MongoDB...'.cyan);
        console.log(`Database URI: ${config.mongoUri.replace(/\/\/.*:.*@/, '//***:***@')}`.gray);
        
        // Connect to database
        await mongoose.connect(config.mongoUri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        
        console.log('✅ Connected to MongoDB successfully!\n');
        
        // Get database instance
        const db = mongoose.connection.db;
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('📊 Available Collections:');
        console.log('========================');
        collections.forEach(col => {
            console.log(`- ${col.name}`);
        });
        console.log('');
        
        // Check each collection for record counts and sample data
        for (const collection of collections) {
            const colName = collection.name;
            const count = await db.collection(colName).countDocuments();
            console.log(`📄 ${colName.toUpperCase()}: ${count} records`);
            
            if (count > 0) {
                // Get sample records
                const samples = await db.collection(colName).find().limit(3).toArray();
                console.log('   Sample records:');
                samples.forEach((record, index) => {
                    const preview = JSON.stringify(record, null, 2).substring(0, 150);
                    console.log(`   ${index + 1}. ${preview}${preview.length >= 150 ? '...' : ''}`);
                });
            }
            console.log('');
        }
        
        console.log('==================================================');
        console.log('✨ Database inspection complete!');
        
    } catch (error) {
        console.error('❌ Error inspecting database:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed.');
    }
}

// Run the inspection
inspectDatabase();
