import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">403</h1>
          <h2 className="mt-4 text-2xl font-semibold text-slate-700">Unauthorized</h2>
          <p className="mt-2 text-slate-600">
            You don't have permission to access this page. Admin access required.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="block w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
