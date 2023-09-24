var express = require("express");
const { JSDOM, ResourceLoader } = require("./jsdom-cloudflare");
const vm = require("vm");
const { patchJsDom, patchScript, patchContext } = require("./patches");
const RequestsLog = require("./RequestsLog");

var app = express();

async function runCodeCf(
  opt,
  ctx,
  js,
  referrer = "https://gleam.io/",
  url = "https://gleam.io/"
) {
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0";
  const reqLog = new RequestsLog();
  const loader = new ResourceLoader({ userAgent: userAgent });
  const dom = new JSDOM(
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
    </head>
    <body><form id="challenge-form" ></form></body>
    <div id="challenge-stage" style="display: block;"><div id="cf-norobot-container" style="display: flex; align-items: center; justify-content: center;"><input type="button" value="Verify you are human" style="margin: 0px; cursor: pointer;"></div></div>
  </html>`,
    {
      url: url,
      referrer: referrer,
      contentType: "text/html",
      includeNodeLocations: true,
      runScripts: "dangerously",
      pretendToBeVisual: true,
      resources: loader,
      allowSpecialUseDomain: true,
      rejectPublicSuffixes: false,
    }
  );

  patchJsDom(dom, {
    url: url,
    userAgent: userAgent,
    reqLog: reqLog,
  });

  function _execScript(scriptStr, window = {}) {
    const chContext = dom.getInternalVMContext();
    opt.img =
      "iVBORw0KGgoAAAANSUhEUgAAACkAAAAwCAIAAAAD28TyAAAABElEQVQAAAABnSTXkQAAAABJRU5ErkJggg==";
    chContext.window["_cf_chl_opt"] = opt;
    chContext.window["_cf_chl_ctx"] = ctx;
    Object.assign(chContext.window, window);

    const script = new vm.Script(scriptStr);
    script.runInNewContext(chContext);
    return chContext.window._cf_chl_ctx;
  }
  let sendUrl = null;
  let maxWait = 20000;
  const winn = {
    sendRequest: function (url) {
      sendUrl = url;
    },
  };
  const data = _execScript(js, winn);
  while (!sendUrl && maxWait > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("doi url");
    maxWait -= 500;
  }
  patchContext(data, { reqLog: reqLog });
  return { url: sendUrl, data: dom.window._cf_chl_ctx };
}

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", function (req, res) {
  res.send("Hello Duy nè");
});

app.post("/runcodecf", async function (req, res) {
  const datareq = req.body;
  if (datareq.js && datareq.otp && datareq.ctx) {
    console.log(datareq.js);
    if (datareq.url && datareq.referrer) {
      const codeRun = await runCodeCf(
        typeof datareq.otp != "object" ? JSON.parse(datareq.otp) : datareq.otp,
        typeof datareq.ctx != "object" ? JSON.parse(datareq.ctx) : datareq.ctx,
        Buffer.from(datareq.js, "base64").toString("ascii"),
        datareq.referrer,
        datareq.url
      );
      console.log(codeRun);
      res.json(codeRun);
    } else {
      const codeRun = await runCodeCf(
        typeof datareq.otp != "object" ? JSON.parse(datareq.otp) : datareq.otp,
        typeof datareq.ctx != "object" ? JSON.parse(datareq.ctx) : datareq.ctx,
        Buffer.from(datareq.js, "base64").toString("ascii")
      );
      res.json(codeRun);
    }
  } else if (!datareq.ctx) {
    res.send("Không có ctx");
  } else if (!datareq.otp) {
    res.send("Không có otp");
  } else if (!datareq.js) {
    res.send("Không có js");
  } else {
    res.send("Data lỗi");
  }
});

app.use(function (req, res) {
  res.status(404);
  res.send("404: File Not Found");
});

app.listen(8888, function () {
  console.log("Example app listening on port 8888");
});
//
// scp C:/codeTool/bypassCloudFlare/serverCloudflare.js root@103.153.68.118:/root/cloudflare
// yarn add express jsdom vm
