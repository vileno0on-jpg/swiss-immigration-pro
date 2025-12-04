# 🗄️ Quick Database Setup in pgAdmin

## Step 1: Create the Database

1. **Right-click on "Databases"** in the left sidebar
2. Select **"Create" → "Database..."**
3. In the "Database" field, enter: `swiss_immigration`
4. Click **"Save"**

## Step 2: Import the Schema

1. **Right-click on the `swiss_immigration` database** you just created
2. Select **"Query Tool"**
3. Click **"Open File"** (folder icon) or press `Ctrl+O`
4. Navigate to: `lib/database/schema.sql`
5. Click **"Execute"** (play button) or press `F5`

## Step 3: Verify Setup

Run this in Query Tool to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see tables like:
- users
- profiles
- subscriptions
- payments
- chat_messages
- etc.

## Step 4: Test Connection

After the database is created, test the connection:

```powershell
node test-db-connection.js
```

## ✅ Done!

Your database is now ready. The app will automatically connect to it using the credentials in `.env.local`.




