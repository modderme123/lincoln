const servor = require("servor");
const { build } = require("esbuild");
const fs = require("fs-extra");
const chokidar = require("chokidar");

const production = process.argv[2] == "production";

function runBuild() {
  build({
    entryPoints: ["./index.ts"],
    outfile: "dist/script.js",
    bundle: true,
    minify: production,
  });
}

function copy() {
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  fs.copy("public/", "dist/", (err) => {
    if (err) throw err;
    console.log("Copied public to dist/");
  });
}

if (production) {
  fs.rmdirSync("dist", { recursive: true });
}

runBuild();
copy();

if (!production) {
  chokidar.watch("index.ts").on("change", runBuild);
  chokidar.watch("public").on("change", copy);

  console.log("starting server on port 8080");
  servor({
    root: "dist",
    reload: true,
  });
}
