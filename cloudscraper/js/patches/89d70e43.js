const imgProbe = require("probe-image-size");

module.exports = {
  patchJsDom: function (ctx) {
    const _getElementById = ctx.document.getElementById.bind(ctx.document);
    ctx.document.getElementById = function (id) {
      const elm = _getElementById(id);
      if (id !== "challenge-form") return elm;

      const _appendChild = elm.appendChild.bind(elm);
      elm.appendChild = function (child) {
        const result = _appendChild(child);
        if (child instanceof ctx["Image"]) {
          setTimeout(() => {
            // if (!child.src.startsWith('data:image/png;base64,'))
            // 	throw new Error('Unsupported image type: ' + child.src)

            const result = imgProbe.sync(
              Buffer.from(ctx.window._cf_chl_opt.img, "base64")
            );
            if (!result) throw new Error("Failed probing image: " + child.src);

            child.height = result.height;
            child.width = result.width;
            child.naturalHeight = result.height;
            child.naturalWidth = result.width;

            child.dispatchEvent(new ctx["Event"]("load"));
          }, 50);
        }

        return result;
      };

      return elm;
    };
  },
};
