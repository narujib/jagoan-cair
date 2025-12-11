type EventPayload = Record<string, unknown>;

export function trackEvent(event: string, payload?: EventPayload) {
  if (process.env.NODE_ENV === "production") {
    // Integrate with your analytics provider here.
  }
  // Fallback logging to aid debugging in dev/staging.
  // eslint-disable-next-line no-console
  console.debug(`[event] ${event}`, payload || {});
}
