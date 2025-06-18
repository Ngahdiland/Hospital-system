import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db', 'db.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    return NextResponse.json(db.doctors || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load doctors.' }, { status: 500 });
  }
}
