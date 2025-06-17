// Minimal JWT auth API route for register (mocked)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  // Replace with real registration logic
  if (email && password) {
    // Registration success (mock)
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
}
