const { createCanvas } = require("canvas");
const { performance } = require("perf_hooks");

var v = function () {
  return performance.now();
};
var t = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
function c(e, x) {
  var a = x.area,
    t = void 0 === a ? { width: 300, height: 300 } : a,
    d = x.rounds,
    n = void 0 === d ? 7 : d,
    r = x.offset,
    _ = void 0 === r ? 199254740991 : r,
    i = x.multiplier,
    o = void 0 === i ? 157 : i,
    u = x.fontSizeFactor,
    f = void 0 === u ? 1.5 : u,
    h = x.maxShadowBlur,
    c = void 0 === h ? 20 : h,
    s = e % _;
  function l(e) {
    return ((s = (o * s) % _) / _) * e;
  }
  function v(e) {
    return 0 | l(e);
  }
  var p = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#FAAE40",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#FF1A66",
      "#CCFF1A",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#CCCC00",
      "#E666FF",
      "#809980",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#9900B3",
      "#4D8066",
      "#4DB3FF",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#991AFF",
      "#66E64D",
      "#4D80CC",
      "#00E680",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
      "#F38020",
      "#809900",
      "#404041",
    ],
    y = [
      function (e, x, a) {
        e.beginPath();
        var t = x.width / 4,
          d = x.height / 4,
          n = x.width / 2 - v(t / (a / 2 + 1)),
          r = x.height / 2 - v(d / (a / 2 + 1)),
          _ = Math.min(t, d) / (a / 2 + 1),
          i = _ + v(_),
          o = l(2 * Math.PI),
          u = (o + l(1.75 * Math.PI) + 0.25 * Math.PI) % (2 * Math.PI);
        return e.arc(0 | n, 0 | r, 0 | i, o, u), e.stroke(), !0;
      },
      function (e, x, a) {
        (e.shadowBlur = 1 + v(c)), (e.shadowColor = p[v(p.length)]);
        var t = (function (e) {
          for (var x = [], a = 0; a < e; a++) {
            var t = 33 + v(93);
            x.push(String.fromCharCode(t));
          }
          return x.join("");
        })(5 - Math.max(a / 3, 3) + v(4));
        e.font = "".concat(x.height / ((a + 1) * f), "px aanotafontaa");
        var d = v(0.75 * x.width),
          n = x.height / 4 + v(0.75 * x.height);
        return l(1) < 0.5 ? e.strokeText(t, d, n) : e.fillText(t, d, n), !1;
      },
      function (e, x, a) {
        (e.shadowBlur = 1 + v(c)),
          (e.shadowColor = p[v(p.length)]),
          e.beginPath();
        var t = x.width / n,
          d = x.height / n,
          r = t * a + v(t),
          _ = v(d);
        e.moveTo(0 | r, 0 | _);
        var i = v(x.width),
          o = v(x.height),
          u = v(x.width),
          f = v(x.height),
          h = x.width - r,
          s = x.height - _;
        return e.bezierCurveTo(i, o, u, f, 0 | h, 0 | s), e.stroke(), !0;
      },
      function (e, x, a) {
        (e.shadowBlur = 1 + v(c)),
          (e.shadowColor = p[v(p.length)]),
          e.beginPath();
        var t = x.width / n,
          d = x.height / n,
          r = t * a + v(t),
          _ = v(d);
        e.moveTo(0 | r, 0 | _);
        var i = x.width / 2 + v(x.width),
          o = v(x.height / 2),
          u = x.width - r,
          f = x.height - _;
        return e.quadraticCurveTo(0 | i, 0 | o, 0 | u, 0 | f), e.stroke(), !0;
      },
      function (e, x, a) {
        e.beginPath();
        var t = x.width / 4,
          d = x.height / 4,
          n = x.width / 2 - v(t / (a / 2 + 1)),
          r = x.height / 2 - v(d / (a / 2 + 1)),
          _ = Math.min(t, d) / (a / 2 + 1),
          i = _ + v(_),
          o = _ + v(_),
          u = l(2 * Math.PI),
          f = l(2 * Math.PI),
          h = (f + l(1.75 * Math.PI) + 0.25 * Math.PI) % (2 * Math.PI);
        return e.ellipse(0 | n, 0 | r, 0 | i, 0 | o, u, f, h), e.stroke(), !0;
      },
    ];
  try {
    var g = createCanvas(t.width, t.height);
    var b = g.getContext("2d"),
      w = Array.from(y, function () {
        return 0;
      });
    w[1] = 1;
    for (var m = Math.floor((2 * n) / y.length), F = n - 1, C = 0; C < F; C++) {
      !(function (e, x) {
        var a = v(x.width),
          t = v(x.height),
          d = v(x.width / 10),
          n = v(x.width),
          r = v(x.height),
          _ = v(x.width) + x.width,
          i = e.createRadialGradient(a, t, d, n, r, _),
          o = v(p.length),
          u = p[o];
        i.addColorStop(0, u);
        var f = p[(o + 1) % p.length];
        i.addColorStop(1, f), (e.fillStyle = i);
      })(b, t);
      for (var A = v(y.length); w[A] >= m; ) A = (A + 1) % y.length;
      (0, y[A])(b, t, C) && b.fill(), (b.shadowBlur = 0), w[A]++;
    }
    return y[1](b, t, F), g.toDataURL();
  } catch (e) {}
}
function o(e) {
  return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))), e;
}
function i(e) {
  for (var x = 0; x < e.length; x += 1)
    e[x] = (function (e) {
      for (var x = "", a = 0; a < 4; a += 1)
        x += t[(e >> (8 * a + 4)) & 15] + t[(e >> (8 * a)) & 15];
      return x;
    })(e[x]);
  return e.join("");
}
function _(e) {
  for (
    var x,
      a,
      t,
      r,
      _,
      i = e.length,
      o = [1732584193, -271733879, -1732584194, 271733878],
      u = 64;
    u <= i;
    u += 64
  )
    d(o, n(e.substring(u - 64, u)));
  for (
    x = (e = e.substring(u - 64)).length,
      a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      u = 0;
    u < x;
    u += 1
  )
    a[u >> 2] |= e.charCodeAt(u) << (u % 4 << 3);
  if (((a[u >> 2] |= 128 << (u % 4 << 3)), 55 < u))
    for (d(o, a), u = 0; u < 16; u += 1) a[u] = 0;
  return (
    (t = (t = 8 * i).toString(16).match(/(.*?)(.{0,8})$/)),
    (r = parseInt(t[2], 16)),
    (_ = parseInt(t[1], 16) || 0),
    (a[14] = r),
    (a[15] = _),
    d(o, a),
    o
  );
}
function d(e, x) {
  var a = e[0],
    t = e[1],
    d = e[2],
    n = e[3];
  t =
    ((((t +=
      ((((d =
        ((((d +=
          ((((n =
            ((((n +=
              ((((a =
                ((((a += (((t & d) | (~t & n)) + x[0] - 680876936) | 0) << 7) |
                  (a >>> 25)) +
                  t) |
                0) &
                t) |
                (~a & d)) +
                x[1] -
                389564586) |
              0) <<
              12) |
              (n >>> 20)) +
              a) |
            0) &
            a) |
            (~n & t)) +
            x[2] +
            606105819) |
          0) <<
          17) |
          (d >>> 15)) +
          n) |
        0) &
        n) |
        (~d & a)) +
        x[3] -
        1044525330) |
      0) <<
      22) |
      (t >>> 10)) +
      d) |
    0;
  (t =
    ((((t +=
      ((((d =
        ((((d +=
          ((((n =
            ((((n +=
              ((((a =
                ((((a += (((t & d) | (~t & n)) + x[4] - 176418897) | 0) << 7) |
                  (a >>> 25)) +
                  t) |
                0) &
                t) |
                (~a & d)) +
                x[5] +
                1200080426) |
              0) <<
              12) |
              (n >>> 20)) +
              a) |
            0) &
            a) |
            (~n & t)) +
            x[6] -
            1473231341) |
          0) <<
          17) |
          (d >>> 15)) +
          n) |
        0) &
        n) |
        (~d & a)) +
        x[7] -
        45705983) |
      0) <<
      22) |
      (t >>> 10)) +
      d) |
    0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & d) | (~t & n)) + x[8] + 1770035416) | 0) <<
                    7) |
                    (a >>> 25)) +
                    t) |
                  0) &
                  t) |
                  (~a & d)) +
                  x[9] -
                  1958414417) |
                0) <<
                12) |
                (n >>> 20)) +
                a) |
              0) &
              a) |
              (~n & t)) +
              x[10] -
              42063) |
            0) <<
            17) |
            (d >>> 15)) +
            n) |
          0) &
          n) |
          (~d & a)) +
          x[11] -
          1990404162) |
        0) <<
        22) |
        (t >>> 10)) +
        d) |
      0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & d) | (~t & n)) + x[12] + 1804603682) | 0) <<
                    7) |
                    (a >>> 25)) +
                    t) |
                  0) &
                  t) |
                  (~a & d)) +
                  x[13] -
                  40341101) |
                0) <<
                12) |
                (n >>> 20)) +
                a) |
              0) &
              a) |
              (~n & t)) +
              x[14] -
              1502002290) |
            0) <<
            17) |
            (d >>> 15)) +
            n) |
          0) &
          n) |
          (~d & a)) +
          x[15] +
          1236535329) |
        0) <<
        22) |
        (t >>> 10)) +
        d) |
      0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & n) | (d & ~n)) + x[1] - 165796510) | 0) <<
                    5) |
                    (a >>> 27)) +
                    t) |
                  0) &
                  d) |
                  (t & ~d)) +
                  x[6] -
                  1069501632) |
                0) <<
                9) |
                (n >>> 23)) +
                a) |
              0) &
              t) |
              (a & ~t)) +
              x[11] +
              643717713) |
            0) <<
            14) |
            (d >>> 18)) +
            n) |
          0) &
          a) |
          (n & ~a)) +
          x[0] -
          373897302) |
        0) <<
        20) |
        (t >>> 12)) +
        d) |
      0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & n) | (d & ~n)) + x[5] - 701558691) | 0) <<
                    5) |
                    (a >>> 27)) +
                    t) |
                  0) &
                  d) |
                  (t & ~d)) +
                  x[10] +
                  38016083) |
                0) <<
                9) |
                (n >>> 23)) +
                a) |
              0) &
              t) |
              (a & ~t)) +
              x[15] -
              660478335) |
            0) <<
            14) |
            (d >>> 18)) +
            n) |
          0) &
          a) |
          (n & ~a)) +
          x[4] -
          405537848) |
        0) <<
        20) |
        (t >>> 12)) +
        d) |
      0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & n) | (d & ~n)) + x[9] + 568446438) | 0) <<
                    5) |
                    (a >>> 27)) +
                    t) |
                  0) &
                  d) |
                  (t & ~d)) +
                  x[14] -
                  1019803690) |
                0) <<
                9) |
                (n >>> 23)) +
                a) |
              0) &
              t) |
              (a & ~t)) +
              x[3] -
              187363961) |
            0) <<
            14) |
            (d >>> 18)) +
            n) |
          0) &
          a) |
          (n & ~a)) +
          x[8] +
          1163531501) |
        0) <<
        20) |
        (t >>> 12)) +
        d) |
      0),
    (t =
      ((((t +=
        ((((d =
          ((((d +=
            ((((n =
              ((((n +=
                ((((a =
                  ((((a += (((t & n) | (d & ~n)) + x[13] - 1444681467) | 0) <<
                    5) |
                    (a >>> 27)) +
                    t) |
                  0) &
                  d) |
                  (t & ~d)) +
                  x[2] -
                  51403784) |
                0) <<
                9) |
                (n >>> 23)) +
                a) |
              0) &
              t) |
              (a & ~t)) +
              x[7] +
              1735328473) |
            0) <<
            14) |
            (d >>> 18)) +
            n) |
          0) &
          a) |
          (n & ~a)) +
          x[12] -
          1926607734) |
        0) <<
        20) |
        (t >>> 12)) +
        d) |
      0),
    (t =
      ((((t +=
        (((d =
          ((((d +=
            (((n =
              ((((n +=
                (((a =
                  ((((a += ((t ^ d ^ n) + x[5] - 378558) | 0) << 4) |
                    (a >>> 28)) +
                    t) |
                  0) ^
                  t ^
                  d) +
                  x[8] -
                  2022574463) |
                0) <<
                11) |
                (n >>> 21)) +
                a) |
              0) ^
              a ^
              t) +
              x[11] +
              1839030562) |
            0) <<
            16) |
            (d >>> 16)) +
            n) |
          0) ^
          n ^
          a) +
          x[14] -
          35309556) |
        0) <<
        23) |
        (t >>> 9)) +
        d) |
      0),
    (t =
      ((((t +=
        (((d =
          ((((d +=
            (((n =
              ((((n +=
                (((a =
                  ((((a += ((t ^ d ^ n) + x[1] - 1530992060) | 0) << 4) |
                    (a >>> 28)) +
                    t) |
                  0) ^
                  t ^
                  d) +
                  x[4] +
                  1272893353) |
                0) <<
                11) |
                (n >>> 21)) +
                a) |
              0) ^
              a ^
              t) +
              x[7] -
              155497632) |
            0) <<
            16) |
            (d >>> 16)) +
            n) |
          0) ^
          n ^
          a) +
          x[10] -
          1094730640) |
        0) <<
        23) |
        (t >>> 9)) +
        d) |
      0),
    (t =
      ((((t +=
        (((d =
          ((((d +=
            (((n =
              ((((n +=
                (((a =
                  ((((a += ((t ^ d ^ n) + x[13] + 681279174) | 0) << 4) |
                    (a >>> 28)) +
                    t) |
                  0) ^
                  t ^
                  d) +
                  x[0] -
                  358537222) |
                0) <<
                11) |
                (n >>> 21)) +
                a) |
              0) ^
              a ^
              t) +
              x[3] -
              722521979) |
            0) <<
            16) |
            (d >>> 16)) +
            n) |
          0) ^
          n ^
          a) +
          x[6] +
          76029189) |
        0) <<
        23) |
        (t >>> 9)) +
        d) |
      0),
    (t =
      ((((t +=
        (((d =
          ((((d +=
            (((n =
              ((((n +=
                (((a =
                  ((((a += ((t ^ d ^ n) + x[9] - 640364487) | 0) << 4) |
                    (a >>> 28)) +
                    t) |
                  0) ^
                  t ^
                  d) +
                  x[12] -
                  421815835) |
                0) <<
                11) |
                (n >>> 21)) +
                a) |
              0) ^
              a ^
              t) +
              x[15] +
              530742520) |
            0) <<
            16) |
            (d >>> 16)) +
            n) |
          0) ^
          n ^
          a) +
          x[2] -
          995338651) |
        0) <<
        23) |
        (t >>> 9)) +
        d) |
      0),
    (t =
      ((((t +=
        (((n =
          ((((n +=
            ((t ^
              ((a =
                ((((a += ((d ^ (t | ~n)) + x[0] - 198630844) | 0) << 6) |
                  (a >>> 26)) +
                  t) |
                0) |
                ~d)) +
              x[7] +
              1126891415) |
            0) <<
            10) |
            (n >>> 22)) +
            a) |
          0) ^
          ((d =
            ((((d += ((a ^ (n | ~t)) + x[14] - 1416354905) | 0) << 15) |
              (d >>> 17)) +
              n) |
            0) |
            ~a)) +
          x[5] -
          57434055) |
        0) <<
        21) |
        (t >>> 11)) +
        d) |
      0),
    (t =
      ((((t +=
        (((n =
          ((((n +=
            ((t ^
              ((a =
                ((((a += ((d ^ (t | ~n)) + x[12] + 1700485571) | 0) << 6) |
                  (a >>> 26)) +
                  t) |
                0) |
                ~d)) +
              x[3] -
              1894986606) |
            0) <<
            10) |
            (n >>> 22)) +
            a) |
          0) ^
          ((d =
            ((((d += ((a ^ (n | ~t)) + x[10] - 1051523) | 0) << 15) |
              (d >>> 17)) +
              n) |
            0) |
            ~a)) +
          x[1] -
          2054922799) |
        0) <<
        21) |
        (t >>> 11)) +
        d) |
      0),
    (t =
      ((((t +=
        (((n =
          ((((n +=
            ((t ^
              ((a =
                ((((a += ((d ^ (t | ~n)) + x[8] + 1873313359) | 0) << 6) |
                  (a >>> 26)) +
                  t) |
                0) |
                ~d)) +
              x[15] -
              30611744) |
            0) <<
            10) |
            (n >>> 22)) +
            a) |
          0) ^
          ((d =
            ((((d += ((a ^ (n | ~t)) + x[6] - 1560198380) | 0) << 15) |
              (d >>> 17)) +
              n) |
            0) |
            ~a)) +
          x[13] +
          1309151649) |
        0) <<
        21) |
        (t >>> 11)) +
        d) |
      0),
    (t =
      ((((t +=
        (((n =
          ((((n +=
            ((t ^
              ((a =
                ((((a += ((d ^ (t | ~n)) + x[4] - 145523070) | 0) << 6) |
                  (a >>> 26)) +
                  t) |
                0) |
                ~d)) +
              x[11] -
              1120210379) |
            0) <<
            10) |
            (n >>> 22)) +
            a) |
          0) ^
          ((d =
            ((((d += ((a ^ (n | ~t)) + x[2] + 718787259) | 0) << 15) |
              (d >>> 17)) +
              n) |
            0) |
            ~a)) +
          x[9] -
          343485551) |
        0) <<
        21) |
        (t >>> 11)) +
        d) |
      0),
    (e[0] = (a + e[0]) | 0),
    (e[1] = (t + e[1]) | 0),
    (e[2] = (d + e[2]) | 0),
    (e[3] = (n + e[3]) | 0);
}
function n(e) {
  for (var x = [], a = 0; a < 64; a += 4)
    x[a >> 2] =
      e.charCodeAt(a) +
      (e.charCodeAt(a + 1) << 8) +
      (e.charCodeAt(a + 2) << 16) +
      (e.charCodeAt(a + 3) << 24);
  return x;
}
function f() {}
f.prototype.append = function (e) {
  return this.appendBinary(o(e)), this;
};
f.prototype.appendBinary = function (e) {
  (this._buff += e), (this._length += e.length);
  for (var x = this._buff.length, a = 64; a <= x; a += 64)
    d(this._hash, n(this._buff.substring(a - 64, a)));
  return (this._buff = this._buff.substring(a - 64)), this;
};

f.prototype.end = function (e) {
  for (
    var x,
      a = this._buff,
      t = a.length,
      d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      n = 0;
    n < t;
    n += 1
  )
    d[n >> 2] |= a.charCodeAt(n) << (n % 4 << 3);
  return (
    this._finish(d, t), (x = i(this._hash)), e && (x = u(x)), this.reset(), x
  );
};
f.prototype.reset = function () {
  return (
    (this._buff = ""),
    (this._length = 0),
    (this._hash = [1732584193, -271733879, -1732584194, 271733878]),
    this
  );
};
f.prototype.getState = function () {
  return {
    buff: this._buff,
    length: this._length,
    hash: this._hash.slice(),
  };
};
f.prototype.setState = function (e) {
  return (
    (this._buff = e.buff),
    (this._length = e.length),
    (this._hash = e.hash),
    this
  );
};
f.prototype.destroy = function () {
  delete this._hash, delete this._buff, delete this._length;
};
f.prototype._finish = function (e, x) {
  var a,
    t,
    n,
    r = x;
  if (((e[r >> 2] |= 128 << (r % 4 << 3)), 55 < r))
    for (d(this._hash, e), r = 0; r < 16; r += 1) e[r] = 0;
  (a = (a = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/)),
    (t = parseInt(a[2], 16)),
    (n = parseInt(a[1], 16) || 0),
    (e[14] = t),
    (e[15] = n),
    d(this._hash, e);
};
f.hash = function (e, x) {
  return f.hashBinary(o(e), x);
};
f.hashBinary = function (e, x) {
  var a = i(_(e));
  return x ? u(a) : a;
};
f.ArrayBuffer = function () {
  this.reset();
}.prototype.append = function (e) {
  var x,
    a,
    t,
    n,
    _ =
      ((a = this._buff.buffer),
      (t = e),
      !0,
      (n = new Uint8Array(a.byteLength + t.byteLength))["set"](
        new Uint8Array(a)
      ),
      n.set(new Uint8Array(t), a.byteLength),
      n),
    i = _.length;
  for (this._length += e.byteLength, x = 64; x <= i; x += 64)
    d(this._hash, r(_.subarray(x - 64, x)));
  return (
    (this._buff =
      x - 64 < i ? new Uint8Array(_.buffer.slice(x - 64)) : new Uint8Array(0)),
    this
  );
};
f.ArrayBuffer.prototype.end = function (e) {
  for (
    var x,
      a = this._buff,
      t = a.length,
      d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      n = 0;
    n < t;
    n += 1
  )
    d[n >> 2] |= a[n] << (n % 4 << 3);
  return (
    this._finish(d, t), (x = i(this._hash)), e && (x = u(x)), this.reset(), x
  );
};
f.ArrayBuffer.prototype.reset = function () {
  return (
    (this._buff = new Uint8Array(0)),
    (this._length = 0),
    (this._hash = [1732584193, -271733879, -1732584194, 271733878]),
    this
  );
};
f.ArrayBuffer.prototype.getState = function () {
  var e,
    x = f.prototype.getState.call(this);
  return (
    (x.buff =
      ((e = x.buff), String.fromCharCode.apply(null, new Uint8Array(e)))),
    x
  );
};
f.ArrayBuffer.prototype.setState = function (e) {
  return (
    (e.buff = (function (e, x) {
      for (
        var a = e.length, t = new ArrayBuffer(a), d = new Uint8Array(t), n = 0;
        n < a;
        n += 1
      )
        d[n] = e.charCodeAt(n);
      return d;
    })(e.buff)),
    f.prototype.setState.call(this, e)
  );
};
f.ArrayBuffer.prototype.destroy = f.prototype.destroy;
f.ArrayBuffer.prototype._finish = f.prototype._finish;
f.ArrayBuffer.hash = function (e, x) {
  var a = i(
    (function (e) {
      for (
        var x,
          a,
          t,
          n,
          _,
          i = e.length,
          o = [1732584193, -271733879, -1732584194, 271733878],
          u = 64;
        u <= i;
        u += 64
      )
        d(o, r(e.subarray(u - 64, u)));
      for (
        x = (e = u - 64 < i ? e.subarray(u - 64) : new Uint8Array(0))["length"],
          a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          u = 0;
        u < x;
        u += 1
      )
        a[u >> 2] |= e[u] << (u % 4 << 3);
      if (((a[u >> 2] |= 128 << (u % 4 << 3)), 55 < u))
        for (d(o, a), u = 0; u < 16; u += 1) a[u] = 0;
      return (
        (t = (t = 8 * i).toString(16).match(/(.*?)(.{0,8})$/)),
        (n = parseInt(t[2], 16)),
        (_ = parseInt(t[1], 16) || 0),
        (a[14] = n),
        (a[15] = _),
        d(o, a),
        o
      );
    })(new Uint8Array(e))
  );
  return x ? u(a) : a;
};

function p(e) {
  for (var x = v(), a = [], t = "", d = 0; d < e.s.length; d++) {
    var n = e.s[d],
      r = "";
    try {
      void 0 !== (t = c(n, {})) && (r = t);
    } catch (e) {}
    a.push(r);
  }
  return { cv: t, results: a, executionTime: v() - x };
}

function y(e) {
  return f.hash(e);
}
function g(e) {
  for (var x = [], a = v(), t = 0; t < e.length; t++)
    "" !== e[t] && x.push(y(e[t]));
  return { hashes: x, executionTime: v() - a };
}
function l() {
  return {
    r: [2560, 1440],
    ar: [1400, 2560],
    pr: 1,
    cd: 24,
    wb: false,
    wp: false,
    wn: false,
    ch: false,
    ws: false,
    wd: false,
  };
}

function getDataResult(data) {
  const xx = p(data);
  const a = xx.results;
  const t = xx.executionTime;
  const r = g(a);
  const x = r.hashes;
  const d = t + r.executionTime;
  const n = {
    m: data.m,
    results: [
      "52972d17a2e51ab040fd22b6d5bd93c0",
      "998ecd70f96ef3f81a82963b2ce14a86",
    ],
    timing: Math.round(d),
    fp: { id: 3, e: l() },
  };
  return n;
}

module.exports = getDataResult;
