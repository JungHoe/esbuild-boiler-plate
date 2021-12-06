const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");
const { pnpPlugin } = require("@yarnpkg/esbuild-plugin-pnp");

(async () => {
  process.env.NODE_ENV = "development";
  process.env.PORT = 3000;
  const entryPoints = ["src/index.tsx"];
  const builder = await build({
    bundle: true,
    entryPoints,
    entryNames: "[dir]/bundle",
    sourcemap: true,
    incremental: true,
    outdir: "/public/sources",
    plugins: [pnpPlugin()],
  });
  // `chokidar` watcher source changes.
  chokidar
    .watch("src/**/*.{ts,tsx}", {
      // Watches TypeScript and React TypeScript.
      interval: 0, // No delay
    })
    .on("all", () => {
      // Rebuilds esbuild (incrementally -- see `build.incremental`).
      builder.rebuild();
    });
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: false,
    // Uses `PORT=...` or 8080 as a fallback.
    port: +process.env.PORT || 8080,
    // Uses `public` as the local server folder.
    root: "public",
  });
})();
