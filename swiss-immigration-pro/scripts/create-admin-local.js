#!/usr/bin/env node

/**
 * Create Admin User for Local PostgreSQL Database
 * Run: node scripts/create-admin-local.js
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

// Admin user details - CHANGE THESE!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@swissimmigrationpro.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function createAdminUser() {
  console.log('🚀 Creating Admin User');
  console.log('='.repeat(50));
  console.log(`Email: ${ADMIN_EMAIL}`);
  console.log(`Name: ${ADMIN_NAME}`);
  console.log('='.repeat(50));
  console.log('');

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [ADMIN_EMAIL]
    );

    let userId;

    if (existingUser.rows.length > 0) {
      // User exists - update to admin
      userId = existingUser.rows[0].id;
      console.log('📧 User already exists, updating to admin...');

      // Hash password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      // Update user password
      await client.query(
        'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
        [hashedPassword, userId]
      );

      // Update profile to admin
      await client.query(
        `INSERT INTO profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
         VALUES ($1, $2, $3, 'free', true, NOW(), NOW())
         ON CONFLICT (id) DO UPDATE SET
           is_admin = true,
           full_name = $3,
           updated_at = NOW()`,
        [userId, ADMIN_EMAIL, ADMIN_NAME]
      );

      console.log('✅ User updated to admin successfully!');
    } else {
      // Create new user
      console.log('📝 Creating new admin user...');
      userId = uuidv4();

      // Hash password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      // Create user
      await client.query(
        `INSERT INTO users (id, email, password_hash, email_verified, email_verified_at, created_at, updated_at)
         VALUES ($1, $2, $3, true, NOW(), NOW(), NOW())`,
        [userId, ADMIN_EMAIL, hashedPassword]
      );

      // Create admin profile
      await client.query(
        `INSERT INTO profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
         VALUES ($1, $2, $3, 'free', true, NOW(), NOW())`,
        [userId, ADMIN_EMAIL, ADMIN_NAME]
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
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`👑 Admin: ${admin.is_admin ? 'YES' : 'NO'}`);
    console.log(`📦 Pack: ${admin.pack_id}`);
    console.log(`🆔 User ID: ${admin.id}`);
    console.log('');
    console.log('🔗 Login URL: http://localhost:5050/auth/login');
    console.log('👑 Admin Dashboard: http://localhost:5050/admin');
    console.log('');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ ERROR creating admin user:', error.message);
    console.error('');
    console.error('💡 Make sure:');
    console.error('   1. PostgreSQL is running');
    console.error('   2. Database "swiss_immigration" exists');
    console.error('   3. Tables are created (run schema.sql)');
    console.error('   4. DB_PASSWORD in .env.local is correct');
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the script
createAdminUser();



