import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db', 'db.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    return NextResponse.json(db.appointments || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load appointments.' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    const idx = db.appointments.findIndex((a) => a.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    db.appointments[idx] = { ...db.appointments[idx], ...body };
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return NextResponse.json(db.appointments[idx]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment.' }, { status: 500 });
  }
}
