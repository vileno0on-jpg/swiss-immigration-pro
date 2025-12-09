#!/bin/bash
set -e

echo "=== Step 1: Configuring PostgreSQL Authentication ==="

# Update PostgreSQL password
sudo -u postgres psql <<EOF
ALTER USER postgres WITH ENCRYPTED PASSWORD 'Terminateur08a21aaaqqqeee';
\q
EOF

# Configure PostgreSQL to allow password authentication
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/14/main/postgresql.conf

# Update pg_hba.conf to allow password authentication for local connections
if ! grep -q "local.*postgres.*md5" /etc/postgresql/14/main/pg_hba.conf; then
    sudo sed -i 's/local   all             postgres                                peer/local   all             postgres                                md5/' /etc/postgresql/14/main/pg_hba.conf
fi

# Restart PostgreSQL
sudo systemctl restart postgresql
sleep 2

echo "✅ PostgreSQL authentication configured"
echo ""

echo "=== Step 2: Creating Database Schema ==="
cd ~/swiss-immigration-pro/swiss-immigration-pro

# Run the schema
PGPASSWORD='Terminateur08a21aaaqqqeee' psql -h localhost -U postgres -d swiss_immigration -f lib/database/schema.sql

echo "✅ Database schema created"
echo ""

echo "=== Step 3: Verifying Tables ==="
PGPASSWORD='Terminateur08a21aaaqqqeee' psql -h localhost -U postgres -d swiss_immigration -c "\dt"

echo ""
echo "=== Step 4: Testing Application Connection ==="
node << 'EOF'
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'swiss_immigration',
  user: 'postgres',
  password: 'Terminateur08a21aaaqqqeee',
});

pool.query('SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = $1', ['public'], (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connection successful!');
    console.log('📊 Tables created:', res.rows[0].table_count);
    pool.end();
  }
});
EOF

echo ""
echo "=== ✅ Database Setup Complete ==="
echo "The application can now connect to the database!"


