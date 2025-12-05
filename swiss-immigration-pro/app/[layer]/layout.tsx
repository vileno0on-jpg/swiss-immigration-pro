import { redirect } from 'next/navigation'
import { ClientLayout } from '@/components/providers/ClientLayout'

export default async function LayerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ layer: string }>
}) {
  const { layer } = await params
  
  // Only redirect old layer routes to new static routes
  const routeMap: Record<string, string> = {
    'europeans': '/eu',
    'americans': '/us',
    'others': '/other'
  }
  
  // If it's an old route name, redirect to the new route
  if (layer && routeMap[layer]) {
    redirect(routeMap[layer])
  }
  
  // Allow new routes (eu, us, other) and their sub-routes to pass through
  return <ClientLayout>{children}</ClientLayout>
}
