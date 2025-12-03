// Initialize PostHog only in the browser and using an eval-based require
// to avoid static bundler resolution when the package isn't installed.
if (typeof window !== 'undefined') {
    try {
        // Use eval to call require so Turbopack/webpack static analysis won't try to resolve it.
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const req: any = eval('require');
        const posthog = req ? req('posthog-js') : null;
        if (posthog && typeof posthog.init === 'function') {
            posthog.init('phc_v1zGl740rSRNUNCouxKTzOdK31AIcRRWXNf4VMpfa4y', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-05-24',
            });
        }
    } catch (e) {
        // PostHog not installed or failed to initialize — ignore in dev
    }
}
