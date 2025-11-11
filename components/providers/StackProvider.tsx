'use client'

import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

export function StackAuthProvider({ children }: { children: React.ReactNode }) {
  // Only render StackProvider on the client side to avoid SSR issues
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}



