export const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!

export async function startCheckout(data: any) {
  const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Checkout error')
  return res.json() as Promise<{ checkoutUrl: string }>
}

export async function verify(session_id: string) {
  const r = await fetch(`/api/verify?session_id=${encodeURIComponent(session_id)}`)
  if (!r.ok) throw new Error('Verify error')
  return r.json() as Promise<{ orderId: string | null; status: string }>
}
