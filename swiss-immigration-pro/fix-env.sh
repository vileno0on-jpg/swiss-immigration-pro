#!/bin/bash
cd ~/swiss-immigration-pro/swiss-immigration-pro

# Update environment variables
sed -i 's|http://localhost:3000|http://83.228.215.185|g' .env.local
sed -i 's|http://localhost:5050|http://83.228.215.185|g' .env.local

# Add NEXTAUTH_URL if not present
if ! grep -q "NEXTAUTH_URL" .env.local; then
    echo "" >> .env.local
    echo "NEXTAUTH_URL=http://83.228.215.185" >> .env.local
fi

# Restart PM2
pm2 restart swiss-immigration-pro

echo "Environment updated and application restarted"

