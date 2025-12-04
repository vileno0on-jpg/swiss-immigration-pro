// Test PostgreSQL connection with a specific password
const readline = require('readline');
const { Pool } = require('pg');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('========================================');
console.log('PostgreSQL Password Tester');
console.log('========================================');
console.log('');

rl.question('Enter PostgreSQL password to test: ', (password) => {
  console.log('');
  console.log('Testing connection...');
  console.log('');
  
  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres', // Test with default database first
    user: 'postgres',
    password: password,
  });

  pool.query('SELECT 1 as test')
    .then(() => {
      console.log('✅ SUCCESS! This password works!');
      console.log('');
      console.log('Updating .env.local with this password...');
      
      // Update .env.local
      const fs = require('fs');
      let content = fs.readFileSync('.env.local', 'utf8');
      content = content.replace(/DB_PASSWORD=.*/, `DB_PASSWORD=${password}`);
      fs.writeFileSync('.env.local', content);
      
      console.log('✅ Updated .env.local');
      console.log('');
      console.log('Now testing connection to swiss_immigration database...');
      
      // Test connection to swiss_immigration
      const dbPool = new Pool({
        host: 'localhost',
        port: 5432,
        database: 'swiss_immigration',
        user: 'postgres',
        password: password,
      });
      
      return dbPool.query('SELECT 1');
    })
    .then(() => {
      console.log('✅ Connection to swiss_immigration successful!');
      console.log('');
      console.log('Everything is working! You can now:');
      console.log('1. Start the dev server: npm run dev');
      console.log('2. Or build for production: npm run build');
      process.exit(0);
    })
    .catch((error) => {
      if (error.message.includes('password authentication failed')) {
        console.log('❌ Password authentication failed');
        console.log('This password does not work.');
        console.log('');
        console.log('Try:');
        console.log('1. Check what password works in pgAdmin');
        console.log('2. Or reset PostgreSQL password in pgAdmin:');
        console.log('   Query Tool → ALTER USER postgres WITH PASSWORD \'Terminateur08a21aaaqqqeee\';');
      } else if (error.message.includes('does not exist')) {
        console.log('✅ Password works, but database "swiss_immigration" does not exist yet.');
        console.log('');
        console.log('Create it in pgAdmin:');
        console.log('1. Right-click "Databases" → Create → Database');
        console.log('2. Name: swiss_immigration');
        console.log('3. Then import schema from: lib/database/schema.sql');
      } else {
        console.log('❌ Error:', error.message);
      }
      process.exit(1);
    })
    .finally(() => {
      rl.close();
    });
});




