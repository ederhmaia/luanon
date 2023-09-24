const cookieImport = require("cookie");
const Storage = require("../storage");
const { getDomain } = require("../utils");

class Cookie {
  constructor() {
    this.storage = new Storage();
  }
  setCookieResponse(response) {
    const newCookies = response.headers["set-cookie"];
    const host =
      response.request.socket._host || response.request.socket.servername;
    const domain = getDomain(host);
    if (!newCookies) return;
    for (let i = 0; i < newCookies.length; i++) {
      const cookieParde = cookieImport.parse(newCookies[i]);
      const key = Object.keys(cookieParde)[0];
      this.storage.set(domain, key, cookieParde);
    }
  }
  setCookie(name, value, domain) {
    this.storage.set(domain, name, value);
  }
  getCookieDomain(domain) {
    const cookie = this.storage.getAllCookieOnDomain(domain);
    return cookie;
  }
  getCookie(name, domain) {
    const cookie = this.storage.get(domain, name);
    return cookie;
  }
}

module.exports = Cookie;
