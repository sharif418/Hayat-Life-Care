import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/site-settings - Get all site settings grouped by group
export async function GET() {
  try {
    const settings = await db.siteSetting.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });

    // Group settings by group
    const grouped = settings.reduce(
      (acc, setting) => {
        const group = setting.group || 'general';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(setting);
        return acc;
      },
      {} as Record<string, typeof settings>
    );

    return NextResponse.json({ data: grouped });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

// PUT /api/site-settings - Bulk update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Settings array is required' },
        { status: 400 }
      );
    }

    const results: Array<{ id: string; key: string; value: string; type: string; group: string; label: string | null; updatedAt: Date }> = [];

    for (const setting of settings) {
      const { key, value } = setting;
      if (!key) continue;

      const updated = await db.siteSetting.upsert({
        where: { key },
        update: { value: value || '' },
        create: {
          key,
          value: value || '',
          type: 'text',
          group: 'general',
        },
      });

      results.push(updated);
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
