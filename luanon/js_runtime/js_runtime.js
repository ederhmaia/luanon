//    Tác giả: GnU
//    Ngày tạo: 11/14/2023
//    ©2023 LuaNonTeam

module.paths.push(
    require("child_process").execSync("npm root -g").toString().trim()
);

const vm = require("vm");

const context = {};
vm.createContext(context);

process.stdin.on("data", (input) => {
    try {
        input = input.toString().trim();
        let data = JSON.parse(atob(input));
        let result = vm.runInContext(data.command, context);

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
            error: null
        })) + "-";
        for (let i = 0; i < result.length; i++) {
            process.stdout.write(result[i]);
        }
        process.stdout.write("\n");
    } catch (error) {
        result = "-" + btoa(JSON.stringify({
            result: null,
            error: `NodeError: ${error.stack}`
        })) + "-";
        for (let i = 0; i < result.length; i++) {
            process.stdout.write(result[i]);
        }
        process.stdout.write("\n");
    }
});

process.on("SIGINT", () => process.exit());
process.stdin.on("end", () => process.exit());
