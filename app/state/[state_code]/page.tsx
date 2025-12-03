import StateDetailsClient from './StateDetailsClient';

interface Props { params: Promise<{ state_code: string }> }

export default async function Page({ params }: Props) {
  // Server component: read params asynchronously and pass to client child
  const { state_code } = await params;
  const code = String(state_code);
  return (
    <StateDetailsClient stateCode={code} />
  );

}

// Server component wrapper — passes a primitive stateCode string down to the
// client-only child so we don't access the async `params` promise from client code.
