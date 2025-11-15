import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@/lib/supabase/server'
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
          const supabase = await createClient()

          // For now, we'll use a custom users table in Supabase
          // This maintains compatibility with existing auth flow
          const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !users) {
            return null
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, users.password_hash)

          if (!isValid) {
            return null
          }

          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', users.id)
            .single()

          console.log('Auth successful for user:', users.email)
          console.log('Profile data:', profile)
          console.log('isAdmin value:', profile?.is_admin)

          const userData = {
            id: users.id,
            email: users.email,
            name: profile?.full_name || null,
            isAdmin: profile?.is_admin || false,
            packId: profile?.pack_id || 'free',
          }

          console.log('Returning user data:', userData)
          return userData
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
      console.log('JWT callback - user:', user)
      console.log('JWT callback - token before:', token)
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
        token.packId = user.packId
        console.log('JWT callback - setting isAdmin:', user.isAdmin)
      }
      console.log('JWT callback - token after:', token)
      return token
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token)
      console.log('Session callback - session before:', session)
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
        session.user.packId = token.packId as string
        console.log('Session callback - setting isAdmin:', token.isAdmin)
      }
      console.log('Session callback - session after:', session)
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

