import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL environment variable is not set')
}

export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL)
  : null as any

