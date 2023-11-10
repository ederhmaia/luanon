

async function runCodeCf(
  opt,
  ctx,
  js,
  referrer = "https://gleam.io/",
  url = "https://gleam.io/"
) {
//  const userAgent =
//    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0";
//  const reqLog = new RequestsLog();
//  const loader = new ResourceLoader({ userAgent: userAgent });
//  const dom = new JSDOM(
//    `<!DOCTYPE html>
//  <html lang="en">
//    <head>
//      <meta charset="UTF-8" />
//    </head>
//    <body><form id="challenge-form" ></form></body>
//    <div id="challenge-stage" style="display: block;"><div id="cf-norobot-container" style="display: flex; align-items: center; justify-content: center;"><input type="button" value="Verify you are human" style="margin: 0px; cursor: pointer;"></div></div>
//  </html>`,
//    {
//      url: url,
//      referrer: referrer,
//      contentType: "text/html",
//      includeNodeLocations: true,
//      runScripts: "dangerously",
//      pretendToBeVisual: true,
//      resources: loader,
//      allowSpecialUseDomain: true,
//      rejectPublicSuffixes: false,
//    }
//  );


  let sendUrl = null;
  let maxWait = 20000;
  const winn = {
    sendRequest: function (url) {
      sendUrl = url;
    },
  };
  const chContext = dom.getInternalVMContext();
    opt.img =
      "iVBORw0KGgoAAAANSUhEUgAAACkAAAAwCAIAAAAD28TyAAAABElEQVQAAAABnSTXkQAAAABJRU5ErkJggg==";
    chContext.window["_cf_chl_opt"] = opt;
    chContext.window["_cf_chl_ctx"] = ctx;
    Object.assign(chContext.window, winn);

    const script = new vm.Script(js);
    script.runInNewContext(chContext);
  const data = chContext.window._cf_chl_ctx;
  while (!sendUrl && maxWait > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("doi url");
    maxWait -= 500;
  }
  patchContext(data, { reqLog: reqLog });
  return { url: sendUrl, data: dom.window._cf_chl_ctx };
}

