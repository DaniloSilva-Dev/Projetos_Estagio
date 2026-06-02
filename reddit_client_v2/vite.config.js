import { defineConfig } from "vite";

import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const caPath = path.join(os.homedir(), "ca.pem");

const agent = new https.Agent({
  ca: fs.readFileSync(caPath),
});

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://www.reddit.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
