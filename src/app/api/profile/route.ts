import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const profile = await db.profile.findFirst();
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await db.profile.findFirst();

    if (existing) {
      const updated = await db.profile.update({
        where: { id: existing.id },
        data: body,
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.profile.create({ data: body });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
