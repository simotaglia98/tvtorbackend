/**
 * Production Environment Configuration
 * Contains settings specific to the production environment
 * Used when NODE_ENV=production for live deployment
 * 
 * SECURITY: All values must be provided via environment variables
 * Application will fail to start if any required environment variable is missing
 */

// Check for required environment variables and fail fast if missing
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'EMAIL', 'PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ PRODUCTION CONFIG ERROR: Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('Application cannot start without these environment variables.');
    process.exit(1);
}

module.exports = {
    // MongoDB connection string for production environment
    // Must be provided via MONGODB_URI environment variable
    MONGODB_URI: process.env.MONGODB_URI,
    
    // JWT secret key for production environment
    // Must be provided via JWT_SECRET environment variable
    JWT_SECRET: process.env.JWT_SECRET,
    
    // Base API URL for production environment
    // Will be set automatically by Render or provided via API_URL env var
    API_URL: process.env.API_URL,
    
    // Email credentials for production
    // Must be provided via environment variables
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
};