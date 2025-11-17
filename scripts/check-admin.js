#!/usr/bin/env node

/**
 * Check if admin user exists
 * Run this script to verify admin user creation
 */

const https = require('https');

// Configuration
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

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

async function checkAdminUser() {
  console.log('🔍 Checking for admin user...');
  console.log('=' .repeat(40));

  try {
    const options = {
      hostname: API_URL.replace('http://', '').replace('https://', '').split(':')[0],
      port: API_URL.includes('localhost') ? 3001 : (API_URL.startsWith('https://') ? 443 : 80),
      path: '/api/admin/users',
      method: 'GET',
      headers: {}
    };

    console.log('📡 Checking users API...');

    const response = await makeRequest(options);

    if (response.status === 200 && response.data.users) {
      const adminUser = response.data.users.find(user => user.is_admin === true);

      if (adminUser) {
        console.log('\n✅ SUCCESS! Admin user found:');
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Name: ${adminUser.full_name}`);
        console.log(`   Admin: ${adminUser.is_admin}`);
        console.log(`   User ID: ${adminUser.id}`);
      } else {
        console.log('\n❌ No admin user found');
        console.log('💡 Try running the SQL script to create the admin user');
      }
    } else {
      console.log('\n❌ API request failed');
      console.log(`   Status: ${response.status}`);
      console.log(`   Response:`, response.data);

      // Try to create the admin user
      console.log('\n🔄 Attempting to create admin user...');
      await createAdminUser();
    }

  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
    console.log('\n💡 Possible issues:');
    console.log('   1. Application not running');
    console.log('   2. Environment variables not configured');
    console.log('   3. Database connection issues');
    console.log('   4. Admin user not created yet');
  }
}

async function createAdminUser() {
  const adminData = {
    email: 'andrea.vonflue@gmail.com',
    password: 'Andreavf0222',
    fullName: 'Andrea Von Flue'
  };

  try {
    const options = {
      hostname: API_URL.replace('http://', '').replace('https://', '').split(':')[0],
      port: API_URL.includes('localhost') ? 3001 : (API_URL.startsWith('https://') ? 443 : 80),
      path: '/api/admin/create-admin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(adminData).length
      }
    };

    const response = await makeRequest(options, adminData);

    if (response.status === 200 && response.data.success) {
      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Password: ${adminData.password}`);
    } else {
      console.log('❌ Failed to create admin user');
      console.log('💡 Try using the SQL script in Supabase dashboard');
    }

  } catch (error) {
    console.log('❌ Creation failed:', error.message);
  }
}

// Run the check
checkAdminUser();



