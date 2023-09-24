// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const TIME_OUT = 10000; //time out = 10s
const HEADERS_DEFAULT = {
  accept: "*/*",
  "accept-encoding": "gzip, deflate",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
};

module.exports = {
  TIME_OUT,
  HEADERS_DEFAULT,
};
