#!/bin/bash
cd ~/swiss-immigration-pro/swiss-immigration-pro

echo "=== Current Database Configuration ==="
grep "DB_" .env.local

echo ""
echo "=== Testing Direct PostgreSQL Connection ==="
PGPASSWORD='Terminateur08a21aaaqqqeee' psql -h localhost -U postgres -d swiss_immigration -c "SELECT 'Connection OK' as status;" 2>&1

echo ""
echo "=== Testing Node.js Connection ==="
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
    console.error('❌ Error:', err.message);
    console.error('Details:', err);
  } else {
    console.log('✅ Connection successful!');
    console.log('Time:', res.rows[0].now);
  }
  pool.end();
});
EOF

echo ""
echo "=== Checking pg_hba.conf ==="
sudo grep "local.*postgres" /etc/postgresql/14/main/pg_hba.conf



