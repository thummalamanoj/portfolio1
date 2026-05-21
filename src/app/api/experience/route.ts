import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const experience = await db.experience.create({ data: body });
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
