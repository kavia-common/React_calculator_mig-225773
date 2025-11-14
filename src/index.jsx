import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Log server startup info to help preview system detect readiness.
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || process.env.REACT_APP_PORT || "3000";
const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH || "/healthcheck";
console.log(`[startup] React dev client initializing. Expected server: http://${host}:${port}${healthPath}`);

// Optionally register a very naive window path check for /healthcheck that just logs readiness.
// Note: CRA dev server serves index.html for all paths; this is just a signal.
if (typeof window !== "undefined") {
  try {
    if (window.location && window.location.pathname === healthPath) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify({ status: "ok", port, host }));
    }
  } catch (_) {
    // no-op
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
