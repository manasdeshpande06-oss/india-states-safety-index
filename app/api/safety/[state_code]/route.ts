import { createClient } from '@/lib/supabase/server';
import { findStateByCode, allIndianStates } from '@/lib/mock/sampleData';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ state_code: string }> }
) {
  try {
    const { state_code } = await params;
    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.warn('Supabase not configured - returning mock state details for development');
      const s = findStateByCode(state_code);
      if (!s) return NextResponse.json({ error: 'State not found' }, { status: 404 });

      const transformedData = {
        state: { id: s.id, code: s.state_code, name: s.state_name },
        safety_percentage: s.safety_percentage,
        metrics: s.metrics,
        data_source_url: s.data_source_url,
        recorded_at: s.recorded_at,
        trend: [
          { year: 2020, value: Math.max(40, s.safety_percentage - 4) },
          { year: 2021, value: Math.max(45, s.safety_percentage - 2) },
          { year: 2022, value: s.safety_percentage }
        ]
      };

      return NextResponse.json({ data: transformedData });
    }
    
    // Get state by code
    const { data: state, error: stateError } = await supabase
      .from('states')
      .select('id, code, name')
      .eq('code', state_code.toUpperCase())
      .single();

    if (stateError || !state) {
      return NextResponse.json(
        { error: 'State not found' },
        { status: 404 }
      );
    }

    // Get latest safety metrics for the state
    const { data: metrics, error } = await supabase
      .from('safety_metrics')
      .select('*')
      .eq('state_id', state.id)
      .eq('recorded_at', '2023-01-01')
      .single();

    if (error) {
      console.error('Error fetching safety metrics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch safety metrics' },
        { status: 500 }
      );
    }

    // Get historical data for trends
    const { data: historicalData, error: historicalError } = await supabase
      .from('safety_metrics')
      .select('recorded_at, safety_percentage')
      .eq('state_id', state.id)
      .order('recorded_at', { ascending: true });

    if (historicalError) {
      console.error('Error fetching historical data:', historicalError);
    }

    // Transform the data
    const transformedData = {
      state: {
        id: state.id,
        code: state.code,
        name: state.name
      },
      safety_percentage: metrics?.safety_percentage || 0,
      metrics: {
        crime: metrics?.crime_rate,
        police: metrics?.police_per_capita,
        road: metrics?.road_safety,
        health: metrics?.healthcare_access,
        emergency: metrics?.emergency_response,
        disaster: metrics?.disaster_risk,
        women: metrics?.womens_safety
      },
      data_source_url: metrics?.data_source_url,
      recorded_at: metrics?.recorded_at,
      trend: historicalData?.map(item => ({
        year: new Date(item.recorded_at).getFullYear(),
        value: item.safety_percentage
      })) || []
    };

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { state_code: string } }
) {
  try {
    const { state_code } = params;
    const body = await request.json();
    const supabase = await createClient();
    
    // Get state by code
    const { data: state, error: stateError } = await supabase
      .from('states')
      .select('id')
      .eq('code', state_code.toUpperCase())
      .single();

    if (stateError || !state) {
      return NextResponse.json(
        { error: 'State not found' },
        { status: 404 }
      );
    }

    // Update or insert safety metrics
    const { data, error } = await supabase
      .from('safety_metrics')
      .upsert({
        state_id: state.id,
        recorded_at: body.recorded_at || '2023-01-01',
        safety_percentage: body.safety_percentage,
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
      console.error('Error updating safety metrics:', error);
      return NextResponse.json(
        { error: 'Failed to update safety metrics' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
