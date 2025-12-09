import { LocalDBClient } from '@/lib/db-client'

// Re-export LocalDBClient as createClient for compatibility
// This allows existing code to work without changes
export async function createClient() {
  return new LocalDBClient()
}




