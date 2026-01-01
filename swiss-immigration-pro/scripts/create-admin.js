#!/usr/bin/env node

/**
 * Create Admin User Script
 * Usage: node scripts/create-admin.js [email] [password] [name]
 * Or run without arguments for interactive mode
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const readline = require('readline');

// Get command line arguments
const args = process.argv.slice(2);
const ADMIN_EMAIL = args[0];
const ADMIN_PASSWORD = args[1];
const ADMIN_NAME = args[2] || 'Admin User';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt for input
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function createAdminUser() {
  try {
    let email = ADMIN_EMAIL;
    let password = ADMIN_PASSWORD;
    let fullName = ADMIN_NAME;

    // If not provided via command line, prompt interactively
    if (!email) {
      console.log('');
      console.log('👑 Admin User Creation');
      console.log('='.repeat(50));
      console.log('');
      email = await question('📧 Admin Email: ');
    }

    if (!email || !email.includes('@')) {
      console.error('❌ Invalid email address');
      process.exit(1);
    }

    if (!password) {
      password = await question('🔑 Admin Password (min 8 characters): ');
    }

    if (!password || password.length < 8) {
      console.error('❌ Password must be at least 8 characters long');
      process.exit(1);
    }

    if (!ADMIN_PASSWORD) {
      const confirmPassword = await question('🔑 Confirm Password: ');
      if (password !== confirmPassword) {
        console.error('❌ Passwords do not match');
        process.exit(1);
      }
    }

    if (!ADMIN_NAME) {
      const nameInput = await question('👤 Full Name (optional, press Enter for "Admin User"): ');
      if (nameInput) fullName = nameInput;
    }

    console.log('');
    console.log('⏳ Creating admin account...');
    console.log('');

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      let userId;

      if (existingUser.rows.length > 0) {
        // User exists - update to admin
        userId = existingUser.rows[0].id;
        console.log('📧 User already exists, updating to admin...');

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        await client.query(
          'UPDATE users SET password_hash = $1, email_verified = true, updated_at = NOW() WHERE id = $2',
          [hashedPassword, userId]
        );

        // Update profile to admin
        await client.query(
          `INSERT INTO profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
           VALUES ($1, $2, $3, 'free', true, NOW(), NOW())
           ON CONFLICT (id) DO UPDATE SET
             is_admin = true,
             full_name = $3,
             email = $2,
             updated_at = NOW()`,
          [userId, email, fullName]
        );

        console.log('✅ User updated to admin successfully!');
      } else {
        // Create new user
        console.log('📝 Creating new admin user...');
        userId = uuidv4();

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await client.query(
          `INSERT INTO users (id, email, password_hash, email_verified, email_verified_at, created_at, updated_at)
           VALUES ($1, $2, $3, true, NOW(), NOW(), NOW())`,
          [userId, email, hashedPassword]
        );

        // Create admin profile
        await client.query(
          `INSERT INTO profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
           VALUES ($1, $2, $3, 'free', true, NOW(), NOW())`,
          [userId, email, fullName]
        );

        // Create user limits
        const today = new Date().toISOString().split('T')[0];
        await client.query(
          `INSERT INTO user_limits (user_id, messages_today, last_reset_date)
           VALUES ($1, 0, $2)
           ON CONFLICT (user_id) DO NOTHING`,
          [userId, today]
        );

        console.log('✅ Admin user created successfully!');
      }

      // Verify
      const verifyResult = await client.query(
        'SELECT id, email, full_name, is_admin, pack_id FROM profiles WHERE id = $1',
        [userId]
      );

      const admin = verifyResult.rows[0];

      await client.query('COMMIT');

      console.log('');
      console.log('='.repeat(50));
      console.log('✅ ADMIN USER CREATED SUCCESSFULLY!');
      console.log('='.repeat(50));
      console.log(`📧 Email: ${admin.email}`);
      console.log(`👤 Name: ${admin.full_name}`);
      console.log(`🔑 Password: ${password}`);
      console.log(`👑 Admin: ${admin.is_admin ? 'YES' : 'NO'}`);
      console.log(`📦 Pack: ${admin.pack_id}`);
      console.log(`🆔 User ID: ${admin.id}`);
      console.log('');
      
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5050';
      console.log(`🔗 Login URL: ${appUrl}/auth/login`);
      console.log(`👑 Admin Dashboard: ${appUrl}/admin`);
      console.log('');

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
      await pool.end();
    }

  } catch (error) {
    console.error('');
    console.error('❌ ERROR creating admin user:', error.message);
    console.error('');
    console.error('💡 Make sure:');
    console.error('   1. PostgreSQL is running');
    console.error('   2. Database "' + (process.env.DB_NAME || 'swiss_immigration') + '" exists');
    console.error('   3. Tables are created (run schema.sql)');
    console.error('   4. DB_PASSWORD in .env.local is correct');
    console.error('');
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
createAdminUser();





