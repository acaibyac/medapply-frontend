import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assistant/reply`, {
    method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(body)
  });
  return NextResponse.json(await r.json(), { status: r.status });
}
