#!/bin/bash
set -e

echo "=== Configuring PostgreSQL Authentication ==="

# Update PostgreSQL password
sudo -u postgres psql <<EOF
ALTER USER postgres WITH ENCRYPTED PASSWORD 'Terminateur08a21aaaqqqeee';
\q
EOF

# Configure PostgreSQL to allow password authentication
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/14/main/postgresql.conf

# Update pg_hba.conf to allow password authentication
sudo sed -i 's/local   all             postgres                                peer/local   all             postgres                                md5/' /etc/postgresql/14/main/pg_hba.conf

# Restart PostgreSQL
sudo systemctl restart postgresql

echo "✅ PostgreSQL authentication configured"
echo ""
echo "=== Testing Connection ==="
PGPASSWORD='Terminateur08a21aaaqqqeee' psql -h localhost -U postgres -d swiss_immigration -c "SELECT 'Connection successful!' as status;"

echo ""
echo "=== Database is ready for schema creation ==="





