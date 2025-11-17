const { createClient } = require('@supabase/supabase-js')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

async function verifySetup() {
  console.log('🔍 Verifying Supabase Setup')
  console.log('===========================')

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log('📋 Environment Variables:')
  console.log(`   URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Anon Key: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Service Key: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}`)

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.log('\n❌ Missing environment variables. Please check your .env.local file.')
    process.exit(1)
  }

  // Test connection
  console.log('\n🔌 Testing Supabase Connection...')

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Try to get a simple query to test connection
    const { data, error } = await supabase
      .from('live_stats')
      .select('count')
      .limit(1)

    if (error && !error.message.includes('does not exist')) {
      throw error
    }

    console.log('✅ Supabase connection successful!')

  } catch (error) {
    console.log('❌ Supabase connection failed:', error.message)
    console.log('\n💡 Possible solutions:')
    console.log('   • Check your Supabase project is active')
    console.log('   • Verify the API keys are correct')
    console.log('   • Make sure the database schema has been set up')
  }

  console.log('\n📝 Next steps:')
  console.log('1. Run the database setup script: node scripts/setup-supabase-db.js')
  console.log('2. Execute the SQL schema in your Supabase dashboard')
  console.log('3. Start the application: npm run dev')
}

verifySetup()
