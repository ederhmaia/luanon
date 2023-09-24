const { CreateTask, GetTask } = require("./anycaptcha");

class CaptchaHarvester {
  /**
   * Creates a new instance of the harvester
   * @param url {URL} The website Url
   * @param sitekey {string} The website sitekey
   * @param userAgent {string} The user agent
   * @param port {int} The response server port
   */
  constructor(url, sitekey, userAgent, port = 7777) {
    this._url = url;
    this._sitekey = sitekey;
    this._port = port;
    this._userAgent = userAgent;
    this._result = false;
  }

  /**
   * Solves the captcha by opening a Chrome instance.
   * @returns {Promise<string>} The promise resolving to the hCaptcha result
   */
  async solveCaptcha() {
    const task = await CreateTask(this._sitekey);
    if (task.taskId) {
      const captcha = await GetTask(task);
      return captcha;
    }
    return "error";
  }
}

module.exports = CaptchaHarvester;
