// Minimal JWT auth API route for login (mocked)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  // Replace with real user validation
  if (email === 'patient@example.com' && password === 'password') {
    // Mock JWT token
    const token = 'mock-jwt-token';
    return NextResponse.json({ token });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
