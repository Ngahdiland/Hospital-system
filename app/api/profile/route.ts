import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db', 'db.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    // For demo, return the first user
    return NextResponse.json(db.users[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    db.users[0] = { ...db.users[0], ...body };
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return NextResponse.json(db.users[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
