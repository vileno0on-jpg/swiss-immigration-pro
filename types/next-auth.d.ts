import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      isAdmin: boolean
      packId: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    isAdmin: boolean
    packId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    isAdmin: boolean
    packId: string
  }
}

