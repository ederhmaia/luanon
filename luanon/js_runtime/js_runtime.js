//    Tác giả: GnU
//    Ngày tạo: 11/14/2023
//    ©2023 LuaNonTeam

const vm = require("vm");

const context = {};
vm.createContext(context);

process.stdin.on("data", (data) => {
    try {
        const input = JSON.parse(data.toString().trim());
        process.stdout.write(JSON.stringify({ result: vm.runInContext(input.command, context) || "", error: "" }) + "\n");
    } catch (error) {
        process.stdout.write(JSON.stringify({ result: "", error: `${error.name}: ${error.message}` }) + "\n");
    }
});

process.on("SIGINT", () => process.exit());
process.stdin.on("end", () => process.exit());
