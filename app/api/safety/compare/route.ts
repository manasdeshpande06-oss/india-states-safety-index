import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const codes = searchParams.get('codes');
    
    if (!codes) {
      return NextResponse.json(
        { error: 'Missing required query parameter: codes' },
        { status: 400 }
      );
    }

    const stateCodes = codes.split(',').map(code => code.trim().toUpperCase());
    const supabase = await createClient();
    
    // Get states by codes
    const { data: states, error: statesError } = await supabase
      .from('states')
      .select('id, code, name')
      .in('code', stateCodes);

    if (statesError) {
      console.error('Error fetching states:', statesError);
      return NextResponse.json(
        { error: 'Failed to fetch states' },
        { status: 500 }
      );
    }

    if (!states || states.length === 0) {
      return NextResponse.json(
        { error: 'No states found' },
        { status: 404 }
      );
    }

    const stateIds = states.map(s => s.id);

    // Get latest safety metrics for the states
    const { data: metrics, error } = await supabase
      .from('safety_metrics')
      .select(`
        *,
        states:state_id (
          code,
          name
        )
      `)
      .in('state_id', stateIds)
      .eq('recorded_at', '2023-01-01');

    if (error) {
      console.error('Error fetching safety metrics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch safety metrics' },
        { status: 500 }
      );
    }

    // Transform the data for radar chart comparison
    const transformedData = metrics?.map(item => ({
      name: item.states?.name || 'Unknown',
      metrics: {
        crime: item.crime_rate || 0,
        police: item.police_per_capita || 0,
        road: item.road_safety || 0,
        health: item.healthcare_access || 0,
        emergency: item.emergency_response || 0,
        disaster: item.disaster_risk || 0,
        women: item.womens_safety || 0
      },
      safety_percentage: item.safety_percentage || 0,
      state_code: item.states?.code
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
