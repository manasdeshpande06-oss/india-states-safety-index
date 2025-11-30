import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get all data uploads
    const { data: uploads, error } = await supabase
      .from('data_uploads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching uploads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch uploads' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: uploads || [],
      total: uploads?.length || 0
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
    const { filename, file_type } = body;
    if (!filename || !file_type) {
      return NextResponse.json(
        { error: 'Missing required fields: filename, file_type' },
        { status: 400 }
      );
    }

    // Insert new upload record
    const { data, error } = await supabase
      .from('data_uploads')
      .insert({
        filename,
        file_type,
        source_url: body.source_url,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating upload record:', error);
      return NextResponse.json(
        { error: 'Failed to create upload record' },
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
