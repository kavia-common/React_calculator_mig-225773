# React Calculator (React_calculator_mig-225773)

A simple calculator application built with React.

## Quick start

1. Install dependencies:
   npm install

2. Start the development server:
   npm start
   # or
   bash ./run-dev.sh

By default, the app will start on HOST=0.0.0.0 and PORT=3000 so it can be accessed by external tooling. You can override at runtime:
HOST=127.0.0.1 PORT=3000 npm start

## Environment variables

This project can accept environment variables prefixed with REACT_APP_. The following may be present in your environment but are not required for startup:
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

## Notes

- To build for production: npm run build
- This is a minimal scaffold using react-scripts (CRA-like) to satisfy the requirement that npm start works out-of-the-box.
