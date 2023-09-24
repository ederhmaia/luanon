const tldts = require("tldts");

function isArray(val) {
  return Array.isArray(val);
}

function sleep(s) {
  new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

function sleepms(s) {
  new Promise((resolve) => {
    setTimeout(resolve, s);
  });
}

const getDomain = (host) => {
  const domain = tldts.parse(host).domain;
  return domain;
};

module.exports = {
  sleep,
  sleepms,
  isArray,
  getDomain,
};
