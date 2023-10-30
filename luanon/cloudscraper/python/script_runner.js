const vm = require("vm");
const jsdom = require("jsdom");
const crypto = require("crypto");

class CustomResourceLoader extends jsdom.ResourceLoader {
    fetch(url, options) {
        return null;
    }
}

process.stdin.on("readable", function () {
    var info = JSON.parse(process.stdin.read());
    var resourceLoader = new CustomResourceLoader({ userAgent: info.userAgent });
    var dom = new jsdom.JSDOM(info.page, {
        url: info.url,
        contentType: "text/html",
        resources: resourceLoader,
        runScripts: "dangerously",
        includeNodeLocations: true,
        pretendToBeVisual: true
    });

    var ctx = dom.getInternalVMContext();
//
//    for (let prop in ctx) {
//    if (prop.startsWith("_")) {
//      delete ctx[prop];
//    }
//  }

    ctx.window._cf_chl_opt = info._cf_chl_opt;
    ctx.window._cf_chl_ctx = info._cf_chl_ctx;
    ctx.window.SHA256 = function (input) {
        const hash = crypto.createHash("sha256");
        hash.update(input);
        return hash.digest("hex");
    };
    ctx.window.sendRequest = function (url) {
        process.stdout.write(JSON.stringify(ctx.window._cf_chl_ctx));
        process.exit();
    };

    var vmRunner = new vm.Script(info.script);
    vmRunner.runInNewContext(ctx);

});
