#!/bin/bash
echo "=== PM2 Status ==="
pm2 status

echo ""
echo "=== Recent Logs ==="
pm2 logs swiss-immigration-pro --lines 30 --nostream

echo ""
echo "=== Error Logs ==="
pm2 logs swiss-immigration-pro --err --lines 30 --nostream

echo ""
echo "=== Testing Local Access ==="
curl -I http://localhost:5000 2>&1 | head -5

echo ""
echo "=== Testing Nginx ==="
curl -I http://localhost 2>&1 | head -5





