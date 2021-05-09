//import * as Sentry from '@sentry/react';
//import { Integrations } from "@sentry/tracing";

function init () {
   // Sentry.init({
   //   dsn:
     //   "https://e5453b2df9c043fb9bbe578fe0cd4bd5@o591071.ingest.sentry.io/5740281",
     // release: "my-project-name@" + process.env.npm_package_version,
     // integrations: [new Integrations.BrowserTracing()],

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
     // tracesSampleRate: 1.0,
   // });
}

function log(error) {
   // Sentry.captureException(error);
   console.log(error);
}

export default {
    init,
    log
};