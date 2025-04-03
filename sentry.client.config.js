import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a91df61bc187da4b1e01c0fd33a3a833@o4509087546408960.ingest.us.sentry.io/4509087548506112",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
  ],
});