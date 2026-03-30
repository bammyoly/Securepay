import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      eventemitter3: path.resolve(__dirname, "node_modules/eventemitter3/index.js"),
    },
  },

  optimizeDeps: {
    exclude: ["cofhejs"],
    include: [
      "tweetnacl",
      "eventemitter3",
      "ethers-v5 > ethers",
    ],
  },

  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    fs: {
      allow: [".."],
    },
  },

  build: {
    target: "esnext",
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      include: [/tweetnacl/, /eventemitter3/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
});