const fs = require("fs");
const config = require("./config.json");

const out = {
  name: config.name,
  author: config.author,
  url: config.url,
  packages: {}
};

for (const pkg of config.packages) {
  const version = pkg.version.replace(/^v/, '');
  out.packages[pkg.name] = {
    versions: {
      [version]: {
        url: `${pkg.repo}#${pkg.version}`,
        unity: pkg.unity,
        "vpm-dependencies": {}
      }
    }
  };
}

if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}
fs.writeFileSync("output/packages.vpm.json", JSON.stringify(out, null, 2));
