import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { query } from './db'
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
          // Find user by email
          const userResult = await query(
            'SELECT id, email, password_hash FROM public.users WHERE email = $1',
            [credentials.email]
          )

          if (userResult.rows.length === 0) {
            return null
          }

          const user = userResult.rows[0]

          // Get profile data
          const profileResult = await query(
            'SELECT id, email, full_name, pack_id, is_admin FROM public.profiles WHERE id = $1',
            [user.id]
          )

          const profile = profileResult.rows[0] || {
            id: user.id,
            email: user.email,
            full_name: null,
            pack_id: 'free',
            is_admin: false
          }

          // Verify password
          // PostgreSQL crypt format: crypt(plaintext, existing_hash) returns the hash if match
          // bcrypt format: use bcrypt.compare()
          const passwordHash = user.password_hash
          
          let isValid = false
          
          // Try PostgreSQL crypt format first (since schema uses crypt)
          try {
            const cryptResult = await query(
              'SELECT crypt($1, $2) = $2 as valid',
              [credentials.password, passwordHash]
            )
            isValid = cryptResult.rows[0]?.valid === true
          } catch (cryptError) {
            // If crypt fails, try bcrypt
            try {
              isValid = await bcrypt.compare(credentials.password, passwordHash)
            } catch (bcryptError) {
              console.error('Password verification error:', { cryptError, bcryptError })
              return null
            }
          }
          
          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: profile.full_name || user.email,
            packId: profile.pack_id || 'free',
            isAdmin: profile.is_admin || false
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
    error: '/auth/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.packId = (user as any).packId
        token.isAdmin = (user as any).isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).packId = token.packId
        ;(session.user as any).isAdmin = token.isAdmin
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
}

