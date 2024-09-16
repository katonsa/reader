// @ts-check
"use strict";

import app from "./app.js";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};
const server = app({
  logger: envToLogger[process.env.NODE_ENV || "development"] ?? true,
});

const port = parseInt(process.env.APP_PORT || "3000", 10);
server.listen({ port }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
