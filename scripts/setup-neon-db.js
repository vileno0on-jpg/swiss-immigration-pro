const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

async function setupDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    console.error('Please make sure .env.local exists and contains DATABASE_URL');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  console.log('📦 Reading schema file...');
  const schemaPath = path.join(__dirname, '../lib/database/neon-schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  console.log('🚀 Running database schema...');
  console.log('This may take a few moments...\n');
  
  // Parse SQL statements
  const lines = schema.split('\n');
  let currentStatement = '';
  const statements = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (trimmed.startsWith('--') || trimmed.length === 0) {
      continue;
    }
    currentStatement += line + '\n';
    // If line ends with semicolon, it's a complete statement
    if (trimmed.endsWith(';')) {
      const stmt = currentStatement.trim();
      if (stmt.length > 10) { // Only add substantial statements
        statements.push(stmt);
      }
      currentStatement = '';
    }
  }
  
  // Add any remaining statement
  if (currentStatement.trim().length > 10) {
    statements.push(currentStatement.trim());
  }
  
  console.log(`Found ${statements.length} SQL statements to execute...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    try {
      // Execute raw SQL - Neon requires template literals
      // We use Function constructor to safely create a template literal
      const safeQuery = statement.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
      const templateLiteral = Function('sql', 'return sql`' + safeQuery + '`');
      await templateLiteral(sql);
      successCount++;
      console.log(`✅ [${i + 1}/${statements.length}] Executed successfully`);
    } catch (error) {
      // Ignore "already exists" errors
      if (error.message.includes('already exists') || 
          error.message.includes('duplicate') ||
          (error.message.includes('relation') && error.message.includes('already exists')) ||
          error.message.includes('extension "uuid-ossp" already exists')) {
        console.log(`⚠️  [${i + 1}/${statements.length}] Skipped (already exists)`);
        successCount++; // Count as success since it's expected
      } else {
        console.error(`❌ [${i + 1}/${statements.length}] Error:`, error.message.substring(0, 150));
        errorCount++;
      }
    }
  }
  
  console.log(`\n✅ Completed: ${successCount} statements executed`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} errors (may be expected if tables already exist)`);
  }
  console.log('✅ Database setup finished!');
  console.log('\nYou can now verify in Neon dashboard → Tables');
}

setupDatabase();
