import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Indian States Safety Index",
  description: "Get in touch with the India Safety Index team",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen p-6">
      <section className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-slate-700">
          Have feedback, data, or partnership proposals? Reach out using the form below.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <form
            className="space-y-4"
            aria-label="Contact form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! This is a placeholder; submission will be wired later.");
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-slate-700 mb-1">Name</label>
              <input id="name" type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-slate-700 mb-1">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-slate-700 mb-1">Message</label>
              <textarea id="message" className="w-full rounded-lg border border-slate-300 px-3 py-2" rows={5} required />
            </div>
            <button type="submit" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}
