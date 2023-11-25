//    Tác giả: GnU
//    Ngày tạo: 11/14/2023
//    ©2023 LuaNonTeam

//    Tắt cảnh báo TLS
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.paths.push(
    require("child_process").execSync("npm root -g").toString().trim()
);

const vm = require("vm");

objectToJsonString = function(obj) {
    let result = {};
    Object.getOwnPropertyNames(obj).forEach((key) => {
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
};

global_error = "";
const context = {
    jsdom: require("jsdom-cloudflare"),
    objectToJsonString,
    vm
};
vm.createContext(context);

console = ((dict = {}) => new Proxy(console, {
    get(console, key) {
        if (typeof console[key] === "function") {
            return dict[key] ?? (dict[key] = (...args) => {
                global_error += args.join(" ") + "\n";
                return null;
            })
        }
        return console[key]
    }
}))()

process.stdin.on("data", (input) => {
    let result;
    try {
        input = input.toString().trim();
        let data = JSON.parse(atob(input));
        result = vm.runInContext(data.command, context);

        switch (typeof result) {
            case "boolean":
            case "number":
            case "string":
            case "object":
                break;
            case "undefined":
                result = null;
                break;
            default:
                result = String(result);
                break;
        }

        result = "-" + btoa(JSON.stringify({
            result: result,
            error: null,
            log: global_error || null
        })) + "-";
    } catch (error) {
        result = "-" + btoa(JSON.stringify({
            result: null,
            error: `NodeError: ${error.stack}`,
            log: global_error || null
        })) + "-";
    } finally {
        for (let i = 0; i < result.length; i++) {
            process.stdout.write(result[i]);
        }
        process.stdout.write("\n");
        global_error = "";
    }
});

process.on("SIGINT", () => process.exit());
process.stdin.on("end", () => process.exit());
