import { ClientLayout } from '@/components/providers/ClientLayout'

export default function LayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}







