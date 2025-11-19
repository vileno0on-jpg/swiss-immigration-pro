#!/usr/bin/env node

/**
 * Create Andrea Von Flue as Admin User
 * Run this script to create the admin user via API
 */

const https = require('https');
const http = require('http');

// Configuration
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
const ADMIN_DATA = {
  email: 'andrea.vonflue@gmail.com',
  password: 'Andreavf0222',
  fullName: 'Andrea Von Flue'
};

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function createAdminUser() {
  console.log('🚀 Creating Andrea Von Flue as Admin User');
  console.log('=' .repeat(50));
  console.log(`Email: ${ADMIN_DATA.email}`);
  console.log(`Name: ${ADMIN_DATA.fullName}`);
  console.log('=' .repeat(50));

  try {
    const options = {
      hostname: API_URL.replace('http://', '').replace('https://', '').split(':')[0],
      port: API_URL.includes('localhost') ? 3001 : (API_URL.startsWith('https://') ? 443 : 80),
      path: '/api/admin/create-admin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(ADMIN_DATA).length
      }
    };

    console.log('📡 Sending request to:', `${API_URL}/api/admin/create-admin`);

    const response = await makeRequest(options, ADMIN_DATA);

    if (response.status === 200 && response.data.success) {
      console.log('\n✅ SUCCESS! Admin user created successfully!');
      console.log('\n📧 Login Credentials:');
      console.log(`   Email: ${ADMIN_DATA.email}`);
      console.log(`   Password: ${ADMIN_DATA.password}`);
      console.log(`   Name: ${ADMIN_DATA.fullName}`);
      console.log(`   Admin: ${response.data.user.isAdmin ? 'YES' : 'NO'}`);
      console.log('\n🔗 Login URL: /auth/login');
      console.log('\n👑 Admin Dashboard: /admin');
    } else {
      console.log('\n❌ FAILED to create admin user');
      console.log('Response:', response.data);
    }

  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. The application is running');
    console.log('   2. Environment variables are configured');
    console.log('   3. Database is set up correctly');
    console.log('\n🔧 Alternative: Use the SQL script in scripts/create-admin-user.sql');
  }
}

// Run the script
createAdminUser();
