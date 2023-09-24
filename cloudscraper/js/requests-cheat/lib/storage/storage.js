class Storage {
  constructor() {
    this.STORAGE = {};
  }
  set(domain, key, value) {
    if (domain.startsWith(".")) {
      domain = domain.slice(1);
    }
    if (this.STORAGE[domain]) {
      this.STORAGE[domain][key] = value;
    } else {
      this.STORAGE[domain] = {};
      this.STORAGE[domain][key] = value;
    }
    return true;
  }
  get(domain, key) {
    if (domain.startsWith(".")) {
      domain = domain.slice(1);
    }
    if (this.STORAGE[domain] && this.STORAGE[domain][key]) {
      return this.STORAGE[domain][key];
    } else {
      return null;
    }
  }
  getAllCookieOnDomain(domain, typeDomain = "all") {
    if (this.STORAGE[domain]) {
      var cookieReturn = "";
      for (const [key, value] of Object.entries(this.STORAGE[domain])) {
        var domainCookie = "";
        if (typeDomain == "all") {
          domainCookie = "." + domain;
        } else {
          domainCookie = domain;
        }
        if (value.domain == domainCookie) {
          const timeNow = Date.now();
          const timeExpries = new Date(value.expires).getTime();
          if (timeNow <= timeExpries)
            cookieReturn += key + "=" + value[key] + "; ";
        }
      }
      return cookieReturn;
    }
  }
}
module.exports = Storage;
