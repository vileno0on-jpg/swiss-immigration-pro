#!/usr/bin/env python3
"""
Admin User Creation Script for Swiss Immigration Pro
Use this script to programmatically create an admin user
"""

import os
import sys
from supabase import create_client, Client

# Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL") or input("Enter Supabase URL: ")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") or input("Enter Supabase Service Key: ")

# Admin user details
ADMIN_EMAIL = input("Enter admin email: ")
ADMIN_PASSWORD = input("Enter admin password: ")
ADMIN_NAME = input("Enter admin name (optional, press Enter for default): ") or "Admin User"

def create_admin_user():
    """Create an admin user in Supabase"""
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print("\n🔐 Creating admin user...")
        
        # Step 1: Create auth user
        print("1. Creating authentication user...")
        auth_response = supabase.auth.admin.create_user({
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD,
            "email_confirm": True,
            "user_metadata": {
                "name": ADMIN_NAME
            }
        })
        
        user_id = auth_response.user.id
        print(f"✅ Auth user created: {user_id}")
        
        # Step 2: Create profile with admin privileges
        print("2. Creating profile with admin privileges...")
        profile_response = supabase.table("profiles").insert({
            "id": user_id,
            "email": ADMIN_EMAIL,
            "full_name": ADMIN_NAME,
            "pack_id": "free",
            "is_admin": True
        }).execute()
        
        print("✅ Profile created with admin privileges")
        
        # Step 3: Create user limits
        print("3. Setting up user limits...")
        limits_response = supabase.table("user_limits").insert({
            "user_id": user_id,
            "messages_today": 0,
            "last_reset_date": "2025-01-01"
        }).execute()
        
        print("✅ User limits configured")
        
        # Step 4: Verify
        print("\n4. Verifying admin user...")
        verification = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        
        if verification.data and verification.data.get("is_admin"):
            print("\n🎉 SUCCESS! Admin user created successfully!")
            print(f"\n📧 Email: {ADMIN_EMAIL}")
            print(f"👤 Name: {ADMIN_NAME}")
            print(f"🔑 User ID: {user_id}")
            print(f"👑 Admin: TRUE")
            print(f"\n✅ You can now log in at: /auth/login")
            return True
        else:
            print("\n⚠️ WARNING: User created but verification failed")
            return False
            
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Swiss Immigration Pro - Admin User Creation")
    print("=" * 60)
    
    if create_admin_user():
        sys.exit(0)
    else:
        sys.exit(1)

