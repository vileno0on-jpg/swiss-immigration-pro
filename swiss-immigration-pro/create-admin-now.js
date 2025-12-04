const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Admin user credentials
const ADMIN_EMAIL = 'admin@swissimmigrationpro.com';
const ADMIN_PASSWORD = 'Admin123!@#';
const ADMIN_NAME = 'Admin User';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'swiss_immigration',
  user: 'postgres',
  password: 'Terminateur08a21aaaqqqeee',
});

async function createAdminUser() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('🔐 Creating admin user...');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('');
    
    // Check if user already exists
    const checkResult = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [ADMIN_EMAIL]
    );
    
    let userId;
    
    if (checkResult.rows.length > 0) {
      userId = checkResult.rows[0].id;
      console.log('⚠️  User already exists, updating to admin...');
      
      // Update password
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await client.query(
        'UPDATE users SET password_hash = $1, email_verified = true WHERE id = $2',
        [passwordHash, userId]
      );
    } else {
      // Create new user
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const userResult = await client.query(
        `INSERT INTO users (email, password_hash, email_verified, email_verified_at, created_at, updated_at)
         VALUES ($1, $2, true, NOW(), NOW(), NOW())
         RETURNING id`,
        [ADMIN_EMAIL, passwordHash]
      );
      userId = userResult.rows[0].id;
      console.log('✅ User created');
    }
    
    // Create/update profile with admin privileges
    await client.query(
      `INSERT INTO profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
       VALUES ($1, $2, $3, 'free', true, NOW(), NOW())
       ON CONFLICT (id) 
       DO UPDATE SET 
         is_admin = true,
         full_name = $3,
         updated_at = NOW()`,
      [userId, ADMIN_EMAIL, ADMIN_NAME]
    );
    console.log('✅ Profile created/updated with admin privileges');
    
    // Create user limits if not exists
    await client.query(
      `INSERT INTO user_limits (user_id, messages_today, last_reset_date)
       VALUES ($1, 0, CURRENT_DATE)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );
    console.log('✅ User limits created');
    
    await client.query('COMMIT');
    
    console.log('');
    console.log('🎉 Admin user created successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('');
    console.log('🔗 Login at: http://83.228.215.185/auth/login');
    
    // Verify admin user
    const verifyResult = await client.query(
      'SELECT id, email, full_name, is_admin FROM profiles WHERE id = $1',
      [userId]
    );
    
    console.log('');
    console.log('✅ Verification:');
    console.log(JSON.stringify(verifyResult.rows[0], null, 2));
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdminUser();

