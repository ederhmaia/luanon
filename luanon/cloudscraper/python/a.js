const { Isolate, vm } = require("isolated-vm");
const { JSDOM } = require("jsdom");

const isolate = new Isolate({ memoryLimit: 128 });
const dom = new JSDOM(`<p>Hello world</p>`, {runScripts: "dangerously"});
var ctx = dom.getInternalVMContext();
for (let prop in ctx) {
    if (prop.startsWith("_")) {
      delete ctx[prop];
    }
  }
  console.log(ctx)
isolate.compileScriptSync(`
  console.log(window.document.querySelector("p").textContent);
`).run(ctx.window).catch(err => console.error(err));
