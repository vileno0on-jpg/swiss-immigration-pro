#!/bin/bash
echo "=== Fixing PostgreSQL Authentication ==="
sudo sed -i 's/local   all             postgres                                peer/local   all             postgres                                md5/' /etc/postgresql/14/main/pg_hba.conf
sudo systemctl restart postgresql
sleep 2

echo "✅ PostgreSQL restarted"
echo ""

echo "=== Restarting Application ==="
pm2 restart swiss-immigration-pro
sleep 3

echo "✅ Application restarted"
echo ""
echo "=== Checking Application Status ==="
pm2 status
pm2 logs swiss-immigration-pro --lines 5 --nostream

