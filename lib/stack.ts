import { StackServerApp } from "@stackframe/stack";

// Only initialize Stack Auth if environment variables are available
export const stackServerApp = process.env.NEXT_PUBLIC_STACK_PROJECT_ID && process.env.STACK_SECRET_SERVER_KEY
  ? new StackServerApp({
      tokenStore: "nextjs-cookie",
      urls: {
        afterSignOut: "/auth/login",
      },
    })
  : null as any; // Fallback for build time
