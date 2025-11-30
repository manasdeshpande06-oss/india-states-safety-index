import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get latest safety metrics for all states
    const { data: metrics, error } = await supabase
      .from('safety_metrics')
      .select(`
        *,
        states:state_id (
          id,
          code,
          name
        )
      `)
      .eq('recorded_at', '2023-01-01')
      .order('safety_percentage', { ascending: false });

    if (error) {
      console.error('Error fetching safety data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch safety data' },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const transformedData = metrics?.map(item => ({
      id: item.id,
      state_code: item.states?.code,
      state_name: item.states?.name,
      safety_percentage: item.safety_percentage,
      metrics: {
        crime: item.crime_rate,
        police: item.police_per_capita,
        road: item.road_safety,
        health: item.healthcare_access,
        emergency: item.emergency_response,
        disaster: item.disaster_risk,
        women: item.womens_safety
      },
      data_source_url: item.data_source_url,
      recorded_at: item.recorded_at
    })) || [];

    return NextResponse.json({
      data: transformedData,
      total: transformedData.length
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
    const { state_id, recorded_at, safety_percentage } = body;
    if (!state_id || !recorded_at || safety_percentage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: state_id, recorded_at, safety_percentage' },
        { status: 400 }
      );
    }

    // Insert new safety metrics
    const { data, error } = await supabase
      .from('safety_metrics')
      .insert({
        state_id,
        recorded_at,
        safety_percentage,
        crime_rate: body.crime_rate,
        police_per_capita: body.police_per_capita,
        road_safety: body.road_safety,
        healthcare_access: body.healthcare_access,
        emergency_response: body.emergency_response,
        disaster_risk: body.disaster_risk,
        womens_safety: body.womens_safety,
        data_source_url: body.data_source_url
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating safety metrics:', error);
      return NextResponse.json(
        { error: 'Failed to create safety metrics' },
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
