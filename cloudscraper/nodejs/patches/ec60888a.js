module.exports = {
  patchJsDom: function (ctx, state) {
    ctx.window.performance.getEntries = function () {
      function makeResEntry(log, initiator) {
        return {
          entryType: "resource",
          initiatorType: initiator,
          name: log.url,
          nextHopProtocol: "h3",
          transferSize: log.totalLength,
          encodedBodySize: log.contentLength,
        };
      }

      const list = [];
      list.push({ entryType: "navigation", type: "navigate" });

      let log = state.reqLog.find("/orchestrate/managed/v1");
      if (log) list.push(makeResEntry(log, "script"));

      log = state.reqLog.find("/managed/js/transparent.gif");
      if (log) list.push(makeResEntry(log, "img"));

      log = state.reqLog.find("/nojs/transparent.gif");
      if (log) list.push(makeResEntry(log, "css"));

      list.push({ entryType: "paint", name: "first-paint" });
      list.push({ entryType: "paint", name: "first-contentful-paint" });

      log = state.reqLog.find("/favicon.ico");
      if (log) list.push(makeResEntry(log, "other"));

      log = state.reqLog.find("/cloudflare.hcaptcha.com");
      if (log) list.push(makeResEntry(log, "script"));

      // log = state.reqLog.find("/result?req_id=");
      // list.push(makeResEntry(log, "xmlhttprequest"));

      const logs = state.reqLog.find("/flow/ov1", false);
      for (let i = 0; i < logs.length; i++) {
        if (log) list.push(makeResEntry(logs[i], "xmlhttprequest"));
      }
      log = state.reqLog.find("/img/");
      if (log) list.push(makeResEntry(log, "img"));
      list.push({
        entryType: "mark",
        name: "cp-n-" + parseInt(ctx["_cf_chl_ctx"].cNounce, 10),
      });

      return list;
    };
  },
};
