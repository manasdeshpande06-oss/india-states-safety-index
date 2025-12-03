import { createClient } from '@/lib/supabase/server';
import { allIndianStates } from '@/lib/mock/sampleData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.warn('Supabase not configured - returning mock states list for development');
      const transformed = allIndianStates.map(s => ({ id: s.id, code: s.state_code, name: s.state_name }));
      return NextResponse.json({ data: transformed, total: transformed.length });
    }
    
    // Get all states
    const { data: states, error } = await supabase
      .from('states')
      .select('id, code, name')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching states:', error);
      return NextResponse.json(
        { error: 'Failed to fetch states' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: states || [],
      total: states?.length || 0
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    
    // Validate required fields
    const { code, name } = body;
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: code, name' },
        { status: 400 }
      );
    }

    // Insert new state
    const { data, error } = await supabase
      .from('states')
      .insert({
        code: code.toUpperCase(),
        name
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating state:', error);
      return NextResponse.json(
        { error: 'Failed to create state' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
