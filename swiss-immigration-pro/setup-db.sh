#!/bin/bash
set -e

echo "Installing PostgreSQL..."
sudo apt update
sudo apt install -y postgresql postgresql-contrib

echo "Starting PostgreSQL..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

echo "Creating database and user..."
sudo -u postgres psql <<EOF
CREATE DATABASE swiss_immigration;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'Terminateur08a21aaaqqqeee';
ALTER USER postgres CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE swiss_immigration TO postgres;
\q
EOF

echo "Database setup complete!"

