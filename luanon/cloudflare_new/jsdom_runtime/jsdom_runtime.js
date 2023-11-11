//    Tác giả: GnU
//    Ngày tạo: 11/09/2023
//    ©2023 LuaNonTeam

module.paths.push(require("child_process").execSync("npm root -g").toString().trim())

const { readFile } = require("fs");
const { Script } = require("vm");
const { JSDOM, ResourceLoader } = require("jsdom-cloudflare");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const filename = args.filename || "";

readFile(filename, "UTF-8", async function (err, data) {
    const args = minimist(data.split("\r\n") || data.split("\n"));
    const tag = args.tag || "";
    const scriptStr = args.scriptStr || "";
    const url = args.url || undefined;
    const referrer = args.referrer || undefined;
    const userAgent = args.userAgent || "Mozilla/5.0";
    const scriptCall = args.scriptCall || "";
    const promise = args.promise || "false";
    const loader = new ResourceLoader({ userAgent });
    
    const dom = new JSDOM(args.html || `<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8" /></head><body></body></html>`, {
        url,
        referrer,
        contentType: "text/html",
        includeNodeLocations: true,
        runScripts: "dangerously",
        pretendToBeVisual: true,
        resources: loader,
        allowSpecialUseDomain: true,
        rejectPublicSuffixes: false,
    });

    const context = dom.getInternalVMContext();
    let scriptRun = "";

  let sendUrl = null;
    const win = {
        objectToJsonString: function (obj) {
            let result = {};
            Object.getOwnPropertyNames(obj).forEach(key => {
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
        },
        sendRequest: function (url) {
      sendUrl = url;
    console.log('sendRequest called with URL:', url);
        }
    }
    Object.assign(context.window, win);

    if (promise === "true") {
        const script = new Script(scriptStr);
        script.runInNewContext(context);
        let maxWait = parseInt(args.maxWait) || 30000;

        while (maxWait > 0 && !sendUrl) {
        console.log(sendUrl);
            await new Promise((resolve) => setTimeout(resolve, 500));
            maxWait -= 500;
        }

        console.log(sendUrl);
    } else {
        scriptRun = `${scriptStr}${scriptStr.endsWith(";") ? "" : ";"}window[\`${tag}\`] = ${scriptCall}`;
        const script = new Script(scriptRun);
        script.runInNewContext(context);
        console.log(dom.window[tag]);
    }
});
