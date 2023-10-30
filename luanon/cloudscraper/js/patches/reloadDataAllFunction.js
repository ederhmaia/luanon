module.exports = {
  patchJsDom: function (ctx) {
    const _appendChild = ctx.document.body.appendChild.bind(ctx.document.body);
    ctx.document.body.appendChild = function appendChild(id) {
      const elm = _appendChild(id);
      console.log("id =>", id);
      // if (id !== "iframe") return elm;
      console.log(id.contentWindow);
      // console.log(id.contentDocument);
      // Object.defineProperty(elm, "contentWindow", {
      //   value: ctx,
      // });
      // Object.defineProperty(elm, "contentDocument", {
      //   value: ctx.document,
      // });
      return elm;
    };
  },
};
