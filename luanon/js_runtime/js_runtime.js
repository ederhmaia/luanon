//    Tác giả: GnU
//    Ngày tạo: 11/14/2023
//    ©2023 LuaNonTeam

const vm = require("vm");

const sandbox = {
    global,
//    require rất nguy hiểm nếu chạy nhầm code có chứa mã độc
//    require
};

vm.createContext(sandbox);

process.stdin.on("data", async (data) => {
    const input = JSON.parse(data.toString().trim());
    const timeoutInMilliseconds = input.timeout * 1000;

    const promise = [];
    let timeoutId;

    const timeoutPromise = new Promise(resolve => {
        timeoutId = setTimeout(() => resolve("timeout"), timeoutInMilliseconds);
    });

    const commandPromise = new Promise(resolve => {
        try {
            const result = vm.runInContext(input.command, sandbox);
            clearTimeout(timeoutId);
            process.stdout.write(JSON.stringify({result, error: ""}) + "\n");
            resolve("done");
        } catch (error) {
            clearTimeout(timeoutId);
            process.stdout.write(JSON.stringify({result: "", error: error.message || ""}) + "\n");
            resolve("done");
        }
    });

    if (timeoutInMilliseconds !== 0) {
        promise.push(timeoutPromise);
    }

    promise.push(commandPromise);

    const result = await Promise.race(promise);

    if (result === "timeout") {
        process.stdout.write(JSON.stringify({result: "", error: "Hết thời gian chạy lệnh"}) + "\n");
    }
});

process.on("SIGINT", () => process.exit());
process.stdin.on("end", () => process.exit());
