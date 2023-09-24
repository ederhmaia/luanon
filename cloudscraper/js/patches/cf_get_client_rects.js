const prJson = require("./json/pr.json");

module.exports = {
  patchJsDom: function (ctx) {
    const checkObject = (obj1, obj2) => {
      for (const key in obj1) {
        if (obj1[key] != obj2[key]) return false;
      }
      return true;
    };

    const _appendChild = ctx.document.body.appendChild.bind(ctx.document.body);
    ctx.document.body.appendChild = function appendChild(id) {
      const elm = _appendChild(id);
      let document = null;
      if (id.contentDocument) {
        document = id.contentDocument;
      } else if (id.contentWindow) {
        document = id.contentWindow.document;
      }
      const _getElementById = document.getElementById.bind(document);
      document.getElementById = function (id) {
        const elm = _getElementById(id);
        if (!id.startsWith("pr")) return elm;
        const check = ctx.getComputedStyle(elm);
        let data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        };
        if (
          prJson[id] &&
          prJson[id]["1"] &&
          checkObject(check._values, prJson[id]["1"])
        ) {
          data = prJson[id]["0"];
        }

        elm.getClientRects = function () {
          return data;
        };
        return elm;
      };
      return elm;
    };
  },
};
