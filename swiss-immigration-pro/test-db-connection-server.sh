#!/bin/bash
echo "=== Testing PostgreSQL Connection ==="

# Test connection
sudo -u postgres psql -d swiss_immigration -c "SELECT version();"

echo ""
echo "=== Listing Tables ==="
sudo -u postgres psql -d swiss_immigration -c "\dt"

echo ""
echo "=== Testing Application Database Connection ==="
cd ~/swiss-immigration-pro/swiss-immigration-pro

# Test with Node.js
node << 'EOF'
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'swiss_immigration',
  user: 'postgres',
  password: 'Terminateur08a21aaaqqqeee',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connection successful!');
    console.log('Current time:', res.rows[0].now);
    pool.end();
  }
});
EOF

echo ""
echo "=== Database Connection Test Complete ==="



