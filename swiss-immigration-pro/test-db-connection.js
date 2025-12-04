// Quick test script to verify database connection
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'swiss_immigration',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function testConnection() {
  console.log('Testing database connection...');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`Port: ${process.env.DB_PORT || '5432'}`);
  console.log(`Database: ${process.env.DB_NAME || 'swiss_immigration'}`);
  console.log(`User: ${process.env.DB_USER || 'postgres'}`);
  console.log('');

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connection successful!');
    console.log(`Current time: ${result.rows[0].current_time}`);
    console.log(`PostgreSQL version: ${result.rows[0].pg_version.split(',')[0]}`);
    
    // Test if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log(`\n✅ Found ${tablesResult.rows.length} tables:`);
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log('\n⚠️  No tables found. You may need to import the schema.');
      console.log('   Run: psql -U postgres -d swiss_immigration -f lib\\database\\schema.sql');
    }
    
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error(`Error: ${error.message}`);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check DB_PASSWORD in .env.local is correct');
    console.error('3. Verify database "swiss_immigration" exists');
    console.error('4. Check firewall settings');
    process.exit(1);
  }
}

testConnection();

