import { NextResponse } from 'next/server'

export async function GET() {
  // consider any missing supabase env var as 'not configured'
  const url = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return NextResponse.json({ usingSupabase: url && key });
}
