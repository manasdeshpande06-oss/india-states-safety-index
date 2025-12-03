import StateDetailsClient from './StateDetailsClient';

interface Props { params: { state_code: string } }

export default function Page({ params }: Props) {
  // Server component: read params synchronously and pass to client child
  const code = String(params.state_code);
  return (
    <StateDetailsClient stateCode={code} />
  );

}

// Server component wrapper — passes a primitive stateCode string down to the
// client-only child so we don't access the async `params` promise from client code.
