#!/usr/bin/env node

/**
 * Verify Admin User Creation
 * Check if Andrea Von Flue admin user exists in the database
 */

const https = require('https');

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
  console.log('🔍 Checking if Andrea Von Flue admin user exists...');
  console.log('=' .repeat(60));

  // First try to check if the app is running
  try {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/stats',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    console.log('📡 Checking if app is running...');
    const healthCheck = await makeRequest(options);

    if (healthCheck.status !== 200) {
      console.log('❌ App is not running or accessible');
      console.log('💡 Start the app with: npm run dev');
      return;
    }

    console.log('✅ App is running');

    // Now try to create the admin user
    console.log('\n🚀 Creating admin user...');

    const createOptions = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/create-admin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const adminData = {
      email: 'andrea.vonflue@gmail.com',
      password: 'Andreavf0222',
      fullName: 'Andrea Von Flue'
    };

    const createResult = await makeRequest(createOptions, adminData);

    if (createResult.status === 200 && createResult.data.success) {
      console.log('\n✅ SUCCESS! Admin user created:');
      console.log(`📧 Email: ${createResult.data.user.email}`);
      console.log(`👤 Name: ${createResult.data.user.fullName}`);
      console.log(`🔑 User ID: ${createResult.data.user.id}`);
      console.log(`👑 Admin: ${createResult.data.user.isAdmin ? 'YES' : 'NO'}`);
      console.log(`📦 Pack: ${createResult.data.user.packId}`);
      console.log('\n🔗 You can now log in at: http://localhost:3001/auth/login');
    } else {
      console.log('\n❌ Failed to create admin user:');
      console.log('Response:', createResult.data);
    }

  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
    console.log('\n💡 Troubleshooting steps:');
    console.log('1. Make sure the app is running: npm run dev');
    console.log('2. Check if environment variables are set');
    console.log('3. Verify Supabase connection');
    console.log('4. Check browser console for more details');
    console.log('\n🔧 Alternative: Use the SQL script in scripts/create-admin-user.sql');
  }
}

// Run the verification
checkAdminUser();








