import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const skill = await db.skill.create({ data: body });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
