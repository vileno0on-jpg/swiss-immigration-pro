const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyDatabase() {
  console.log('🔍 Running Database Verification...');
  console.log('=====================================\n');

  const expectedTables = [
    'profiles', 'subscriptions', 'payments', 'chat_messages',
    'user_limits', 'masterclass_progress', 'quiz_results',
    'user_cvs', 'cantonal_data', 'admin_logs', 'live_stats'
  ];

  try {
    // Check tables by attempting to query them
    console.log('📋 Checking Tables...');
    const existingTables = [];
    const missingTables = [];

    for (const table of expectedTables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (!error) {
          existingTables.push(table);
        } else {
          missingTables.push(table);
        }
      } catch (err) {
        missingTables.push(table);
      }
    }

    console.log('✅ Tables found:', existingTables.join(', '));
    if (missingTables.length > 0) {
      console.log('❌ Tables missing:', missingTables.join(', '));
    }
    console.log('');

    // Check data counts
    console.log('📊 Checking Initial Data...');

    try {
      const { data: stats, error: statsError } = await supabase
        .from('live_stats')
        .select('*', { count: 'exact' });

      if (!statsError) {
        console.log(`  live_stats: ${stats?.length || 0} records (expected: 3)`);
      } else {
        console.log('  live_stats: ❌ Error checking table');
      }
    } catch (err) {
      console.log('  live_stats: ❌ Table not found');
    }

    try {
      const { data: cantons, error: cantonsError } = await supabase
        .from('cantonal_data')
        .select('*', { count: 'exact' });

      if (!cantonsError) {
        console.log(`  cantonal_data: ${cantons?.length || 0} records (expected: 5)`);
      } else {
        console.log('  cantonal_data: ❌ Error checking table');
      }
    } catch (err) {
      console.log('  cantonal_data: ❌ Table not found');
    }

    console.log('');
    console.log('✅ Database verification complete!');
    console.log('');
    console.log('💡 Note: For full verification including RLS policies and triggers,');
    console.log('   run the SQL script in your Supabase Dashboard SQL Editor:');
    console.log('   scripts/verify-database.sql');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyDatabase();
