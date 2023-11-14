//    Tác giả: GnU
//    Ngày tạo: 11/14/2023
//    ©2023 LuaNonTeam

module.paths.push(
    require("child_process").execSync("npm root -g").toString().trim()
);

const vm = require("vm");
const { JSDOM, ResourceLoader } = require("jsdom-cloudflare");

const requests = [];
const context = {};

class CustomResourceLoader extends ResourceLoader {
    fetch(url, options) {
        requests.push({ url, options });
        return super.fetch(url, options);
    }
}

const init = function (url, referrer, html, userAgent) {
    const loader = new CustomResourceLoader({ userAgent });

    const dom = new JSDOM(
        html,
        {
            url,
            referrer,
            contentType: "text/html",
            includeNodeLocations: true,
            runScripts: "dangerously",
            pretendToBeVisual: true,
            resources: loader,
            allowSpecialUseDomain: true,
            rejectPublicSuffixes: false,
            beforeParse: function (window) {
                window.XMLHttpRequest.prototype.send = function() {
                    requests.push({ arguments });
                };
            }
        }
    );

    context = dom.getInternalVMContext();
}

process.stdin.on("data", (data) => {
    try {
        const input = JSON.parse(data.toString().trim());
        if (context){
            process.stdout.write(JSON.stringify({ result: vm.runInContext(atob(input.command), context) || "", error: "" }) + "\n");
        } else {
            vm.createContext(context);
            process.stdout.write(JSON.stringify({ result: vm.runInContext(atob(input.command), context) || "", error: "" }) + "\n");
        }
    } catch (error) {
        process.stdout.write(JSON.stringify({ result: "", error: `${error.name}: ${error.message}` }) + "\n");
    }
});

process.on("SIGINT", () => process.exit());
process.stdin.on("end", () => process.exit());
