const Request = require("./requests-cheat");
var requestsCaptcha = new Request();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const clientKey = "66654d24f6d5415496b647ff12f8b37d";

async function CreateTask(websitePublicKey) {
  console.log("websitePublicKey =>", websitePublicKey);
  const url = "https://api.anycaptcha.com/createTask";
  const headers = {
    Host: "api.anycaptcha.com",
    "Content-Type": "application/json",
  };
  const data = {
    clientKey: clientKey,
    task: {
      type: "HCaptchaTaskProxyless",
      websiteKey: websitePublicKey,
      websiteURL: "https://gleam.io/",
    },
  };
  const res = await requestsCaptcha.POST(url, headers, data);
  return res.data;
}

async function GetTask(task) {
  const url = "https://api.anycaptcha.com/getTaskResult";
  const headers = {
    Host: "api.anycaptcha.com",
    "Content-Type": "application/json",
  };
  const data = {
    clientKey: clientKey,
    taskId: task.taskId,
  };
  for (let index = 0; index < 30; index++) {
    const res = await requestsCaptcha.POST(url, headers, data);
    if (res.data) {
      console.log(res.data);
      const errorId = res.data.errorId;
      const status = res.data.status;
      const solution = res.data.solution;
      if (errorId == 2) return "ERROR_NO_SLOT_AVAILABLE";
      if (errorId == -1) return "ERROR";
      if (status == "processing") {
        await sleep(3000);
        continue;
      } else if (status == "ready") {
        return solution.gRecaptchaResponse;
      }
    }
    await sleep(3000);
  }
  return "ERROR";
}

module.exports = { CreateTask, GetTask };

const test = async () => {
  const task = await CreateTask("E8A75615-1CBA-5DFF-8032-D16BCF234E10");
  console.log(task);
  if (task.taskId) {
    const captcha = await GetTask(task);
    console.log(captcha);
  }
};
// test();
