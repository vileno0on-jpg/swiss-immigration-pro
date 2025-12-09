#!/bin/bash
set -e

cd ~/swiss-immigration-pro/swiss-immigration-pro

# Create .env.local
if [ ! -f .env.local ]; then
    cp env.local.txt .env.local
    # Update URLs
    sed -i 's|http://localhost:3000|http://83.228.215.185|g' .env.local
    sed -i 's|http://localhost:5050|http://83.228.215.185|g' .env.local
fi

# Build application
echo "Building application..."
npm run build

# Create logs directory
mkdir -p ~/logs

# Update ecosystem.config.js path
sed -i 's|/home/deploy|/home/ubuntu|g' ecosystem.config.js

# Start with PM2
pm2 delete swiss-immigration-pro 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Configure Nginx
sudo tee /etc/nginx/sites-available/swiss-immigration > /dev/null <<EOF
server {
    listen 80;
    server_name 83.228.215.185;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/swiss-immigration /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Configure firewall
sudo ufw allow 22/tcp 2>/dev/null || true
sudo ufw allow 80/tcp 2>/dev/null || true
sudo ufw allow 443/tcp 2>/dev/null || true
echo "y" | sudo ufw enable 2>/dev/null || true

echo "Deployment complete!"
echo "Visit: http://83.228.215.185"
pm2 status


