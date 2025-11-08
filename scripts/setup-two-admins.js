/**
 * Setup Two Admin Users - Remove All Other Admins
 * 
 * Usage: node scripts/setup-two-admins.js
 * 
 * This script:
 * 1. Removes admin privileges from all users except the two specified
 * 2. Creates/updates the two specified admin users
 * 3. Ensures only these two users have admin access
 */

const { neon } = require('@neondatabase/serverless')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

// The two admin users to keep/create
const ADMIN_USERS = [
  {
    email: 'Andrea.vonflue@gmail.com',
    password: 'Andrea2202',
    fullName: 'Andrea von Flue'
  },
  {
    email: 'vileno0on@gmail.com',
    password: 'Vile08a21',
    fullName: 'Vilen'
  }
]

async function setupTwoAdmins() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not found in .env.local')
      console.error('Please make sure .env.local exists and contains DATABASE_URL')
      process.exit(1)
    }

    const sql = neon(process.env.DATABASE_URL)

    console.log('\n🔐 Setting Up Two Admin Users\n')
    console.log('='.repeat(50))
    console.log('Admin 1:', ADMIN_USERS[0].email)
    console.log('Admin 2:', ADMIN_USERS[1].email)
    console.log('='.repeat(50))

    // Step 1: Remove admin privileges from all users except the two specified
    console.log('\n📋 Step 1: Removing admin privileges from other users...')
    
    const adminEmail1 = ADMIN_USERS[0].email.toLowerCase()
    const adminEmail2 = ADMIN_USERS[1].email.toLowerCase()
    const result = await sql`
      UPDATE profiles
      SET is_admin = FALSE
      WHERE LOWER(email) NOT IN (${adminEmail1}, ${adminEmail2})
        AND is_admin = TRUE
    `
    console.log(`✅ Removed admin privileges from other users`)

    // Step 2: Process each admin user
    for (let i = 0; i < ADMIN_USERS.length; i++) {
      const admin = ADMIN_USERS[i]
      console.log(`\n👤 Processing Admin ${i + 1}: ${admin.email}`)

      // Check if user exists
      const existingUsers = await sql`
        SELECT id, email FROM users WHERE email = ${admin.email}
      `

      let userId

      if (existingUsers.length > 0) {
        // User exists, get their ID
        userId = existingUsers[0].id
        console.log(`   ✓ User exists (ID: ${userId})`)

        // Update password
        const hashedPassword = await bcrypt.hash(admin.password, 10)
        await sql`
          UPDATE users
          SET password_hash = ${hashedPassword}
          WHERE id = ${userId}
        `
        console.log(`   ✓ Password updated`)
      } else {
        // Create new user
        const hashedPassword = await bcrypt.hash(admin.password, 10)
        const newUser = await sql`
          INSERT INTO users (email, password_hash)
          VALUES (${admin.email}, ${hashedPassword})
          RETURNING id
        `
        userId = newUser[0].id
        console.log(`   ✓ User created (ID: ${userId})`)
      }

      // Create/update profile with admin privileges
      const existingProfile = await sql`
        SELECT id FROM profiles WHERE id = ${userId}
      `

      if (existingProfile.length > 0) {
        // Update existing profile
        await sql`
          UPDATE profiles
          SET 
            email = ${admin.email},
            full_name = ${admin.fullName},
            is_admin = TRUE,
            pack_id = 'free'
          WHERE id = ${userId}
        `
        console.log(`   ✓ Profile updated with admin privileges`)
      } else {
        // Create new profile
        await sql`
          INSERT INTO profiles (id, email, full_name, pack_id, is_admin)
          VALUES (${userId}, ${admin.email}, ${admin.fullName}, 'free', TRUE)
        `
        console.log(`   ✓ Profile created with admin privileges`)
      }

      // Ensure user_limits entry exists
      const existingLimits = await sql`
        SELECT user_id FROM user_limits WHERE user_id = ${userId}
      `

      if (existingLimits.length === 0) {
        await sql`
          INSERT INTO user_limits (user_id, messages_today, last_reset_date)
          VALUES (${userId}, 0, CURRENT_DATE)
        `
        console.log(`   ✓ User limits created`)
      }
    }

    // Step 3: Verify final admin users
    console.log('\n✅ Verification: Final Admin Users')
    console.log('='.repeat(50))
    const finalAdmins = await sql`
      SELECT email, full_name, is_admin, pack_id
      FROM profiles
      WHERE is_admin = TRUE
      ORDER BY email
    `

    if (finalAdmins.length === 0) {
      console.log('⚠️  WARNING: No admin users found!')
    } else {
      finalAdmins.forEach((admin, idx) => {
        console.log(`${idx + 1}. ${admin.email} (${admin.full_name || 'No name'})`)
      })
    }

    console.log('\n🎉 Setup Complete!')
    console.log('='.repeat(50))
    console.log('You can now login with:')
    ADMIN_USERS.forEach((admin, idx) => {
      console.log(`\nAdmin ${idx + 1}:`)
      console.log(`  Email: ${admin.email}`)
      console.log(`  Password: ${admin.password}`)
    })
    console.log('\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error)
    process.exit(1)
  }
}

setupTwoAdmins()
