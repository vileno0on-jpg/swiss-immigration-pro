import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { sql } from '@/lib/neon/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          if (!sql) {
            console.error('Database connection not available')
            return null
          }

          // Find user by email
          const users = await sql`
            SELECT * FROM users 
            WHERE email = ${credentials.email}
          `

          if (!users || users.length === 0) {
            return null
          }

          const user = users[0] as any

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password_hash)

          if (!isValid) {
            return null
          }

          // Get user profile
          const profiles = await sql`
            SELECT * FROM profiles 
            WHERE id = ${user.id}
          `

          const profile = (profiles && profiles[0]) ? (profiles[0] as any) : null

          return {
            id: user.id,
            email: user.email,
            name: profile?.full_name || null,
            isAdmin: profile?.is_admin || false,
            packId: profile?.pack_id || 'free',
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
        token.packId = user.packId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
        session.user.packId = token.packId as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

