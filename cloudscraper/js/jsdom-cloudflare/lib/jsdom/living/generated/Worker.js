class Worker {
  constructor(url, options) {
    this.messageQueue = [];
    this.terminated = false;
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {}
  onmessage = null;
  postMessage(data) {
    setTimeout(() => {
      if (this.terminated) return;
      if (this.messageQueue != null) this.messageQueue.push(data);
      console.log("zo mess");
      const a = this.runFunction(data);
      if (a && this.onmessage) this.onmessage({ data: a });
    }, 1);
  }
  runFunction(data) {
    if (!data.difficulty || !data.htA || !data.prefix || !data.iv) return null;
    var w, v, u, t, s, r, q, p, o, n, m, l, k, j;
    for (
      j = data.difficulty,
        k = data.htA,
        l = data.prefix,
        m = data.iv,
        n = 0,
        o = Math.floor(Math.random() * 1e4);
      !![];
      ++o
    ) {
      for (
        p = l + "" + o, q = this.SHA256(p + m), n++, r = !![], s = 0;
        s < j;
        s++
      ) {
        if (q.charAt(q.length - s - 1) !== k.charAt(q.length - s - 1)) {
          r = ![];
          return (
            (t = {}),
            (t.pow = p),
            (t.prefix = l),
            (t.difficulty = j),
            (t.iterations = n),
            (t.hashed = q),
            (u = {}),
            (u.result = t),
            u
          );
        }
      }
      n % 5e3 == 0 &&
        ((v = {}), (v.iterations = 5e3), (w = {}), (w.progress = v), w);
    }
  }
  terminate() {
    this.terminated = true;
    this.messageQueue = null;
  }
  SHA256(f) {
    return (
      (f = (function (j, m, l, k) {
        for (
          j = j.replace(/\\r\\n/g, "\\n"), k = "", l = 0;
          l < j.length;
          m = j.charCodeAt(l),
            128 > m
              ? (k += String.fromCharCode(m))
              : (127 < m && 2048 > m
                  ? (k += String.fromCharCode((m >> 6) | 192))
                  : ((k += String.fromCharCode((m >> 12) | 224)),
                    (k += String.fromCharCode(((m >> 6) & 63) | 128))),
                (k += String.fromCharCode((m & 63) | 128))),
            l++
        );
        return k;
      })(f)),
      (function (j, l, k) {
        for (
          k = "", l = 0;
          l < 4 * j.length;
          k +=
            "0123456789abcdef".charAt(
              (j[l >> 2] >> (8 * (3 - (l % 4)) + 4)) & 15
            ) +
            "0123456789abcdef".charAt((j[l >> 2] >> (8 * (3 - (l % 4)))) & 15),
            l++
        );
        return k;
      })(
        (function (j, o, N, M, L, K, J, I, H, G, F, E, D, C, B, A, z, s) {
          for (
            s = [
              1116352408, 1899447441, 3049323471, 3921009573, 961987163,
              1508970993, 2453635748, 2870763221, 3624381080, 310598401,
              607225278, 1426881987, 1925078388, 2162078206, 2614888103,
              3248222580, 3835390401, 4022224774, 264347078, 604807628,
              770255983, 1249150122, 1555081692, 1996064986, 2554220882,
              2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
              113926993, 338241895, 666307205, 773529912, 1294757372,
              1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
              2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
              3600352804, 4094571909, 275423344, 430227734, 506948616,
              659060556, 883997877, 958139571, 1322822218, 1537002063,
              1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
              2428436474, 2756734187, 3204031479, 3329325298,
            ],
              z = [
                1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
                2600822924, 528734635, 1541459225,
              ],
              A = Array(64),
              j[o >> 5] |= 128 << (24 - (o % 32)),
              j[(((o + 64) >> 9) << 4) + 15] = o,
              B = 0;
            B < j.length;
            B += 16
          ) {
            for (
              D = z[0],
                E = z[1],
                F = z[2],
                G = z[3],
                H = z[4],
                I = z[5],
                J = z[6],
                K = z[7],
                C = 0;
              64 > C;
              D =
                ((L = C),
                16 > C
                  ? (M = j[C + B])
                  : (M =
                      ((M = A[C - 2]),
                      (M = i(M, 17) ^ i(M, 19) ^ (M >>> 10)),
                      (M = g(M, A[C - 7])),
                      (N = A[C - 15]),
                      (N = i(N, 7) ^ i(N, 18) ^ (N >>> 3)),
                      g(g(M, N), A[C - 16]))),
                (A[L] = M),
                (L = H),
                (L = i(L, 6) ^ i(L, 11) ^ i(L, 25)),
                (L = g(g(g(g(K, L), (H & I) ^ (~H & J)), s[C]), A[C])),
                (K = D),
                (K = i(K, 2) ^ i(K, 13) ^ i(K, 22)),
                (M = g(K, (D & E) ^ (D & F) ^ (E & F))),
                (K = J),
                (J = I),
                (I = H),
                (H = g(G, L)),
                (G = F),
                (F = E),
                (E = D),
                g(L, M)),
                C++
            );
            (z[0] = g(D, z[0])),
              (z[1] = g(E, z[1])),
              (z[2] = g(F, z[2])),
              (z[3] = g(G, z[3])),
              (z[4] = g(H, z[4])),
              (z[5] = g(I, z[5])),
              (z[6] = g(J, z[6])),
              (z[7] = g(K, z[7]));
          }
          return z;
        })(
          (function (j, l, k) {
            for (
              k = [], l = 0;
              l < 8 * j.length;
              k[l >> 5] |= (j.charCodeAt(l / 8) & 255) << (24 - (l % 32)),
                l += 8
            );
            return k;
          })(f),
          8 * f.length
        )
      )
    );
    function g(j, k, l) {
      return (
        (l = (j & 65535) + (k & 65535)),
        (((j >> 16) + (k >> 16) + (l >> 16)) << 16) | (l & 65535)
      );
    }
    function i(j, k) {
      return (j >>> k) | (j << (32 - k));
    }
  }
}

module.exports = Worker;
