import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  const data = await r.json()
  return NextResponse.json(data, { status: r.status })
}
