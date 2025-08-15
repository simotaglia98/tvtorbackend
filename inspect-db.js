/**
 * MongoDB Database Inspector
 * Simple script to check what records exist in your MongoDB database
 */

const mongoose = require('mongoose');

// Import your existing models
const User = require('./models/User');
const Question = require('./models/Question');
const Subject = require('./models/Subjects');
const Location = require('./models/Locations');

// Database connection (using same config as your app)
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
        
        console.log('✅ Connected to MongoDB successfully!\n'.green);
        
        // Check all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available Collections:'.yellow.bold);
        console.log('========================');
        collections.forEach(col => {
            console.log(`- ${col.name}`.cyan);
        });
        console.log('');
        
        // Check Users collection
        console.log('👥 USERS COLLECTION'.blue.bold);
        console.log('===================');
        const userCount = await User.countDocuments();
        console.log(`Total users: ${userCount}`.green);
        
        if (userCount > 0) {
            const users = await User.find().limit(5).select('name email userType createdAt');
            console.log('Recent users:');
            users.forEach(user => {
                console.log(`  - ${user.name || 'N/A'} (${user.email}) - ${user.userType} - ${user.createdAt?.toISOString().split('T')[0]}`.gray);
            });
        }
        console.log('');
        
        // Check Subjects collection
        console.log('📚 SUBJECTS COLLECTION'.blue.bold);
        console.log('======================');
        const subjectCount = await Subject.countDocuments();
        console.log(`Total subjects: ${subjectCount}`.green);
        
        if (subjectCount > 0) {
            const subjects = await Subject.find().limit(10);
            console.log('All subjects:');
            subjects.forEach(subject => {
                console.log(`  - ${subject.subject || subject.name} (ID: ${subject._id})`.gray);
            });
        }
        console.log('');
        
        // Check Locations collection
        console.log('📍 LOCATIONS COLLECTION'.blue.bold);
        console.log('=======================');
        const locationCount = await Location.countDocuments();
        console.log(`Total locations: ${locationCount}`.green);
        
        if (locationCount > 0) {
            const locations = await Location.find().limit(10);
            console.log('All locations:');
            locations.forEach(location => {
                console.log(`  - ${location.location || location.name} (ID: ${location._id})`.gray);
            });
        }
        console.log('');
        
        // Check Questions collection
        console.log('❓ QUESTIONS COLLECTION'.blue.bold);
        console.log('======================');
        const questionCount = await Question.countDocuments();
        console.log(`Total questions: ${questionCount}`.green);
        
        if (questionCount > 0) {
            const questions = await Question.find().limit(5);
            console.log('Recent questions:');
            questions.forEach(question => {
                console.log(`  - Q${question.question_num || '?'}: ${question.question?.substring(0, 50)}...`.gray);
            });
        }
        console.log('');
        
        // Check other collections that might exist
        const otherCollections = ['tutorassigns', 'comments', 'notifications', 'codes', 'sessions'];
        for (const collectionName of otherCollections) {
            const collection = mongoose.connection.db.collection(collectionName);
            const count = await collection.countDocuments();
            if (count > 0) {
                console.log(`📄 ${collectionName.toUpperCase()}: ${count} records`.blue);
            }
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('✨ Database inspection complete!'.green.bold);
        
    } catch (error) {
        console.error('❌ Error inspecting database:'.red, error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed.'.gray);
    }
}

// Add colors to console
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

// Add color methods to String prototype
Object.keys(colors).forEach(color => {
    String.prototype[color] = function() {
        return colors[color] + this + colors.reset;
    };
});

// Add bold method
String.prototype.bold = function() {
    return '\x1b[1m' + this + '\x1b[0m';
};

// Run the inspection
if (require.main === module) {
    inspectDatabase();
}

module.exports = { inspectDatabase };
