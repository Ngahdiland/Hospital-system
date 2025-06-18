import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CHAT_FILE = path.join(process.cwd(), 'db', 'admin-chats.json');

export async function GET() {
  try {
    const data = fs.readFileSync(CHAT_FILE, 'utf-8');
    const messages = JSON.parse(data);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load chat messages.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = fs.readFileSync(CHAT_FILE, 'utf-8');
    const messages = JSON.parse(data);
    messages.push(body);
    fs.writeFileSync(CHAT_FILE, JSON.stringify(messages, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
  }
}
