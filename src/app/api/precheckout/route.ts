import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const token = body?.turnstileToken || req.headers.get('x-turnstile-token') || ''
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/precheckout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Turnstile-Token': token },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
  const data = await r.json().catch(() => ({}))
  return NextResponse.json(data, { status: r.status })
}
