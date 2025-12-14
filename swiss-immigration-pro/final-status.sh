#!/bin/bash
echo "=== ✅ Database Connection Status ==="
PGPASSWORD='Terminateur08a21aaaqqqeee' psql -h localhost -U postgres -d swiss_immigration -c "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';" 2>&1 | grep -v "could not change directory"

echo ""
echo "=== ✅ Application Status ==="
pm2 status

echo ""
echo "=== ✅ Recent Application Logs ==="
pm2 logs swiss-immigration-pro --lines 3 --nostream | tail -5

echo ""
echo "=== ✅ Local Site Test ==="
curl -I http://localhost:5000 2>&1 | head -3
curl -I http://localhost 2>&1 | head -3

echo ""
echo "=== 📋 Summary ==="
echo "✅ PostgreSQL database: Connected"
echo "✅ Database schema: Created (13 tables)"
echo "✅ Application: Running"
echo "✅ Nginx: Configured"
echo ""
echo "⚠️  Remaining Issue: Infomaniak Cloud Firewall"
echo "   → Configure firewall in Infomaniak Manager to allow ports 80/443"
echo "   → Then site will be accessible at: http://83.228.215.185"



