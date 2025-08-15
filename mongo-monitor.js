/**
 * MongoDB Live Monitor
 * Real-time monitoring of database changes
 */

const mongoose = require('mongoose');
const config = require('./config/config');

class MongoMonitor {
    constructor() {
        this.isMonitoring = false;
        this.collections = {};
    }

    async connect() {
        try {
            await mongoose.connect(config.mongoUri, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            });
            console.log('✅ Connected to MongoDB for monitoring\n');
            return true;
        } catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error.message);
            return false;
        }
    }

    async getCollectionStats() {
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const stats = {};

        for (const collection of collections) {
            const colName = collection.name;
            const count = await db.collection(colName).countDocuments();
            stats[colName] = count;
        }

        return stats;
    }

    async startMonitoring(interval = 5000) {
        if (this.isMonitoring) {
            console.log('⚠️  Monitoring already active');
            return;
        }

        const connected = await this.connect();
        if (!connected) return;

        this.isMonitoring = true;
        console.log('🔍 Starting MongoDB monitoring...');
        console.log(`📊 Checking every ${interval/1000} seconds`);
        console.log('Press Ctrl+C to stop\n');

        // Get initial stats
        this.collections = await this.getCollectionStats();
        this.displayStats('INITIAL STATE');

        // Start monitoring loop
        const monitorLoop = setInterval(async () => {
            try {
                const currentStats = await this.getCollectionStats();
                const hasChanges = this.detectChanges(currentStats);

                if (hasChanges) {
                    console.log('🔄 CHANGES DETECTED!');
                    this.displayStats('UPDATED STATE');
                    this.collections = currentStats;
                } else {
                    process.stdout.write('.');
                }
            } catch (error) {
                console.error('\n❌ Monitoring error:', error.message);
            }
        }, interval);

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\n\n🛑 Stopping monitor...');
            clearInterval(monitorLoop);
            await mongoose.connection.close();
            console.log('👋 Monitor stopped');
            process.exit(0);
        });
    }

    detectChanges(currentStats) {
        for (const [collection, count] of Object.entries(currentStats)) {
            if (this.collections[collection] !== count) {
                return true;
            }
        }
        return false;
    }

    displayStats(title) {
        console.log(`\n📊 ${title} - ${new Date().toLocaleTimeString()}`);
        console.log('='.repeat(40));
        
        for (const [collection, count] of Object.entries(this.collections)) {
            const change = this.getChangeIndicator(collection, count);
            console.log(`${collection.padEnd(15)} : ${count.toString().padStart(3)} records ${change}`);
        }
        console.log('');
    }

    getChangeIndicator(collection, currentCount) {
        const previousCount = this.collections[collection];
        if (previousCount === undefined) return '🆕';
        if (currentCount > previousCount) return '📈';
        if (currentCount < previousCount) return '📉';
        return '';
    }

    async quickCheck() {
        const connected = await this.connect();
        if (!connected) return;

        console.log('🔍 Quick MongoDB Check');
        console.log('=====================');
        
        const stats = await this.getCollectionStats();
        const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
        
        console.log(`📊 Total records across all collections: ${total}`);
        console.log('');
        
        for (const [collection, count] of Object.entries(stats)) {
            console.log(`${collection.padEnd(15)} : ${count} records`);
            
            if (count > 0) {
                // Show latest record
                const db = mongoose.connection.db;
                const latest = await db.collection(collection)
                    .findOne({}, { sort: { _id: -1 } });
                
                if (latest && latest.createdAt) {
                    const age = Date.now() - new Date(latest.createdAt).getTime();
                    const ageStr = this.formatAge(age);
                    console.log(`${' '.repeat(17)}Latest: ${ageStr} ago`);
                }
            }
        }
        
        await mongoose.connection.close();
        console.log('\n✅ Quick check complete');
    }

    formatAge(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
    }
}

// Command line usage
if (require.main === module) {
    const monitor = new MongoMonitor();
    
    const command = process.argv[2];
    
    if (command === 'monitor' || command === 'watch') {
        const interval = parseInt(process.argv[3]) || 5000;
        monitor.startMonitoring(interval);
    } else if (command === 'quick' || command === 'check') {
        monitor.quickCheck();
    } else {
        console.log('🔍 MongoDB Monitor Usage:');
        console.log('========================');
        console.log('node mongo-monitor.js quick     - Quick database check');
        console.log('node mongo-monitor.js monitor   - Start real-time monitoring');
        console.log('node mongo-monitor.js watch 3000 - Monitor with custom interval (ms)');
        console.log('');
        monitor.quickCheck();
    }
}

module.exports = MongoMonitor;
