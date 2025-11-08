/**
 * Create Admin User for Neon Database + NextAuth
 * 
 * Usage: node scripts/create-admin-neon.js
 * 
 * This script creates an admin user in the Neon database
 */

const { neon } = require('@neondatabase/serverless')
const bcrypt = require('bcryptjs')
const readline = require('readline')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function createAdminUser() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not found in .env.local')
      console.error('Please make sure .env.local exists and contains DATABASE_URL')
      process.exit(1)
    }

    const sql = neon(process.env.DATABASE_URL)

    console.log('\n🔐 Admin User Creation for Neon Database\n')
    console.log('=' .repeat(50))

    // Get admin credentials
    const email = await question('Enter admin email: ')
    const password = await question('Enter admin password (min 8 chars): ')
    const fullName = await question('Enter admin full name (optional, press Enter for "Admin User"): ') || 'Admin User'

    if (!email || !email.includes('@')) {
      console.error('❌ Invalid email address')
      process.exit(1)
    }

    if (!password || password.length < 8) {
      console.error('❌ Password must be at least 8 characters long')
      process.exit(1)
    }

    console.log('\n📦 Creating admin user...\n')

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    let userId

    if (existingUsers.length > 0) {
      // User exists - update to admin
      userId = existingUsers[0].id
      console.log(`⚠️  User already exists with ID: ${userId}`)
      console.log('Updating to admin...')

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Update user password
      await sql`
        UPDATE users
        SET password_hash = ${hashedPassword},
            updated_at = NOW()
        WHERE id = ${userId}
      `

      // Update profile to admin
      await sql`
        UPDATE profiles
        SET is_admin = TRUE,
            full_name = ${fullName},
            updated_at = NOW()
        WHERE id = ${userId}
      `

      console.log('✅ User updated to admin successfully!')
    } else {
      // Create new user
      console.log('1. Creating user account...')
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUserResult = await sql`
        INSERT INTO users (email, password_hash, email_verified)
        VALUES (${email}, ${hashedPassword}, TRUE)
        RETURNING id
      `
      userId = newUserResult[0].id
      console.log(`✅ User created with ID: ${userId}`)

      console.log('2. Creating admin profile...')
      await sql`
        INSERT INTO profiles (id, email, full_name, pack_id, is_admin)
        VALUES (${userId}, ${email}, ${fullName}, 'free', TRUE)
      `
      console.log('✅ Admin profile created')

      console.log('3. Setting up user limits...')
      const today = new Date().toISOString().split('T')[0]
      await sql`
        INSERT INTO user_limits (user_id, messages_today, last_reset_date)
        VALUES (${userId}, 0, ${today})
      `
      console.log('✅ User limits configured')
    }

    // Verify admin user
    console.log('\n4. Verifying admin user...')
    const verifyResult = await sql`
      SELECT id, email, full_name, is_admin, pack_id
      FROM profiles
      WHERE id = ${userId}
    `

    const admin = verifyResult[0]

    if (admin && admin.is_admin) {
      console.log('\n🎉 SUCCESS! Admin user created successfully!\n')
      console.log('=' .repeat(50))
      console.log('📧 Email:', admin.email)
      console.log('👤 Name:', admin.full_name)
      console.log('🆔 User ID:', admin.id)
      console.log('👑 Admin:', admin.is_admin ? '✅ TRUE' : '❌ FALSE')
      console.log('📦 Pack:', admin.pack_id)
      console.log('=' .repeat(50))
      console.log('\n✅ You can now log in at: http://localhost:3003/auth/login')
      console.log('✅ Admin panel: http://localhost:3003/admin\n')
    } else {
      console.error('❌ ERROR: Admin user verification failed')
      process.exit(1)
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    console.error(error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

// Run the script
createAdminUser()

