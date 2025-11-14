Dev server healthcheck:
- When running `npm start`, CRA dev server listens on HOST=0.0.0.0 and PORT=3000 (configurable via env).
- Access http://localhost:3000/ to see the calculator UI.
- Optional health path: if REACT_APP_HEALTHCHECK_PATH=/healthcheck (default), opening http://localhost:3000/healthcheck will log a readiness object in the browser console:
  {"status":"ok","port":"3000","host":"0.0.0.0"}

Troubleshooting:
- If Windows PowerShell does not interpret `HOST=... PORT=...` prefix, run:
  set HOST=0.0.0.0 && set PORT=3000 && npm start
- Or install cross-env and modify scripts accordingly.
