// Setup database script
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'postgres', // Connect to default database first
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function setupDatabase() {
  console.log('Setting up database...');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`User: ${process.env.DB_USER || 'postgres'}`);
  console.log('');

  try {
    // Create database
    console.log('1. Creating database "swiss_immigration"...');
    await pool.query('CREATE DATABASE swiss_immigration');
    console.log('   ✅ Database created');
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('   ℹ️  Database already exists');
    } else {
      console.error('   ❌ Error:', error.message);
      console.error('   Full error:', error);
      throw error;
    }
  }

  // Close connection to postgres database
  await pool.end();

  // Connect to the new database
  const dbPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'swiss_immigration',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    // Check if tables exist
    console.log('\n2. Checking if schema is already imported...');
    const result = await dbPool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `);

    if (result.rows.length > 0) {
      console.log('   ℹ️  Schema already imported (users table exists)');
      console.log('\n✅ Database setup complete!');
      await dbPool.end();
      return;
    }

    // Import schema
    console.log('3. Importing schema...');
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, 'lib', 'database', 'schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await dbPool.query(statement);
        } catch (err) {
          // Ignore errors for statements that might already exist
          if (!err.message.includes('already exists') && !err.message.includes('does not exist')) {
            console.warn('   ⚠️  Warning:', err.message);
          }
        }
      }
    }

    console.log('   ✅ Schema imported');
    console.log('\n✅ Database setup complete!');
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    throw error;
  } finally {
    await dbPool.end();
  }
}

setupDatabase().catch(error => {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
});

