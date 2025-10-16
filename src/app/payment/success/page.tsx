import { verify } from '@/lib/api'

export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  const session_id = searchParams.session_id
  let status = 'pending'
  let orderId: string | null = null
  if (session_id) {
    try {
      const data = await verify(session_id)
      status = data.status
      orderId = data.orderId
    } catch {}
  }
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Payment confirmed</h1>
      <p className="mt-2">{orderId ? `✅ Order #${orderId}` : 'We are finalising your order…'}</p>
      <p className="mt-4">Your Personal Statement will be emailed shortly (usually within a few minutes). If you don’t receive it within 24 hours, please raise a ticket.</p>
    </main>
  )
}
