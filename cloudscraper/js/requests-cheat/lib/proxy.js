const HttpsProxyAgent = require("https-proxy-agent");
const HttpProxyAgent = require("http-proxy-agent");

const setProxy = (proxy) => {
  const dataAgent = {};
  dataAgent.httpsAgent = new HttpsProxyAgent(proxy);
  dataAgent.httpAgent = new HttpProxyAgent(proxy);
  return dataAgent;
};

module.exports = setProxy;
