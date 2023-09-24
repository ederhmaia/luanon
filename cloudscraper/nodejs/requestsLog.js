class RequestsLog {
  constructor() {
    this._list = [];
  }

  put(resp) {
    function headersLength() {
      const headers = resp.res.rawHeaders;
      let length = 0;
      for (let i = 0; i < headers.length; i += 2) {
        length += headers[i].length + 2 + headers[i + 1].length + 2;
      }
      return length;
    }

    let bodyLength = parseInt(resp.headers["content-length"]);
    if (!bodyLength) bodyLength = resp.data.length; // Must be the encoded length

    let totalLength = 0;
    totalLength +=
      resp.res.httpVersion.length + resp.res.statusMessage.length + 7; // HTTP/1.1 200 OK\n\r
    totalLength += headersLength();
    totalLength += 2; // \n\r
    totalLength += bodyLength;

    this._list.push({
      url: resp.url,
      contentLength: bodyLength,
      httpVersion: resp.res.httpVersion,
      totalLength: totalLength,
    });
  }

  find(urlMatch, first = true) {
    const list = [];

    for (let i = 0; i < this._list.length; i++) {
      if (this._list[i].url.indexOf(urlMatch) !== -1)
        if (first) return this._list[i];
        else list.push(this._list[i]);
    }

    if (first) return undefined;
    else return list;
  }

  clear() {
    this._list = [];
  }
}

module.exports = RequestsLog;
