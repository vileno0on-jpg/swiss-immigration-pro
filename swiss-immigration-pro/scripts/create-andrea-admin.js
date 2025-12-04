const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
})

async function createAdminUser() {
  const client = await pool.connect()
  
  try {
    const email = 'andreavonflue@gmail.com'
    const password = 'andreavf222222'
    const fullName = 'Andrea Von Flue'
    
    console.log('Creating admin user...')
    console.log('Email:', email)
    
    // Check if user exists
    const userCheck = await client.query(
      'SELECT id FROM public.users WHERE email = $1',
      [email]
    )
    
    let userId
    
    if (userCheck.rows.length > 0) {
      // Update existing user
      userId = userCheck.rows[0].id
      console.log('User exists, updating password...')
      
      // Hash password with bcrypt (for NextAuth compatibility)
      const passwordHash = await bcrypt.hash(password, 10)
      
      await client.query(
        'UPDATE public.users SET password_hash = $1, email_verified = TRUE, email_verified_at = NOW(), updated_at = NOW() WHERE id = $2',
        [passwordHash, userId]
      )
      
      console.log('Password updated for existing user')
    } else {
      // Create new user
      console.log('Creating new user...')
      
      // Hash password with bcrypt
      const passwordHash = await bcrypt.hash(password, 10)
      
      const userResult = await client.query(
        'INSERT INTO public.users (email, password_hash, email_verified, email_verified_at) VALUES ($1, $2, TRUE, NOW()) RETURNING id',
        [email, passwordHash]
      )
      
      userId = userResult.rows[0].id
      console.log('User created with ID:', userId)
    }
    
    // Create/update profile with admin privileges
    await client.query(
      `INSERT INTO public.profiles (id, email, full_name, pack_id, is_admin, created_at, updated_at)
       VALUES ($1, $2, $3, 'free', TRUE, NOW(), NOW())
       ON CONFLICT (id) DO UPDATE SET
         is_admin = TRUE,
         full_name = $3,
         email = $2,
         updated_at = NOW()`,
      [userId, email, fullName]
    )
    
    console.log('Profile created/updated with admin privileges')
    
    // Create user limits entry
    await client.query(
      `INSERT INTO public.user_limits (user_id, messages_today, last_reset_date)
       VALUES ($1, 0, CURRENT_DATE)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    )
    
    console.log('User limits created')
    
    // Verify
    const verifyResult = await client.query(
      'SELECT p.id, p.email, p.full_name, p.is_admin, p.pack_id FROM public.profiles p WHERE p.id = $1',
      [userId]
    )
    
    console.log('\n✅ Admin user created successfully!')
    console.log('User details:')
    console.log(JSON.stringify(verifyResult.rows[0], null, 2))
    console.log('\nLogin credentials:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Admin: TRUE')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

createAdminUser()
  .then(() => {
    console.log('\nDone!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed:', error)
    process.exit(1)
  })
