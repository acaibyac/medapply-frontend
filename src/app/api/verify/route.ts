import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const session_id = searchParams.get('session_id')
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify?session_id=${encodeURIComponent(String(session_id))}`, { cache: 'no-store' })
  const data = await r.json()
  return NextResponse.json(data, { status: r.status })
}
