//    Tác giả: GnU
//    Ngày tạo: 11/09/2023
//    ©2023 LuaNonTeam

module.paths.push(
  require("child_process").execSync("npm root -g").toString().trim()
);

const { readFile } = require("fs");
const { Script } = require("vm");
const { JSDOM, ResourceLoader } = require("jsdom-cloudflare");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const filename = args.filename || "";

// For debug with proxy
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const requests = [];

class CustomResourceLoader extends ResourceLoader {
  fetch(url, options) {
    requests.push({ url, options });
    return super.fetch(url, options);
  }
}

readFile(filename, "UTF-8", async function (err, data) {
  const args = minimist(data.split("\r\n") || data.split("\n"));
  const tag = args.tag || "";
  const scriptStr = args.scriptStr || "";
  const url = args.url || undefined;
  const referrer = args.referrer || undefined;
  const userAgent = args.userAgent || "Mozilla/5.0";
  const scriptCall = args.scriptCall || "";
  const loader = new ResourceLoader({
    userAgent,
    // For debug with proxy
    proxy: "http://localhost:8000",
    strictSSL: false
  });

  const dom = new JSDOM(
    args.html || `<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8" /></head><body></body></html>`,
    {
      url,
      referrer,
      contentType: "text/html",
      includeNodeLocations: true,
      runScripts: "dangerously",
      pretendToBeVisual: true,
      resources: loader,
      allowSpecialUseDomain: true,
      rejectPublicSuffixes: false
    }
  );

  const context = dom.getInternalVMContext();
  const windowCustom = {};

  // For debug
  windowCustom.objectToJsonString = function (obj) {
    let result = {};
    Object.getOwnPropertyNames(obj).forEach((key) => {
      const value = obj[key];
      switch (typeof value) {
        case "undefined":
          result[key] = "undefined";
          break;
        case "function":
          result[key] = value.toString();
          break;
        default:
          try {
            result[key] = JSON.parse(JSON.stringify(value));
          } catch (error) {}
          break;
      }
    });
    return JSON.stringify(result);
  };

  Object.keys(windowCustom).forEach((key) => {
    Object.defineProperty(context.window, key, {
      value: windowCustom[key],
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });

let maxWait = parseInt(args.maxWait) || 30000;

    while (maxWait > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      maxWait -= 500;
    }

  const scriptRun = `${scriptStr}${scriptStr.endsWith(";") ? "" : ";"}window[\`${tag}\`] = ${scriptCall}`;
  const script = new Script(scriptRun);
  script.runInNewContext(context);
  console.log({
    result: dom.window[tag],
    requests
  });
});
