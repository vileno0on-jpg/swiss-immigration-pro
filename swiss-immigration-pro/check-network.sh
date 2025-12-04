#!/bin/bash
echo "=== Listening Ports ==="
sudo ss -tlnp | grep -E "(:80|:443|:5000|:22)"

echo ""
echo "=== IPTables Rules ==="
sudo iptables -L -n -v | head -30

echo ""
echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager | head -10

echo ""
echo "=== Test Local Connection ==="
curl -I http://localhost:5000 2>&1 | head -3
curl -I http://localhost 2>&1 | head -3

echo ""
echo "=== Network Interfaces ==="
ip addr show | grep -E "(inet |inet6 )" | head -10

