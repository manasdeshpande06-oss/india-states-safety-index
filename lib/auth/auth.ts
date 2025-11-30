import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const supabase = await createClient();
  
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!userData || userData.role !== 'admin') {
    redirect('/unauthorized');
  }

  return user;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role, email')
    .eq('id', user.id)
    .single();

  return {
    ...user,
    role: userData?.role || 'viewer',
    email: userData?.email || user.email
  };
}
