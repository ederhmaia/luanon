function UI(window) {
  var ax, UI, av, au, at, as, ar, aq, ap, M, L, K, J, A, z, y, v, q, p, o, c, b;
  (J = {}),
    (J.check_delays =
      "This check is taking longer than expected. Check your Internet connection and refresh the page if the issue persists."),
    (J.cookies_missing = "Please enable Cookies and reload the page."),
    (J.explainer_text =
      "Requests from malicious bots can pose as legitimate traffic. Occasionally, you may see this page while the site ensures that the connection is secure."),
    (J.explainer_title = "Why am I seeing this page?"),
    (J.facts_1 =
      "bots historically made up nearly 40% of all internet traffic?"),
    (J.facts_2 = "botnets can be used to shutdown popular websites?"),
    (J.facts_3 =
      "the first botnet in 2003 took over 500-1000 devices? Today, botnets take over millions of devices at once."),
    (J.facts_4 =
      "some signs of bot malware on your computer are computer crashes, slow internet, and a slow computer?"),
    (J.facts_5 = "43% of cyber attacks target small businesses?"),
    (J.facts_6 =
      "companies are using machine learning to help identify and protect against bot traffic?"),
    (J.facts_7 =
      "there are Verified Bots that are allowed around the internet because they help provide services we use day to day?"),
    (J.facts_8 =
      "keeping your browser up to date will help protect you from malware and other digital attacks?"),
    (J.facts_title = "Did you know"),
    (J.human_button_text = "Verify you are human"),
    (J.invalid_domain =
      "Invalid domain. Contact the Site Administrator if this problem persists."),
    (J.invalid_embedded =
      "This web property is not accessible via this address."),
    (J.invalid_sitekey =
      "Invalid sitekey. Contact the Site Administrator if this problem persists."),
    (J.not_embedded = "This challenge must be embedded into a parent page."),
    (J.outdated_browser =
      '<b>Your browser is out of date!</b><br/>Update your browser to view this website correctly. <a href="https://support.cloudflare.com/hc/en-us/articles/200170136#browser-support">More Information.</a>'),
    (J.proxied_challenge =
      "This challenge page was accidentally cached by an intermediary and is no longer available."),
    (J.success_text = "Proceeding..."),
    (J.success_title = "Connection is secure"),
    (K = {}),
    (K.check_delays =
      "%E6%AD%A4%E6%A3%80%E6%9F%A5%E8%8A%B1%E8%B4%B9%E7%9A%84%E6%97%B6%E9%97%B4%E6%AF%94%E9%A2%84%E6%9C%9F%E7%9A%84%E8%A6%81%E9%95%BF%E3%80%82%20%E5%A6%82%E6%9E%9C%E9%97%AE%E9%A2%98%E4%BB%8D%E7%84%B6%E5%AD%98%E5%9C%A8%EF%BC%8C%E8%AF%B7%E6%A3%80%E6%9F%A5%E6%82%A8%E7%9A%84%20Internet%20%E8%BF%9E%E6%8E%A5%E5%B9%B6%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%E3%80%82"),
    (K.cookies_missing =
      "%E8%AF%B7%E5%90%AF%E7%94%A8%20Cookie%20%E5%B9%B6%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD%E9%A1%B5%E9%9D%A2%E3%80%82"),
    (K.explainer_text =
      "%E6%9D%A5%E8%87%AA%E6%81%B6%E6%84%8F%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E7%9A%84%E8%AF%B7%E6%B1%82%E5%8F%AF%E8%83%BD%E4%BC%9A%E4%BC%AA%E8%A3%85%E6%88%90%E5%90%88%E6%B3%95%E6%B5%81%E9%87%8F%E3%80%82%E6%9C%89%E6%97%B6%EF%BC%8C%E5%9C%A8%E7%AB%99%E7%82%B9%E8%A6%81%E7%A1%AE%E4%BF%9D%E8%BF%9E%E6%8E%A5%E7%9A%84%E5%AE%89%E5%85%A8%E6%80%A7%E6%97%B6%EF%BC%8C%E6%82%A8%E5%8F%AF%E8%83%BD%E4%BC%9A%E7%9C%8B%E5%88%B0%E6%AD%A4%E9%A1%B5%E9%9D%A2%E3%80%82"),
    (K.explainer_title =
      "%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%BC%9A%E7%9C%8B%E5%88%B0%E6%AD%A4%E9%A1%B5%E9%9D%A2%EF%BC%9F"),
    (K.facts_1 =
      "%E4%BB%8E%E5%8E%86%E5%8F%B2%E6%95%B0%E6%8D%AE%E6%9D%A5%E7%9C%8B%EF%BC%8C%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E5%8D%A0%E4%BA%86%E6%89%80%E6%9C%89%20Internet%20%E6%B5%81%E9%87%8F%E7%9A%84%E8%BF%91%2040%25%EF%BC%9F"),
    (K.facts_2 =
      "%E5%83%B5%E5%B0%B8%E7%BD%91%E7%BB%9C%E5%8F%AF%E4%BB%A5%E8%AE%A9%E7%83%AD%E9%97%A8%E7%BD%91%E7%AB%99%E5%81%9C%E5%B7%A5%EF%BC%9F"),
    (K.facts_3 =
      "2003%20%E5%B9%B4%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%83%B5%E5%B0%B8%E7%BD%91%E7%BB%9C%E6%8E%A5%E7%AE%A1%E4%BA%86%20500-1000%20%E5%8F%B0%E8%AE%BE%E5%A4%87%EF%BC%9F%E8%80%8C%E4%BB%8A%E5%A4%A9%EF%BC%8C%E5%83%B5%E5%B0%B8%E7%BD%91%E7%BB%9C%E4%B8%80%E6%AC%A1%E5%8F%AF%E4%BB%A5%E6%8E%A5%E7%AE%A1%E6%95%B0%E4%BB%A5%E7%99%BE%E4%B8%87%E8%AE%A1%E7%9A%84%E8%AE%BE%E5%A4%87%E3%80%82"),
    (K.facts_4 =
      "%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%B4%A9%E6%BA%83%E3%80%81Internet%20%E9%80%9F%E5%BA%A6%E5%8F%98%E6%85%A2%E3%80%81%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%80%9F%E5%BA%A6%E5%8F%98%E6%85%A2%EF%BC%8C%E8%BF%99%E4%BA%9B%E9%83%BD%E6%98%AF%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%B8%8A%E5%AD%98%E5%9C%A8%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E6%81%B6%E6%84%8F%E8%BD%AF%E4%BB%B6%E7%9A%84%E8%BF%B9%E8%B1%A1%EF%BC%9F"),
    (K.facts_5 =
      "43%25%20%E7%9A%84%E7%BD%91%E7%BB%9C%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%A5%E5%B0%8F%E5%9E%8B%E4%BC%81%E4%B8%9A%E4%B8%BA%E7%9B%AE%E6%A0%87%EF%BC%9F"),
    (K.facts_6 =
      "%E5%90%84%E5%85%AC%E5%8F%B8%E9%83%BD%E5%9C%A8%E4%BD%BF%E7%94%A8%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E6%9D%A5%E5%B8%AE%E5%8A%A9%E8%AF%86%E5%88%AB%E5%92%8C%E9%98%B2%E5%BE%A1%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E6%B5%81%E9%87%8F%EF%BC%9F"),
    (K.facts_7 =
      "Internet%20%E4%B8%8A%E5%85%81%E8%AE%B8%E4%BD%BF%E7%94%A8%E7%BB%8F%E8%BF%87%E9%AA%8C%E8%AF%81%E7%9A%84%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%EF%BC%8C%E5%9B%A0%E4%B8%BA%E5%AE%83%E4%BB%AC%E5%8F%AF%E4%BB%A5%E5%B8%AE%E5%8A%A9%E6%8F%90%E4%BE%9B%E6%88%91%E4%BB%AC%E6%97%A5%E5%B8%B8%E4%BD%BF%E7%94%A8%E7%9A%84%E6%9C%8D%E5%8A%A1%EF%BC%9F"),
    (K.facts_8 =
      "%E8%AE%A9%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BF%9D%E6%8C%81%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC%E5%8F%AF%E4%BB%A5%E5%B8%AE%E5%8A%A9%E6%82%A8%E9%98%B2%E8%8C%83%E6%81%B6%E6%84%8F%E8%BD%AF%E4%BB%B6%E5%92%8C%E5%85%B6%E4%BB%96%E6%95%B0%E5%AD%97%E6%94%BB%E5%87%BB%EF%BC%9F"),
    (K.facts_title = "%E6%82%A8%E7%9F%A5%E9%81%93%E5%90%97%EF%BC%8C"),
    (K.human_button_text =
      "%E7%A1%AE%E8%AE%A4%E6%82%A8%E6%98%AF%E7%9C%9F%E4%BA%BA"),
    (K.invalid_domain =
      "%E6%97%A0%E6%95%88%E5%9F%9F%E3%80%82%E5%A6%82%E6%9E%9C%E6%AD%A4%E9%97%AE%E9%A2%98%E4%BB%8D%E7%84%B6%E5%AD%98%E5%9C%A8%EF%BC%8C%E8%AF%B7%E4%B8%8E%E7%AB%99%E7%82%B9%E7%AE%A1%E7%90%86%E5%91%98%E8%81%94%E7%B3%BB%E3%80%82"),
    (K.invalid_embedded =
      "%E6%97%A0%E6%B3%95%E9%80%9A%E8%BF%87%E6%AD%A4%E5%9C%B0%E5%9D%80%E8%AE%BF%E9%97%AE%E6%AD%A4%20Web%20%E8%B5%84%E4%BA%A7%E3%80%82"),
    (K.invalid_sitekey =
      "%E7%AB%99%E7%82%B9%E5%AF%86%E9%92%A5%E6%97%A0%E6%95%88%E3%80%82%E5%A6%82%E6%9E%9C%E6%AD%A4%E9%97%AE%E9%A2%98%E4%BB%8D%E7%84%B6%E5%AD%98%E5%9C%A8%EF%BC%8C%E8%AF%B7%E4%B8%8E%E7%AB%99%E7%82%B9%E7%AE%A1%E7%90%86%E5%91%98%E8%81%94%E7%B3%BB%E3%80%82"),
    (K.not_embedded =
      "%E6%AD%A4%E8%B4%A8%E8%AF%A2%E5%BF%85%E9%A1%BB%E5%B5%8C%E5%85%A5%E7%88%B6%E9%A1%B5%E9%9D%A2%E3%80%82"),
    (K.outdated_browser =
      '<b>%E6%82%A8%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%B2%E8%BF%87%E6%9C%9F%EF%BC%81</b><br/>%E8%AF%B7%E6%9B%B4%E6%96%B0%E6%82%A8%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BB%A5%E6%AD%A3%E7%A1%AE%E6%9F%A5%E7%9C%8B%E6%AD%A4%E7%BD%91%E7%AB%99%E3%80%82<a href="https://support.cloudflare.com/hc/en-us/articles/200170136#browser-support">%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF%E3%80%82</a>'),
    (K.proxied_challenge =
      "%E6%AD%A4%E8%B4%A8%E8%AF%A2%E9%A1%B5%E9%9D%A2%E8%A2%AB%E6%9F%90%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%84%8F%E5%A4%96%E7%BC%93%E5%AD%98%EF%BC%8C%E4%B8%8D%E5%86%8D%E5%8F%AF%E7%94%A8%E3%80%82"),
    (K.success_text = "%E7%BB%A7%E7%BB%AD%E2%80%A6"),
    (K.success_title = "%E8%BF%9E%E6%8E%A5%E5%AE%89%E5%85%A8"),
    (L = {}),
    (L.cf = J),
    (L.jc = K),
    (M = L),
    (ap = {}),
    (ap.hide = a1),
    (ap.show = a2),
    (aq = {}),
    (aq.hide = a4),
    (aq.show = a3),
    (ar = {}),
    (ar.hide = a6),
    (ar.show = a5),
    (as = {}),
    (as.enter = ab),
    (as.end = ac),
    (at = {}),
    (at.get = V),
    (at.clear = W),
    (at.show = X),
    (at.hide = Y),
    (au = {}),
    (au.show = aj),
    (au.hide = ak),
    (av = {}),
    (av.show = al),
    (av.hide = am),
    (UI = {}),
    (UI.spinner = ap),
    (UI.explainer = aq),
    (UI.facts = ar),
    (UI.interactive = as),
    (UI.isDarkMode = Z),
    (UI.addFatalAPIError = R),
    (UI.showAuxiliaryContent = Q),
    (UI.getUiBrandedSnippet = N),
    (UI.disableUiWithMessage = O),
    (UI.transientError = T),
    (UI.showOverlay = a8),
    (UI.getBrandPrefix = a9),
    (UI.getTemplateVersion = aa),
    (UI.redirect = a0),
    (UI.bootstrap = U),
    (UI.stage = at),
    (UI.api_fail = au),
    (UI.api_success = av),
    (UI.api_show_dbg_info = an);
  function r(aD, aC, aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.nUvte = "7|0|4|16|5|8|2|10|12|14|11|1|6|9|13|3|15"),
      (ay.FZLnj = function (aE, aF, aG) {
        return aE(aF, aG);
      }),
      (ay.kHBzb = "5|16|3|8|13|6|12|10|11|9|1|4|2|7|14|15|0"),
      (ay.iFoxl = function (aE, aF, aG) {
        return aE(aF, aG);
      }),
      (ay.uxExO = function (aE, aF) {
        return aE ^ aF;
      }),
      (ay.VSUcl = function (aE, aF, aG) {
        return aE(aF, aG);
      }),
      (ay.NmqCN = function (aE, aF) {
        return aE & aF;
      }),
      (ay.WNIJy = function (aE, aF) {
        return aE >>> aF;
      }),
      (ay.esFKw = function (aE, aF) {
        return aE - aF;
      }),
      (ay.RZjQU = function (aE, aF) {
        return aE - aF;
      }),
      (ay.BmiGJ = function (aE, aF) {
        return aE ^ aF;
      }),
      (ay.sVIur = function (aE, aF, aG) {
        return aE(aF, aG);
      }),
      (ay.ccpTi = function (aE, aF) {
        return aE >>> aF;
      }),
      (ay.tSXmD = function (aE, aF, aG) {
        return aE(aF, aG);
      }),
      (ay.nuYQe = function (aE, aF) {
        return aE - aF;
      }),
      (ay.wnvwz = function (aE, aF) {
        return aE === aF;
      }),
      (ay.mKmVA = "VdNHb"),
      (ay.NSvdT = "cached-challenge-warning"),
      (ay.lXCbM = "cf_chl_prog"),
      (az = ay),
      (aA = window._cf_chl_opt),
      C("cf_chl_prog", "cc", 1),
      (aB = 43200),
      aA.cRq && aA.cRq.t) &&
      ((aC = Math.floor(+atob(aA.cRq.t))),
      (aD = Math.floor(Date.now() / 1e3)),
      aD - aC > aB)
    ) {
      if ("OwUpK" === "VdNHb")
        function aE(
          aT,
          aS,
          aR,
          aQ,
          aP,
          aO,
          aN,
          aM,
          aL,
          aK,
          aJ,
          aI,
          aH,
          aG,
          aF
        ) {
          for (
            aF = "7|0|4|16|5|8|2|10|12|14|11|1|6|9|13|3|15".split("|"), aG = 0;
            !![];

          ) {
            switch (aF[aG++]) {
              case "0":
                aH = E[1];
                continue;
              case "1":
                R[2] = aH(aJ, S[2]);
                continue;
              case "2":
                aI = J[6];
                continue;
              case "3":
                Z[6] = aH(aI, a0[6]);
                continue;
              case "4":
                aJ = F[2];
                continue;
              case "5":
                aK = H[4];
                continue;
              case "6":
                T[3] = az.FZLnj(aH, aT, U[3]);
                continue;
              case "7":
                aL = D[0];
                continue;
              case "8":
                aM = I[5];
                continue;
              case "9":
                V[4] = az.FZLnj(aH, aK, W[4]);
                continue;
              case "10":
                aN = K[7];
                continue;
              case "11":
                P[1] = aH(aH, Q[1]);
                continue;
              case "12":
                for (aJ = 0; 64 > aJ; aJ++)
                  for (
                    aO = "5|16|3|8|13|6|12|10|11|9|1|4|2|7|14|15|0".split("|"),
                      aP = 0;
                    !![];

                  ) {
                    switch (aO[aP++]) {
                      case "0":
                        aL = az.iFoxl(aH, aQ, aR);
                        continue;
                      case "1":
                        aI = aM;
                        continue;
                      case "2":
                        aK = aH(aT, aQ);
                        continue;
                      case "3":
                        aR[aQ] = aR;
                        continue;
                      case "4":
                        aM = aK;
                        continue;
                      case "5":
                        aQ = aJ;
                        continue;
                      case "6":
                        aQ = az.iFoxl(
                          aH,
                          aH(
                            aH(az.iFoxl(aH, aN, aQ), (aK & aM) ^ (~aK & aI)),
                            aL[aJ]
                          ),
                          aR[aJ]
                        );
                        continue;
                      case "7":
                        aT = aJ;
                        continue;
                      case "8":
                        aQ = aK;
                        continue;
                      case "9":
                        aN = aI;
                        continue;
                      case "10":
                        aN =
                          az.iFoxl(aK, aN, 2) ^
                          az.VSUcl(aK, aN, 13) ^
                          aK(aN, 22);
                        continue;
                      case "11":
                        aR = aH(aN, (aL & aH) ^ (aL & aJ) ^ (aH & aJ));
                        continue;
                      case "12":
                        aN = aL;
                        continue;
                      case "13":
                        aQ = az.VSUcl(aK, aQ, 6) ^ aK(aQ, 11) ^ aK(aQ, 25);
                        continue;
                      case "14":
                        aJ = aH;
                        continue;
                      case "15":
                        aH = aL;
                        continue;
                      case "16":
                        16 > aJ
                          ? (aR = a3[aJ + a4])
                          : (aR =
                              ((aR = aR[aJ - 2]),
                              (aR = aK(aR, 17) ^ aK(aR, 19) ^ (aR >>> 10)),
                              (aR = aH(aR, aR[aJ - 7])),
                              (aS = aR[aJ - 15]),
                              (aS =
                                aK(aS, 7) ^ az.sVIur(aK, aS, 18) ^ (aS >>> 3)),
                              aH(az.tSXmD(aH, aR, aS), aR[aJ - 16])));
                        continue;
                    }
                    break;
                  }
                continue;
              case "13":
                X[5] = az.tSXmD(aH, aM, Y[5]);
                continue;
              case "14":
                N[0] = aH(aL, O[0]);
                continue;
              case "15":
                a1[7] = aH(aN, a2[7]);
                continue;
              case "16":
                aT = G[3];
                continue;
            }
            break;
          }
        }
      else
        return (
          !Q("cached-challenge-warning") && O("proxied_challenge"),
          C("cf_chl_prog", "cc", "F"),
          ![]
        );
    }
    return !![];
  }
  function s(ay, az) {
    return (az = window.document.createElement("a")), (az.href = ay), az;
  }
  function t(aC, aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.IWSHS = "jMDey"),
      (ay.buvok = function (aD, aE) {
        return aD(aE);
      }),
      (ay.VRiBe = function (aD, aE) {
        return aD(aE);
      }),
      (ay.txBeO = function (aD, aE) {
        return aD + aE;
      }),
      (ay.ARmTt = "location-mismatch-warning"),
      (az = ay),
      (aA = window._cf_chl_opt),
      C("cf_chl_prog", "hc", 1),
      aA.cRq && aA.cRq.ru)
    ) {
      if ("jMDey" === "jMDey") {
        if (
          ((aB = az.buvok(s, az.VRiBe(atob, aA.cRq.ru))),
          (aC = aB.protocol + "//" + aB.hostname),
          window.document.location.href.indexOf(aC) !== 0)
        )
          return (
            !Q("location-mismatch-warning") && O("invalid_embedded"),
            C("cf_chl_prog", "hc", "F"),
            ![]
          );
      } else
        function aD() {
          (awindow.document.style.display = aq),
            (ar.style.visibility = "visible");
        }
    }
    return !![];
  }
  function u(aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.gkgFJ = function (aC, aD) {
        return aC in aD;
      }),
      (ay.msgWd = "Khtml Ms O Moz Webkit"),
      (ay.xUyfc = function (aC, aD) {
        return aC(aD);
      }),
      (ay.BdAGl = "outdated_browser"),
      (az = ay),
      (aA = (function (aE, aD, aC) {
        return (
          (aC = window.document.createElement("div")),
          (aD = "Khtml Ms O Moz Webkit".split(" ")),
          (aE = aD.length),
          function (aF) {
            if (aF in aC.style) return !![];
            for (
              aF = aF.replace(/^[a-z]/, function (aG) {
                return aG.toUpperCase();
              });
              aE--;

            )
              if (aD[aE] + aF in aC.style) return !![];
            return ![];
          }
        );
      })()),
      (aB =
        !/(MSIE|IEMobile|Trident)/i.test(window.navigator.userAgent) &&
        az.xUyfc(aA, "borderImage") &&
        aA("transform")),
      !aB)
    )
      return O("outdated_browser"), ![];
  }
  function w(ay, aI, aH, aG, aF, aE, aD, aC, aB, aA, az) {
    if (
      ((az = {}),
      (az.YyNZB = function (aK, aL, aM, aN) {
        return aK(aL, aM, aN);
      }),
      (az.BWfCx = function (aK, aL) {
        return aK * aL;
      }),
      (az.sRDeR = function (aK, aL) {
        return aK > aL;
      }),
      (az.iBFOa = function (aK, aL) {
        return aK - aL;
      }),
      (az.CxCzW = "cached-challenge-warning"),
      (az.pEaBE = function (aK, aL) {
        return aK === aL;
      }),
      (az.ILwYW = function (aK, aL) {
        return aK(aL);
      }),
      (az.PfWKC = function (aK, aL) {
        return aK(aL);
      }),
      (az.YLsCA = function (aK) {
        return aK();
      }),
      (az.QzQTM = "I am human!"),
      (az.MmsnD = "jc-spinner-allow-5-secs"),
      (az.xmXBi = "input"),
      (az.fTZbU = function (aK, aL) {
        return aK !== aL;
      }),
      (az.lPBiP = "EuhwA"),
      (az.SnGFq = "black"),
      (az.GPvTv = function (aK, aL, aM) {
        return aK(aL, aM);
      }),
      (aA = az),
      (aB = window.parseInt(aA.ILwYW(B, "cf_chl_rc_m"))),
      (aC = ![]),
      aA.PfWKC(isNaN, aB) || aB < 50)
    )
      return void aA.YLsCA(ay);
    if (
      ((aD = window.document.getElementById("cf-spinner-allow-5-secs")),
      (aE = "Please click here to continue: "),
      (aF = "I am human!"),
      !aD &&
        ((aD = window.document.getElementById("jc-spinner-allow-5-secs")),
        (aE = decodeURI(
          "%E8%AF%B7%E7%82%B9%E5%87%BB%E8%BF%99%E9%87%8C%E7%BB%A7%E7%BB%AD"
        ))),
      (aG = 0),
      (aH = window.document.createElement("input")),
      (aI = ""),
      aD)
    ) {
      if ("EuhwA" !== "EuhwA")
        function aK(aO, aN, aM, aL) {
          if (
            ((aL = av._cf_chl_opt),
            aA.YyNZB(aw, "cf_chl_prog", "cc", 1),
            (aM = 12 * 3600),
            aL.cRq && aL.cRq.t) &&
            ((aN = v.floor(+w(aL.cRq.t))),
            (aO = x.floor(y.now() / 1e3)),
            aO - aN > aM)
          )
            return (
              !C("cached-challenge-warning") && F("proxied_challenge"),
              E("cf_chl_prog", "cc", "F"),
              ![]
            );
          return !![];
        }
      else
        (aI =
          '<svg width="92" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m58.615 37.432.44-1.485c.522-1.766.328-3.4-.55-4.6-.808-1.105-2.154-1.756-3.788-1.832l-30.96-.386a.617.617 0 0 1-.487-.254.604.604 0 0 1-.067-.546.823.823 0 0 1 .72-.538l31.247-.387c3.706-.166 7.719-3.107 9.124-6.694l1.782-4.553a1.03 1.03 0 0 0 .07-.387.992.992 0 0 0-.022-.215C64.1 6.655 55.98 0 46.267 0c-8.948 0-16.545 5.648-19.27 13.498-1.759-1.291-4.009-1.977-6.427-1.74-4.294.417-7.743 3.797-8.17 7.995a8.816 8.816 0 0 0 .236 3.129C5.624 23.082 0 28.7 0 35.606c0 .625.048 1.24.138 1.84.044.291.295.51.596.51l57.158.007c.005 0 .01-.003.016-.003a.75.75 0 0 0 .707-.528Z" fill="#F6821F"/><path d="M68.93 16.49c-.288 0-.573.008-.858.022a.492.492 0 0 0-.134.028.487.487 0 0 0-.312.321l-1.217 4.112c-.523 1.767-.329 3.4.55 4.6.807 1.106 2.153 1.755 3.787 1.831l6.6.387c.194.01.366.102.47.25.111.157.136.358.07.55a.824.824 0 0 1-.718.537l-6.858.387c-3.723.168-7.736 3.108-9.141 6.694l-.496 1.267c-.09.229.078.473.326.485l.018.002h23.597c.281 0 .532-.18.608-.444.41-1.426.629-2.928.629-4.482 0-9.139-7.576-16.547-16.921-16.547Z" fill="#FBAD41"/><path d="M90.475 38c-.844 0-1.527-.667-1.527-1.492 0-.82.683-1.487 1.527-1.487.842 0 1.525.667 1.525 1.487 0 .825-.683 1.492-1.525 1.492Zm0-2.704c-.676 0-1.224.544-1.224 1.212a1.22 1.22 0 0 0 1.224 1.217 1.22 1.22 0 0 0 1.221-1.217c0-.668-.548-1.212-1.221-1.212Zm.77 2h-.362l-.304-.573h-.408v.568h-.316v-1.64h.804c.354 0 .577.21.577.536 0 .235-.139.424-.349.498l.358.61Zm-.581-.858c.13 0 .26-.066.26-.25 0-.187-.1-.252-.26-.252h-.493v.502h.493Z" fill="#222"/></svg>'),
          (aD.innerText = aE),
          aD.appendChild(aH),
          (aH.style.cursor = "pointer"),
          (aH.style.color = "black"),
          (aH.value = aF),
          (aH.type = "submit");
    }
    aG =
      (aH && (aH.onclick = aJ),
      aA.GPvTv(
        setInterval,
        function (aM, aL) {
          if (
            ((aL = {}),
            (aL.mdcAF = function (aN, aO) {
              return aN & aO;
            }),
            (aM = aL),
            "xhBtS" === "NMdNX")
          )
            function aN(aO) {
              (aO = p & q),
                (r >>= 1),
                0 == s && ((t = u), (v = w(x++))),
                (y |= (0 < aO ? 1 : 0) * z),
                (A <<= 1);
            }
          else v && aJ();
        },
        150
      ));
    function aJ() {
      if (aC) return;
      (aC = !![]), aD && (aD.innerHTML = aI), aG && clearInterval(aG), ay();
    }
  }
  function x(aE, aD, aC, aA, az, ay) {
    (ay = {}),
      (ay.aCKlV = "2|0|4|1|5|3"),
      (ay.qhgfR = "keydown"),
      (ay.ZjVEu = "mousemove"),
      (ay.iFtGm = "click"),
      (ay.PVRmG = function (aF, aG) {
        return aF << aG;
      }),
      (ay.lDlZS = "IwToT"),
      (ay.DzktK = function (aF, aG) {
        return aF + aG;
      }),
      (az = ay),
      (aA = ![]),
      (aC = {}),
      (aC.passive = !![]),
      (aD = aC),
      (aE = function (aF, aG, aH, aJ, aI) {
        if (
          ((aI = {}),
          (aI.Yzlti = function (aK, aL) {
            return aK | aL;
          }),
          (aI.rGVvc = function (aK, aL) {
            return aK << aL;
          }),
          (aI.pWEgp = function (aK, aL) {
            return aK & aL;
          }),
          (aI.zxEAe = function (aK, aL) {
            return aK - aL;
          }),
          (aJ = aI),
          "bOyfa" === "IwToT")
        )
          function aK() {
            for (
              H = 0;
              I < J;
              L <<= 1,
                M == N - 1
                  ? ((O = 0), window.document.push(Q(R)), (S = 0))
                  : T++,
                K++
            );
            for (
              U = V.charCodeAt(0), W = 0;
              8 > X;
              Z = (a0 << 1) | (a1 & 1),
                a2 == a3 - 1 ? ((a4 = 0), a5.push(a6(a7)), (a8 = 0)) : a9++,
                aa >>= 1,
                Y++
            );
          }
        else
          window.document.addEventListener
            ? window.document.addEventListener(aF, aG, aH)
            : window.document.attachEvent("on" + aF, aG);
      }),
      aE("keydown", aB, aD),
      aE("pointermove", aB, aD),
      aE("pointerover", aB, aD),
      aE("touchstart", aB, aD),
      aE("mousemove", aB, aD),
      aE("click", aB, aD);
    function aB(aG, aF) {
      for (aF = "2|0|4|1|5|3".split("|"), aG = 0; !![]; ) {
        switch (aF[aG++]) {
          case "0":
            v++;
            continue;
          case "1":
            if (v < 25) return;
            continue;
          case "2":
            if (aA) return;
            continue;
          case "3":
            window.document.removeEventListener &&
              (window.document.removeEventListener("keydown", aB, aD),
              window.document.removeEventListener("pointermove", aB, aD),
              window.document.removeEventListener("pointerover", aB, aD),
              window.document.removeEventListener("touchstart", aB, aD),
              window.document.removeEventListener("mousemove", aB),
              window.document.removeEventListener("click", aB));
            continue;
          case "4":
            window._cf_chl_ctx.ie = v;
            continue;
          case "5":
            aA = !![];
            continue;
        }
        break;
      }
    }
  }
  function B(ay, aE, aD, aC, aB, aA, az) {
    for (
      az = {},
        az.KdVdd = "hidden",
        az.jKICU = function (aF, aG, aH) {
          return aF(aG, aH);
        },
        az.ZBWOw = function (aF, aG) {
          return aF < aG;
        },
        az.vwnHL = function (aF, aG) {
          return aF == aG;
        },
        az.eMvUS = "lsGMQ",
        aA = az,
        aB = ay + "=",
        aC = window.document.cookie.split(";"),
        aD = 0;
      aD < aC.length;
      aD++
    ) {
      for (aE = aC[aD]; aE.charAt(0) == " "; aE = aE.substring(1));
      if (aE.indexOf(aB) == 0) {
        if ("lsGMQ" === "ulVpD")
          function aF() {
            aA.jKICU(L, ap, function (aG) {
              (aG.style.display = "none"), (aG.style.visibility = "hidden");
            });
          }
        else return aE.substring(aB.length, aE.length);
      }
    }
    return "";
  }
  function C(ay, az, aA, aE, aD, aC, aB) {
    (aB = {}),
      (aB.Mprai = function (aF, aG) {
        return aF + aG;
      }),
      (aB.KeRyy = function (aF, aG) {
        return aF + aG;
      }),
      (aB.feHYv = function (aF, aG) {
        return aF + aG;
      }),
      (aC = aB),
      (aD = new window.Date()),
      aD.setTime(aD.getTime() + aA * 1 * 60 * 60 * 1e3),
      (aE = "expires=" + aD.toUTCString()),
      (window.document.cookie = ay + "=" + az + ";" + aE + ";path=/");
  }
  function D(ay, aA, az) {
    (az = {}),
      (az.JzjoT = function (aB, aC) {
        return aB + aC;
      }),
      (az.HNfxr = "=; Max-Age=-99999999;"),
      (aA = az),
      (window.document.cookie = ay + "=; Max-Age=-99999999;");
  }
  function E(aB, aA, az, ay) {
    (ay = {}),
      (ay.vEsHt = function (aC, aD) {
        return aC(aD);
      }),
      (ay.QyfcM = "cf_chl_rc_m"),
      (ay.HtZxV = function (aC, aD) {
        return aC(aD);
      }),
      (az = ay),
      (aA = window.parseInt(az.vEsHt(B, "cf_chl_rc_m"))),
      az.HtZxV(isNaN, aA) && (aA = 0),
      (aB = 1e3 * window.Math.min(2 << aA, 128)),
      C("cf_chl_rc_m", aA + 1, 1),
      window.setTimeout(function () {
        window.document.location.reload();
      }, aB);
  }
  function F(ay, aA, az) {
    aA =
      ((az = {}),
      (az.mpovC = function (aH, aI) {
        return aH + aI;
      }),
      (az.LyqnX = function (aH, aI) {
        return aH + aI;
      }),
      (az.damEB =
        "/0.21445757674354604:1662877373:R9BCtIXdKfclTuTFKq897yBPyyz9mPhEUkO3BWN0Pac/"),
      (az.YiyzP = function (aH, aI) {
        return aH in aI;
      }),
      (az.kxMLf = "application/x-www-form-urlencoded"),
      (az.hOQef = "_cf_chl_ctx"),
      (az.VKGch = "chC"),
      (az.Jjvzy = "%2b"),
      az);
    try {
      var aB, aC, aD, aE, aF, aG;
      if (
        ((aB = window._cf_chl_opt.cFPWv
          ? "h/" + window._cf_chl_opt.cFPWv + "/"
          : ""),
        (aC =
          "/cdn-cgi/challenge-platform/" +
          aB +
          "beacon/ov" +
          1 +
          "/0.21445757674354604:1662877373:R9BCtIXdKfclTuTFKq897yBPyyz9mPhEUkO3BWN0Pac/" +
          window._cf_chl_opt.cRay +
          "/" +
          window._cf_chl_opt.cHash +
          "/" +
          window._cf_chl_opt.cType),
        (aD = I()),
        !aD)
      )
        return;
      (aE = "POST"),
        aD.open(aE, aC, !![]),
        "timeout" in aD &&
          ((aD.timeout = 2500), (aD.ontimeout = function () {})),
        aD.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        ),
        (aF = {}),
        (aF.msg = ay),
        (aF.cc = o["_cf_chl_ctx"][o["_cf_chl_ctx"]["chC"]]),
        (aF.prog = B("cf_chl_prog")),
        (aG = A.AbglBDlTfe(JSON.stringify(aF)).replace("+", "%2b")),
        aD.send("v_" + window._cf_chl_opt.cRay + "=" + aG);
    } catch (aH) {}
  }
  function G() {}
  function H() {}
  function I(az, ay) {
    if (
      ((ay = {}),
      (ay.XhmSg = function (aA, aB) {
        return aA === aB;
      }),
      (ay.rePeH = function (aA, aB) {
        return aA(aB);
      }),
      (ay.EtQZX = "challenge-explainer-expandable"),
      (ay.dXYWz = function (aA, aB) {
        return aA === aB;
      }),
      (ay.iejyC = "Chqfy"),
      (az = ay),
      window.XMLHttpRequest)
    ) {
      if ("AYEFm" === "AYEFm") return new window.XMLHttpRequest();
      else
        function aA() {
          K._cf_chl_enter();
        }
    }
    if (window.ActiveXObject) {
      if ("Chqfy" === "gysFg")
        function aB(aC) {
          if (((aC = ap()), aC === 1)) return !![];
          if (aq()) return !![];
          az.rePeH(ar, "challenge-explainer-expandable");
        }
      else
        try {
          return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (aC) {}
    }
    window.alert("This browser is not supported."), E();
  }
  function N(ay, aA, az) {
    if (((az = a9()), (aA = M[az][ay]), az === "jc"))
      return decodeURIComponent(aA);
    return aA;
  }
  function O(ay, aD, aC, aB, aA, az) {
    if (
      ((az = {}),
      (az.cZjAI =
        '<div id="challenge-error-title"><div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Warning icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAPFBMVEUAAACvDwOyDwKyDwOvEACyDgOyDwKvDwKwDgCyDgKxDgOyDgKvDgKyDwKyDgOxDgKzDgKxDgKxEASyDwMgW5ZmAAAAE3RSTlMAQN+/EJDvMB9wYJ9Qz7CAf6CAtGoj/AAAAcFJREFUSMeVltu2gyAMRLlfBDxt+f9/PTq2VXSwmod2GdhkEoIiiPmYinK1VqXt4MUFk9bVxlTyvxBdienhNoJwoYMY+57hdMzBTA4v4/gRaykT1FuLNI0/j/1g3i2IJ8s9F+owNCx+2UlWQXbexQFjjTjN1/lGALS9xIm9QIXNOoowlFKrFssYTtmvuOXpp2HtT6lUE3f11bH1IQu9qbYUBEr7yq8zCxkWuva8+rtF4RrkP6ESxFPoj7rtW30+jI4UQlZuiejEwZ4cMg65RKjjUDz6NdwWvxw6nnLESEAl230O5cldUAdy8P44hJZTYh40DOIKzFw3QOI6hPk9aDiFHJc3nMirKERgEPd7FKKgiy5DEn3+5JsrAfHNtfjVRLucTPTaCA1rxFVz6AX8yYsIUlXoMqbPWFUeXF1Cyqz7Ej1PAXNBs1B1tsKWKpsX0yFhslTetL4mL8s4j2fyslTbjbT7Va2V7GCG5ukhftijXdsoQhGmzSI4QhHGhVufz4QJ/v6Hug6dK0EK3YuM8/3Lx5h3Z0STywe55oxRejM5Qo4aAtZ8eTBuWp6dl3IXgfnnLpyzBCFctHomnSopejLhH/3AMfEMndTJAAAAAElFTkSuQmCC"></span><span id="challenge-error-text">'),
      (az.IQVzC = function (aE) {
        return aE();
      }),
      (az.wwnnp = function (aE, aF) {
        return aE + aF;
      }),
      (az.Okibo = function (aE, aF) {
        return aE + aF;
      }),
      (az.pkAtV =
        '-content"><p style="background-color: #de5052; border-color: #521010; color: #fff;" class="'),
      (az.HYErB = "-alert "),
      (az.fKdaM = "zsliE"),
      (aA = az),
      a1(),
      a7(),
      (aB = N(ay)),
      (aC = aa()),
      aC === 1)
    )
      (aD = aA.IQVzC(a9)),
        (window.document.getElementById("challenge-form").innerHTML +=
          '<div class="' +
          aD +
          '-content"><p style="background-color: #de5052; border-color: #521010; color: #fff;" class="' +
          aD +
          "-alert " +
          aD +
          '-alert-error">' +
          aB +
          "</p></div>");
    else {
      if ("zsliE" === "zsliE")
        ae("challenge-body-text", function (aE) {
          aE.innerHTML =
            '<div id="challenge-error-title"><div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Warning icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAPFBMVEUAAACvDwOyDwKyDwOvEACyDgOyDwKvDwKwDgCyDgKxDgOyDgKvDgKyDwKyDgOxDgKzDgKxDgKxEASyDwMgW5ZmAAAAE3RSTlMAQN+/EJDvMB9wYJ9Qz7CAf6CAtGoj/AAAAcFJREFUSMeVltu2gyAMRLlfBDxt+f9/PTq2VXSwmod2GdhkEoIiiPmYinK1VqXt4MUFk9bVxlTyvxBdienhNoJwoYMY+57hdMzBTA4v4/gRaykT1FuLNI0/j/1g3i2IJ8s9F+owNCx+2UlWQXbexQFjjTjN1/lGALS9xIm9QIXNOoowlFKrFssYTtmvuOXpp2HtT6lUE3f11bH1IQu9qbYUBEr7yq8zCxkWuva8+rtF4RrkP6ESxFPoj7rtW30+jI4UQlZuiejEwZ4cMg65RKjjUDz6NdwWvxw6nnLESEAl230O5cldUAdy8P44hJZTYh40DOIKzFw3QOI6hPk9aDiFHJc3nMirKERgEPd7FKKgiy5DEn3+5JsrAfHNtfjVRLucTPTaCA1rxFVz6AX8yYsIUlXoMqbPWFUeXF1Cyqz7Ej1PAXNBs1B1tsKWKpsX0yFhslTetL4mL8s4j2fyslTbjbT7Va2V7GCG5ukhftijXdsoQhGmzSI4QhHGhVufz4QJ/v6Hug6dK0EK3YuM8/3Lx5h3Z0STywe55oxRejM5Qo4aAtZ8eTBuWp6dl3IXgfnnLpyzBCFctHomnSopejLhH/3AMfEMndTJAAAAAElFTkSuQmCC"></span><span id="challenge-error-text">' +
            aB +
            "</span></div></div>";
        });
      else
        function aE() {
          return !![];
        }
    }
  }
  function P() {
    if (window._cf_chl_opt.chlApivId) return !![];
    return ![];
  }
  function Q(ay, aB, aA, az) {
    if (
      ((az = {}),
      (az.DjUjb = "3|4|1|2|0"),
      (az.mFkrM = function (aC, aD) {
        return aC == aD;
      }),
      (az.juopz = function (aC, aD) {
        return aC > aD;
      }),
      (az.GMDNV = function (aC, aD) {
        return aC(aD);
      }),
      (az.TWExb = function (aC, aD) {
        return aC == aD;
      }),
      (az.FJYbE = function (aC, aD) {
        return aC < aD;
      }),
      (az.JptJI = function (aC, aD) {
        return aC - aD;
      }),
      (az.YYowF = function (aC, aD) {
        return aC < aD;
      }),
      (az.kCkeT = function (aC, aD) {
        return aC << aD;
      }),
      (az.UmaKx = "block"),
      (aA = az),
      (aB = window.document.getElementById(ay)),
      aB)
    ) {
      if ("UhqwR" === "UhqwR") return (aB.style.display = "block"), !![];
      else
        function aC(aF, aE, aD) {
          for (aD = "3|4|1|2|0".split("|"), aE = 0; !![]; ) {
            switch (aD[aE++]) {
              case "0":
                ce = cf(cg);
                continue;
              case "1":
                0 == c6 && ((c7 = c8.pow(2, c9)), ca++);
                continue;
              case "2":
                cb[cc] = cd++;
                continue;
              case "3":
                if (aK.prototype.hasOwnProperty.call(aL, aM)) {
                  if (256 > ch.charCodeAt(0)) {
                    for (
                      dj = 0;
                      dk < dl;
                      dn <<= 1,
                        dp == dq - 1
                          ? ((dr = 0), ds.push(aA.GMDNV(dt, du)), (dv = 0))
                          : dw++,
                        dm++
                    );
                    for (
                      aF = dx.charCodeAt(0), dy = 0;
                      8 > dz;
                      dB = (dC << 1) | (aF & 1),
                        dD == dE - 1
                          ? ((dF = 0), dG.push(dH(dI)), (dJ = 0))
                          : dK++,
                        aF >>= 1,
                        dA++
                    );
                  } else {
                    for (
                      aF = 1, dL = 0;
                      dM < dN;
                      dP = (dQ << 1) | aF,
                        dR == dS - 1
                          ? ((dT = 0), dU.push(dV(dW)), (dX = 0))
                          : dY++,
                        aF = 0,
                        dO++
                    );
                    for (
                      aF = dZ.charCodeAt(0), e0 = 0;
                      16 > e1;
                      e3 = (e4 << 1) | (aF & 1),
                        e5 == e6 - 1
                          ? ((e7 = 0), e8.push(aA.GMDNV(e9, ea)), (eb = 0))
                          : ec++,
                        aF >>= 1,
                        e2++
                    );
                  }
                  db--, 0 == dc && ((dd = de.pow(2, df)), dg++), delete dh[di];
                } else {
                  for (
                    aF = bP[bQ], bR = 0;
                    bS < bT;
                    bV = (bW << 1) | (aF & 1),
                      bX == bY - 1
                        ? ((bZ = 0), c0.push(c1(c2)), (c3 = 0))
                        : c4++,
                      aF >>= 1,
                      bU++
                  );
                }
                continue;
              case "4":
                c5--;
                continue;
            }
            break;
          }
        }
    }
    return ![];
  }
  function R(ay, aA, az) {
    (az = {}),
      (az.Eqttp = function (aB, aC) {
        return aB + aC;
      }),
      (az.kCSnq = function (aB, aC) {
        return aB(aC);
      }),
      (az.oLsSP = function (aB, aC, aD) {
        return aB(aC, aD);
      }),
      (aA = az),
      aA.oLsSP(ae, "challenge-form", function (aB) {
        aB.innerHTML +=
          '<div class="cf-content"><p style="background-color: #de5052; border-color: #521010; color: #fff;" class="cf-alert cf-alert-error">' +
          aA.kCSnq(N, ay) +
          "</p></div>";
      });
  }
  function S(ay, az) {
    ay.parentNode.insertBefore(az, ay.nextSibling);
  }
  function T(ay, aD, aC, aB, aA, az) {
    for (
      az = {},
        az.cfMzF = function (aE, aF) {
          return aE(aF);
        },
        az.DecIK = "font-red",
        aA = az,
        aB = "1|4|3|5|0|2".split("|"),
        aC = 0;
      !![];

    ) {
      switch (aB[aC++]) {
        case "0":
          ag("challenge-body-text");
          continue;
        case "1":
          aD = window.document.createElement("div");
          continue;
        case "2":
          return aD;
        case "3":
          aD.innerText = aA.cfMzF(N, ay);
          continue;
        case "4":
          aD.classList.add("core-msg", "spacer", "font-red");
          continue;
        case "5":
          S(window.document.getElementById("challenge-body-text"), aD);
          continue;
      }
      break;
    }
  }
  function U(aM, aL, aK, aJ, aI, aH, aG, aF, aE, aD, aC, aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.bbHcH = function (aN, aO) {
        return aN !== aO;
      }),
      (ay.hirxO = "expanded"),
      (ay.KaoBu = function (aN, aO) {
        return aN === aO;
      }),
      (ay.dzwwN = "div"),
      (ay.ERMWA = "challenge-stage"),
      (ay.HYLnp = "challenge-form"),
      (ay.FqsmJ = function (aN) {
        return aN();
      }),
      (ay.JAOow = "YkmpE"),
      (ay.sUArW = "challenge-spinner"),
      (ay.hSjsE = "lds-ring"),
      (ay.BrwcI = "challenge-success"),
      (ay.rfvwB = "none"),
      (ay.CvNrB = "success_title"),
      (ay.SPRUI = "success_text"),
      (ay.FVhSw = function (aN, aO) {
        return aN + aO;
      }),
      (ay.ShAwq =
        '<div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Success icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAANlBMVEUAAAAxMTEwMDAxMTExMTEwMDAwMDAwMDAxMTExMTExMTEwMDAwMDAxMTExMTEwMDAwMDAxMTHB9N+uAAAAEXRSTlMA3zDvfyBAEJC/n3BQz69gX7VMkcMAAAGySURBVEjHnZZbFoMgDEQJiDzVuv/NtgbtFGuQ4/zUKpeMIQbUhXSKE5l1XSn4pFWHRm/WShT1HRLWC01LGxFEVkCc30eYkLJ1Sjk9pvkw690VY6k8DWP9OM9yMG0Koi+mi8XA36NXmW0UXra4eJ3iwHfrfXVlgL0NqqGBHdqfeQhMmyJ48WDuKP81h3+SMPeRKkJcSXiLUK4XTHCjESOnz1VUXQoc6lgi2x4cI5aTQ201Mt8wHysI5fc05M5c81uZEtHcMKhxZ7iYEty1GfhLvGKpm+EYkdGxm1F5axmcB93DoORIbXfdN7f+hlFuyxtDP+sxtBnF43cIYwaZAWRgzxIoiXEMESoPlMhwLRDXeK772CAzXEdBRV7cmnoVBp0OSlyGidEzJTFq5hhcsA5388oSGM6b5p+qjpZrBlMS9xj4AwXmz108ukU1IomM3ceiW0CDwHCqp1NjAqXlFrbga+xuloQJ+tuyfbIBPNpqnmxqT7dPaOnZqBfhSBCteJAxWj58zLk2xgg+SPGYM6dRO6WczSnIxxwEExRaO+UyCUhbOp7CGQ+kxSUfNtLQFC+Po29vvy7jj4y0yAAAAABJRU5ErkJggg=="></span>'),
      (ay.OxJCj = '</div><div class="core-msg spacer">'),
      (ay.wDGkK = "challenge-body-text"),
      (ay.ZPhJF = "challenge-fact-wrapper"),
      (ay.cPAFb = "spacer"),
      (ay.aRCPD = "hidden"),
      (ay.BQXWY = function (aN, aO) {
        return aN + aO;
      }),
      (ay.kmWwS = function (aN, aO) {
        return aN + aO;
      }),
      (ay.dbvlp = function (aN, aO) {
        return aN + aO;
      }),
      (ay.MGfNt = '<span class="fact-title">'),
      (ay.ZqZuK = function (aN, aO) {
        return aN(aO);
      }),
      (ay.Fbpbz = '</span> <span id="challenge-fact" class="body-text">'),
      (ay.PXGJl = "facts_"),
      (ay.FZRye = function (aN, aO, aP) {
        return aN(aO, aP);
      }),
      (ay.aQSGO = "challenge-explainer-expandable"),
      (ay.BDiTP = "body-text"),
      (ay.KupJI = "explainer_title"),
      (ay.MClre = "explainer_text"),
      (ay.HLDPT = function (aN, aO, aP) {
        return aN(aO, aP);
      }),
      (az = ay),
      (aA = aa()),
      aA === 1)
    )
      return (
        (aB = window.document.createElement("div")),
        (aB.id = "challenge-stage"),
        (aB.style.display = "none"),
        window.document.getElementById("challenge-form").appendChild(aB),
        !![]
      );
    if (az.FqsmJ(P)) {
      if ("YkmpE" !== "jIJGx") return;
      else
        function aN() {
          return !![];
        }
    }
    for (
      aC = window.document.createElement("div"),
        aC.id = "challenge-spinner",
        aC.classList.add("spacer", "loading-spinner"),
        aD = window.document.createElement("div"),
        aD.classList.add("lds-ring"),
        aE = 0;
      aE < 4;
      aD.appendChild(window.document.createElement("div")), aE++
    );
    return (
      aC.appendChild(aD),
      S(window.document.getElementById("challenge-running"), aC),
      (aF = window.document.createElement("div")),
      (aF.id = "challenge-success"),
      (aF.style.display = "none"),
      (aG = window._cf_chl_opt.ui.getUiBrandedSnippet("success_title")),
      (aH = window._cf_chl_opt.ui.getUiBrandedSnippet("success_text")),
      (aF.innerHTML =
        '<div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Success icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAANlBMVEUAAAAxMTEwMDAxMTExMTEwMDAwMDAwMDAxMTExMTExMTEwMDAwMDAxMTExMTEwMDAwMDAxMTHB9N+uAAAAEXRSTlMA3zDvfyBAEJC/n3BQz69gX7VMkcMAAAGySURBVEjHnZZbFoMgDEQJiDzVuv/NtgbtFGuQ4/zUKpeMIQbUhXSKE5l1XSn4pFWHRm/WShT1HRLWC01LGxFEVkCc30eYkLJ1Sjk9pvkw690VY6k8DWP9OM9yMG0Koi+mi8XA36NXmW0UXra4eJ3iwHfrfXVlgL0NqqGBHdqfeQhMmyJ48WDuKP81h3+SMPeRKkJcSXiLUK4XTHCjESOnz1VUXQoc6lgi2x4cI5aTQ201Mt8wHysI5fc05M5c81uZEtHcMKhxZ7iYEty1GfhLvGKpm+EYkdGxm1F5axmcB93DoORIbXfdN7f+hlFuyxtDP+sxtBnF43cIYwaZAWRgzxIoiXEMESoPlMhwLRDXeK772CAzXEdBRV7cmnoVBp0OSlyGidEzJTFq5hhcsA5388oSGM6b5p+qjpZrBlMS9xj4AwXmz108ukU1IomM3ceiW0CDwHCqp1NjAqXlFrbga+xuloQJ+tuyfbIBPNpqnmxqT7dPaOnZqBfhSBCteJAxWj58zLk2xgg+SPGYM6dRO6WczSnIxxwEExRaO+UyCUhbOp7CGQ+kxSUfNtLQFC+Po29vvy7jj4y0yAAAAABJRU5ErkJggg=="></span>' +
        aG +
        '</div><div class="core-msg spacer">' +
        aH +
        "</div></div>"),
      S(window.document.getElementById("challenge-body-text"), aF),
      (aI = 8),
      (aJ = Math.floor(Math.random() * aI) + 1),
      (aK = window.document.createElement("div")),
      (aK.id = "challenge-fact-wrapper"),
      (aK.style.display = "none"),
      aK.classList.add("fact", "spacer", "hidden"),
      (aK.innerHTML =
        '<span class="fact-title">' +
        az.ZqZuK(N, "facts_title") +
        '</span> <span id="challenge-fact" class="body-text">' +
        N("facts_" + aJ) +
        "</span>"),
      az.FZRye(S, window.document.getElementById("challenge-body-text"), aK),
      (aL = window.document.createElement("div")),
      (aL.id = "challenge-explainer-expandable"),
      aL.classList.add("hidden", "expandable", "body-text", "spacer"),
      (aL.style.display = "none"),
      (aL.innerHTML =
        '<div class="expandable-title" id="challenge-explainer-summary"><button class="expandable-summary-btn" id="challenge-explainer-btn" type="button">' +
        N("explainer_title") +
        '<span class="caret-icon-wrapper"> <div class="caret-icon"></div> </span> </button> </div> <div class="expandable-details" id="challenge-explainer-details">' +
        N("explainer_text") +
        "</div>"),
      S(window.document.getElementById("challenge-fact-wrapper"), aL),
      aL.addEventListener("click", function (aO) {
        if ("XIpYk" !== "XIpYk")
          function aP() {
            ay.sendRequest(aq, aE + 1);
          }
        else
          (aO = window.document.getElementById(
            "challenge-explainer-expandable"
          )),
            awindow.classList.toggle("expanded");
      }),
      (aM = window.document.createElement("div")),
      (aM.id = "challenge-stage"),
      (aM.style.display = "none"),
      az.HLDPT(S, window.document.getElementById("challenge-running"), aM),
      !![]
    );
  }
  function V() {
    return window.document.getElementById("challenge-stage");
  }
  function W() {
    V().innerHTML = "";
  }
  function X(az, ay) {
    (ay = {}),
      (ay.MOPHx = function (aA) {
        return aA();
      }),
      (az = ay),
      (az.MOPHx(V).style.display = "block");
  }
  function Y() {
    V().style.display = "none";
  }
  function Z(az, ay) {
    if (
      ((ay = {}),
      (ay.suZUu = "undefined"),
      (ay.phHTk = function (aA, aB) {
        return aA > aB;
      }),
      (az = ay),
      typeof this.darkmode !== "undefined")
    )
      return this.darkmode;
    if (
      aa() > 2 &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return (this.darkmode = !![]), !![];
    return (this.darkmode = ![]), ![];
  }
  function a0(ay, aD, aC, aB, aA, az) {
    if (
      ((az = {}),
      (az.vTQFh = "Device verification complete. Redirecting..."),
      (az.pYgcb = function (aE, aF) {
        return aE(aF);
      }),
      (az.ABJds = "fail"),
      (az.TMZPL = "yayDt"),
      (az.nAARs = "block"),
      (az.SUWgi =
        '<div id="challenge-error-title"><div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Warning icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAPFBMVEUAAACvDwOyDwKyDwOvEACyDgOyDwKvDwKwDgCyDgKxDgOyDgKvDgKyDwKyDgOxDgKzDgKxDgKxEASyDwMgW5ZmAAAAE3RSTlMAQN+/EJDvMB9wYJ9Qz7CAf6CAtGoj/AAAAcFJREFUSMeVltu2gyAMRLlfBDxt+f9/PTq2VXSwmod2GdhkEoIiiPmYinK1VqXt4MUFk9bVxlTyvxBdienhNoJwoYMY+57hdMzBTA4v4/gRaykT1FuLNI0/j/1g3i2IJ8s9F+owNCx+2UlWQXbexQFjjTjN1/lGALS9xIm9QIXNOoowlFKrFssYTtmvuOXpp2HtT6lUE3f11bH1IQu9qbYUBEr7yq8zCxkWuva8+rtF4RrkP6ESxFPoj7rtW30+jI4UQlZuiejEwZ4cMg65RKjjUDz6NdwWvxw6nnLESEAl230O5cldUAdy8P44hJZTYh40DOIKzFw3QOI6hPk9aDiFHJc3nMirKERgEPd7FKKgiy5DEn3+5JsrAfHNtfjVRLucTPTaCA1rxFVz6AX8yYsIUlXoMqbPWFUeXF1Cyqz7Ej1PAXNBs1B1tsKWKpsX0yFhslTetL4mL8s4j2fyslTbjbT7Va2V7GCG5ukhftijXdsoQhGmzSI4QhHGhVufz4QJ/v6Hug6dK0EK3YuM8/3Lx5h3Z0STywe55oxRejM5Qo4aAtZ8eTBuWp6dl3IXgfnnLpyzBCFctHomnSopejLhH/3AMfEMndTJAAAAAElFTkSuQmCC"></span><span id="challenge-error-text">'),
      (az.gFTaz = function (aE) {
        return aE();
      }),
      (az.YVozQ = function (aE, aF) {
        return aE === aF;
      }),
      (az.ULsNX = function (aE, aF) {
        return aE + aF;
      }),
      (az.idZdg = "-spinner-allow-5-secs"),
      (az.ZMWTL = "none"),
      (az.ZTkEi = "bubbles"),
      (az.plirK = "challenge-body-text"),
      (aA = az),
      (aB = aA.gFTaz(a9)),
      (aC = aa()),
      aC === 1)
    ) {
      if ("oqxcf" === "oqxcf")
        (aD = window.document.getElementById(aB + "-spinner-allow-5-secs")),
          aD && (aD.style.display = "none"),
          ay
            ? (ad("spinner-redirecting", function (aE) {
                (aE.innerHTML = "Device verification complete. Redirecting..."),
                  (aE.style.display = "block");
              }),
              ad("bubbles", function (aE) {
                aE.innerHTML =
                  '<svg width="92" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m58.615 37.432.44-1.485c.522-1.766.328-3.4-.55-4.6-.808-1.105-2.154-1.756-3.788-1.832l-30.96-.386a.617.617 0 0 1-.487-.254.604.604 0 0 1-.067-.546.823.823 0 0 1 .72-.538l31.247-.387c3.706-.166 7.719-3.107 9.124-6.694l1.782-4.553a1.03 1.03 0 0 0 .07-.387.992.992 0 0 0-.022-.215C64.1 6.655 55.98 0 46.267 0c-8.948 0-16.545 5.648-19.27 13.498-1.759-1.291-4.009-1.977-6.427-1.74-4.294.417-7.743 3.797-8.17 7.995a8.816 8.816 0 0 0 .236 3.129C5.624 23.082 0 28.7 0 35.606c0 .625.048 1.24.138 1.84.044.291.295.51.596.51l57.158.007c.005 0 .01-.003.016-.003a.75.75 0 0 0 .707-.528Z" fill="#F6821F"/><path d="M68.93 16.49c-.288 0-.573.008-.858.022a.492.492 0 0 0-.134.028.487.487 0 0 0-.312.321l-1.217 4.112c-.523 1.767-.329 3.4.55 4.6.807 1.106 2.153 1.755 3.787 1.831l6.6.387c.194.01.366.102.47.25.111.157.136.358.07.55a.824.824 0 0 1-.718.537l-6.858.387c-3.723.168-7.736 3.108-9.141 6.694l-.496 1.267c-.09.229.078.473.326.485l.018.002h23.597c.281 0 .532-.18.608-.444.41-1.426.629-2.928.629-4.482 0-9.139-7.576-16.547-16.921-16.547Z" fill="#FBAD41"/><path d="M90.475 38c-.844 0-1.527-.667-1.527-1.492 0-.82.683-1.487 1.527-1.487.842 0 1.525.667 1.525 1.487 0 .825-.683 1.492-1.525 1.492Zm0-2.704c-.676 0-1.224.544-1.224 1.212a1.22 1.22 0 0 0 1.224 1.217 1.22 1.22 0 0 0 1.221-1.217c0-.668-.548-1.212-1.221-1.212Zm.77 2h-.362l-.304-.573h-.408v.568h-.316v-1.64h.804c.354 0 .577.21.577.536 0 .235-.139.424-.349.498l.358.61Zm-.581-.858c.13 0 .26-.066.26-.25 0-.187-.1-.252-.26-.252h-.493v.502h.493Z" fill="#222"/></svg>';
              }))
            : ad("spinner-redirecting", function (aE) {
                if ("yayDt" === "yayDt") aE.style.display = "block";
                else
                  function aF() {
                    aA.pYgcb(K, "fail");
                  }
              });
      else
        function aE(aG, aF) {
          (aF = {}),
            (aF.ptzaV = function (aH, aI) {
              return aH + aI;
            }),
            (aF.MkUNN =
              '<div id="challenge-error-title"><div class="h2"><span class="icon-wrapper"><img class="heading-icon" alt="Warning icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAPFBMVEUAAACvDwOyDwKyDwOvEACyDgOyDwKvDwKwDgCyDgKxDgOyDgKvDgKyDwKyDgOxDgKzDgKxDgKxEASyDwMgW5ZmAAAAE3RSTlMAQN+/EJDvMB9wYJ9Qz7CAf6CAtGoj/AAAAcFJREFUSMeVltu2gyAMRLlfBDxt+f9/PTq2VXSwmod2GdhkEoIiiPmYinK1VqXt4MUFk9bVxlTyvxBdienhNoJwoYMY+57hdMzBTA4v4/gRaykT1FuLNI0/j/1g3i2IJ8s9F+owNCx+2UlWQXbexQFjjTjN1/lGALS9xIm9QIXNOoowlFKrFssYTtmvuOXpp2HtT6lUE3f11bH1IQu9qbYUBEr7yq8zCxkWuva8+rtF4RrkP6ESxFPoj7rtW30+jI4UQlZuiejEwZ4cMg65RKjjUDz6NdwWvxw6nnLESEAl230O5cldUAdy8P44hJZTYh40DOIKzFw3QOI6hPk9aDiFHJc3nMirKERgEPd7FKKgiy5DEn3+5JsrAfHNtfjVRLucTPTaCA1rxFVz6AX8yYsIUlXoMqbPWFUeXF1Cyqz7Ej1PAXNBs1B1tsKWKpsX0yFhslTetL4mL8s4j2fyslTbjbT7Va2V7GCG5ukhftijXdsoQhGmzSI4QhHGhVufz4QJ/v6Hug6dK0EK3YuM8/3Lx5h3Z0STywe55oxRejM5Qo4aAtZ8eTBuWp6dl3IXgfnnLpyzBCFctHomnSopejLhH/3AMfEMndTJAAAAAElFTkSuQmCC"></span><span id="challenge-error-text">'),
            (aG = aF),
            L("challenge-body-text", function (aH) {
              aH.innerHTML = aG.MkUNN + aF + "</span></div></div>";
            });
        }
    } else
      ag("challenge-running"),
        ag("challenge-body-text"),
        aA.pYgcb(ag, "challenge-fact-wrapper"),
        a1(),
        af("challenge-success");
  }
  function a1(aC, aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.fMJbP = "unspun"),
      (ay.ubRTq = function (aD) {
        return aD();
      }),
      (ay.diWGG = function (aD, aE) {
        return aD === aE;
      }),
      (ay.MZTpQ = "bubbles"),
      (ay.nzDWS = "challenge-spinner"),
      (ay.okDfj = function (aD, aE, aF) {
        return aD(aE, aF);
      }),
      (ay.PFonF = "spinner-icon"),
      (ay.uAKLu = function (aD, aE) {
        return aD(aE);
      }),
      (az = ay),
      (aA = a9()),
      (aB = az.ubRTq(aa)),
      aB === 1)
    )
      (aC = window.document.getElementById(aA + "-please-wait")),
        aC ? (aC.style.display = "none") : ah("bubbles");
    else {
      if (!az.ubRTq(P)) {
        if ("IVhSE" === "IVhSE") ag("challenge-spinner");
        else
          function aD() {
            return ay.substring(aq.length, ar.length);
          }
      } else
        az.okDfj(ae, "spinner-icon", function (aE) {
          aE.classList.add("unspun");
        }),
          az.uAKLu(ag, "verifying-text");
    }
  }
  function a2(aC, aB, aA, az, ay) {
    if (
      ((ay = {}),
      (ay.FqhFM = "expanded"),
      (ay.IUAdx = function (aD, aE) {
        return aD + aE;
      }),
      (ay.eMfBv = function (aD, aE) {
        return aD + aE;
      }),
      (ay.iyRxg = "</div>"),
      (ay.JOLwm = "terms"),
      (ay.dmCOx = function (aD, aE, aF) {
        return aD(aE, aF);
      }),
      (ay.NzDYo = "branding"),
      (ay.RqLIN = function (aD, aE) {
        return aD | aE;
      }),
      (ay.PYizN = function (aD, aE) {
        return aD - aE;
      }),
      (ay.xhHzM = function (aD, aE) {
        return aD > aE;
      }),
      (ay.dgadY = function (aD, aE) {
        return aD << aE;
      }),
      (ay.UyLSV = function (aD, aE) {
        return aD == aE;
      }),
      (ay.DTXeB = function (aD, aE) {
        return aD - aE;
      }),
      (ay.PzuUy = function (aD, aE) {
        return aD(aE);
      }),
      (ay.krUwk = "-please-wait"),
      (ay.nvTJl = "jSogP"),
      (ay.hzOVt = "bubbles"),
      (ay.NPdaI = "VSRjQ"),
      (ay.PjeSI = "block"),
      (ay.jouHi = "LlETd"),
      (az = ay),
      (aA = a9()),
      (aB = aa()),
      aB === 1)
    ) {
      if (((aC = window.document.getElementById(aA + "-please-wait")), aC)) {
        if ("jSogP" !== "eSRzA") aC.style.display = "block";
        else
          function aD(aE) {
            (aE = K.getElementById("challenge-explainer-expandable")),
              aE.classList.toggle("expanded");
          }
      } else ai("bubbles", "block");
    } else {
      if (!P()) {
        if ("VSRjQ" !== "VSRjQ")
          function aE(aG, aF) {
            (aF = {}),
              (aF.GFBjt = "click"),
              (aG = aF),
              as("logo"),
              at("terms"),
              az.dmCOx(au, "branding", function (aH) {
                aH.innerHTML += '<div id="qr">' + p + "</div>";
              }),
              aw("qr", function (aH) {
                aH.addEventListener("click", p);
              });
          }
        else af("challenge-spinner", "block");
      } else {
        if ("LlETd" === "LlETd")
          az.dmCOx(ae, "spinner-icon", function (aF) {
            aF.classList.remove("unspun");
          }),
            az.dmCOx(af, "verifying-text", "block");
        else
          function aF() {
            for (
              L = 1, M = 0;
              N < O;
              Q = (R << 1) | S,
                T == U - 1 ? ((V = 0), W.push(X(Y)), (Z = 0)) : a0++,
                a1 = 0,
                P++
            );
            for (
              a2 = a3.charCodeAt(0), a4 = 0;
              16 > a5;
              a7 = (a8 << 1) | (a9 & 1),
                aa == ab - 1
                  ? ((ac = 0), ad.push(az.PzuUy(ae, af)), (ag = 0))
                  : ah++,
                ai >>= 1,
                a6++
            );
          }
      }
    }
  }
  function a3(aA, az, ay) {
    if (
      ((ay = {}),
      (ay.jiGwC = function (aB, aC) {
        return aB(aC);
      }),
      (ay.eBlgQ = "challenge-running"),
      (ay.tCdyQ = function (aB) {
        return aB();
      }),
      (ay.uZKEC = function (aB, aC) {
        return aB === aC;
      }),
      (ay.iTRgX = "dyLrT"),
      (ay.iXnkM = "IirEz"),
      (ay.FoTmp = "CKook"),
      (ay.yqqsG = "block"),
      (az = ay),
      (aA = az.tCdyQ(aa)),
      aA === 1)
    ) {
      if ("dyLrT" === "IirEz")
        function aB() {
          if (L()) return !![];
          az.jiGwC(ay, "challenge-running");
        }
      else return !![];
    }
    if (P()) {
      if ("CKook" === "CKook") return !![];
      else
        function aC() {
          return "etw5ThydzarnJUPNX+1MH7o4mCFW2Db3$c0YAvpg-lqsfiZ8x6IGOLSVQ9EjRKuBk".charAt(
            K
          );
        }
    }
    af("challenge-explainer-expandable", "block");
  }
  function a4(aA, az, ay) {
    if (
      ((ay = {}),
      (ay.tDumd = function (aB, aC) {
        return aB + aC;
      }),
      (ay.ZoqeF = function (aB) {
        return aB();
      }),
      (ay.zqSuD = "vvudt"),
      (ay.sAHRF = function (aB, aC) {
        return aB(aC);
      }),
      (ay.tUYph = "challenge-explainer-expandable"),
      (az = ay),
      (aA = az.ZoqeF(aa)),
      aA === 1)
    ) {
      if ("qeJgL" === "vvudt")
        function aB() {
          if (av in aw.style) return !![];
          for (
            o = window.document.replace(/^[a-z]/, function (aC) {
              return aC.toUpperCase();
            });
            q--;

          )
            if (v[w] + x in y.style) return !![];
          return ![];
        }
      else return !![];
    }
    if (P()) return !![];
    az.sAHRF(ag, "challenge-explainer-expandable");
  }
  function a5(aA, az, ay) {
    if (
      ((ay = {}),
      (ay.iWogv = function (aB, aC) {
        return aB === aC;
      }),
      (ay.oqcDQ = "RqAlB"),
      (ay.JmkYI = function (aB, aC, aD) {
        return aB(aC, aD);
      }),
      (az = ay),
      (aA = aa()),
      aA === 1)
    )
      return !![];
    if (P()) {
      if ("RqAlB" !== "RqAlB")
        function aB() {
          return !![];
        }
      else return !![];
    }
    az.JmkYI(af, "challenge-fact-wrapper", "block");
  }
  function a6(aA, az, ay) {
    if (
      ((ay = {}),
      (ay.ZIDDH = function (aB, aC) {
        return aB !== aC;
      }),
      (az = ay),
      (aA = aa()),
      aA === 1)
    )
      return !![];
    if (P()) {
      if ("BWiHL" !== "zyUQA") return !![];
      else
        function aB() {
          return !![];
        }
    }
    ag("challenge-fact-wrapper");
  }
  function a7(az, ay) {
    if (
      ((ay = {}),
      (ay.pzuhI = function (aA, aB) {
        return aA(aB);
      }),
      (az = ay),
      P())
    )
      return !![];
    az.pzuhI(ag, "challenge-running");
  }
  function a8(ay, aB, aA, az) {
    return (
      (az = {}),
      (az.zScAg = "auto"),
      (az.Fxogm = "absolute"),
      (az.cjofu = "0.5"),
      (aA = az),
      (aB = window.document.createElement("div")),
      (aB.style.height = "auto"),
      (aB.style.position = "absolute"),
      (aB.style.top = "5px"),
      (aB.style.left = "5px"),
      (aB.style.padding = "2px"),
      (aB.style.width = "400px"),
      (aB.style.opacity = "0.5"),
      (aB.style.zIndex = "9999999999"),
      (aB.style.color = "red"),
      (aB.style.fontSize = "8px"),
      (aB.style.fontFamily = 'consolas,"Liberation Mono",courier,monospace'),
      (aB.innerHTML = ay),
      (aB.fontWeight = "bold"),
      window.document.body.appendChild(aB),
      aB
    );
  }
  function a9(ay) {
    if (this.prefix) return this.prefix;
    return (
      (ay = "cf"),
      window._cf_chl_opt.cTplB === "jdc" && (ay = "jc"),
      (this.prefix = ay),
      ay
    );
  }
  function aa(aA, az, ay) {
    return (
      (ay = {}),
      (ay.dyeaI = function (aB, aC) {
        return aB === aC;
      }),
      (az = ay),
      (aA = 1),
      window._cf_chl_opt.cTplV &&
        typeof window._cf_chl_opt.cTplV === "number" &&
        (aA = window._cf_chl_opt.cTplV),
      aA
    );
  }
  function ab(az, ay) {
    (ay = {}),
      (ay.MWLzF = function (aA) {
        return aA();
      }),
      (ay.bRmcB = function (aA) {
        return aA();
      }),
      (az = ay),
      a1(),
      W(),
      az.MWLzF(X),
      az.bRmcB(a3);
  }
  function ac(az, ay) {
    (ay = {}),
      (ay.cbGMo = function (aA) {
        return aA();
      }),
      (az = ay),
      az.cbGMo(a2),
      W(),
      Y(),
      a4();
  }
  function ad(ay, az, aC, aB, aA) {
    (aA = {}),
      (aA.CyyBG = function (aD) {
        return aD();
      }),
      (aA.yGjwB = function (aD, aE) {
        return aD + aE;
      }),
      (aB = aA),
      (aC = aB.CyyBG(a9)),
      ae(aC + "-" + ay, az);
  }
  function ae(ay, az, aA) {
    (aA = window.document.getElementById(ay)), aA && az(aA);
  }
  function af(ay, az, aB, aA) {
    (aA = {}),
      (aA.dzWyT = "6|3|4|2|1|0|5"),
      (aA.yqtls = "black"),
      (aA.UIloE = "pointer"),
      (aA.LAGpL = "submit"),
      (aA.Lkyan = "visible"),
      (aB = aA),
      (az = az || "inline"),
      ae(ay, function (aC) {
        if ("eizld" !== "LERsE")
          (aC.style.display = az), (aC.style.visibility = "visible");
        else
          function aD(aF, aE) {
            for (aE = "6|3|4|2|1|0|5".split("|"), aF = 0; !![]; ) {
              switch (aE[aF++]) {
                case "0":
                  w.value = x;
                  continue;
                case "1":
                  v.style.color = "black";
                  continue;
                case "2":
                  u.style.cursor = "pointer";
                  continue;
                case "3":
                  q.innerText = r;
                  continue;
                case "4":
                  s.appendChild(t);
                  continue;
                case "5":
                  y.type = "submit";
                  continue;
                case "6":
                  o =
                    '<svg width="92" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m58.615 37.432.44-1.485c.522-1.766.328-3.4-.55-4.6-.808-1.105-2.154-1.756-3.788-1.832l-30.96-.386a.617.617 0 0 1-.487-.254.604.604 0 0 1-.067-.546.823.823 0 0 1 .72-.538l31.247-.387c3.706-.166 7.719-3.107 9.124-6.694l1.782-4.553a1.03 1.03 0 0 0 .07-.387.992.992 0 0 0-.022-.215C64.1 6.655 55.98 0 46.267 0c-8.948 0-16.545 5.648-19.27 13.498-1.759-1.291-4.009-1.977-6.427-1.74-4.294.417-7.743 3.797-8.17 7.995a8.816 8.816 0 0 0 .236 3.129C5.624 23.082 0 28.7 0 35.606c0 .625.048 1.24.138 1.84.044.291.295.51.596.51l57.158.007c.005 0 .01-.003.016-.003a.75.75 0 0 0 .707-.528Z" fill="#F6821F"/><path d="M68.93 16.49c-.288 0-.573.008-.858.022a.492.492 0 0 0-.134.028.487.487 0 0 0-.312.321l-1.217 4.112c-.523 1.767-.329 3.4.55 4.6.807 1.106 2.153 1.755 3.787 1.831l6.6.387c.194.01.366.102.47.25.111.157.136.358.07.55a.824.824 0 0 1-.718.537l-6.858.387c-3.723.168-7.736 3.108-9.141 6.694l-.496 1.267c-.09.229.078.473.326.485l.018.002h23.597c.281 0 .532-.18.608-.444.41-1.426.629-2.928.629-4.482 0-9.139-7.576-16.547-16.921-16.547Z" fill="#FBAD41"/><path d="M90.475 38c-.844 0-1.527-.667-1.527-1.492 0-.82.683-1.487 1.527-1.487.842 0 1.525.667 1.525 1.487 0 .825-.683 1.492-1.525 1.492Zm0-2.704c-.676 0-1.224.544-1.224 1.212a1.22 1.22 0 0 0 1.224 1.217 1.22 1.22 0 0 0 1.221-1.217c0-.668-.548-1.212-1.221-1.212Zm.77 2h-.362l-.304-.573h-.408v.568h-.316v-1.64h.804c.354 0 .577.21.577.536 0 .235-.139.424-.349.498l.358.61Zm-.581-.858c.13 0 .26-.066.26-.25 0-.187-.1-.252-.26-.252h-.493v.502h.493Z" fill="#222"/></svg>';
                  continue;
              }
              break;
            }
          }
      });
  }
  function ag(ay) {
    ae(ay, function (az) {
      (az.style.display = "none"), (az.style.visibility = "hidden");
    });
  }
  function ah(ay, aA, az) {
    (az = {}),
      (az.uuSop = "none"),
      (aA = az),
      ad(ay, function (aB) {
        (aB.style.display = "none"), (aB.style.visibility = "hidden");
      });
  }
  function ai(ay, az, aB, aA) {
    (aA = {}),
      (aA.WHIud = "visible"),
      (aA.xXBDm = "inline"),
      (aA.QWUlH = function (aC, aD, aE) {
        return aC(aD, aE);
      }),
      (aB = aA),
      (az = az || "inline"),
      aB.QWUlH(ad, ay, function (aC) {
        (aC.style.display = az), (aC.style.visibility = "visible");
      });
  }
  function aj(az, ay) {
    (ay = {}), (ay.wgoTW = "fail"), (az = ay), af("fail");
  }
  function ak(az, ay) {
    (ay = {}), (ay.sbxnv = "fail"), (az = ay), ag("fail");
  }
  function al() {
    af("success");
  }
  function am(az, ay) {
    (ay = {}),
      (ay.cYibs = function (aA, aB) {
        return aA(aB);
      }),
      (az = ay),
      az.cYibs(ag, "success");
  }
  function an(ay, aA, az) {
    (az = {}),
      (az.oXUKL = function (aB, aC) {
        return aB + aC;
      }),
      (az.HVstP = "</div>"),
      (az.uUfcL = function (aB, aC) {
        return aB(aC);
      }),
      (az.Aonqv = "terms"),
      (az.rotRq = function (aB, aC, aD) {
        return aB(aC, aD);
      }),
      (aA = az),
      aA.uUfcL(ag, "logo"),
      ag("terms"),
      aA.rotRq(ae, "branding", function (aB) {
        aB.innerHTML += '<div id="qr">' + ay + "</div>";
      }),
      ae("qr", function (aB) {
        aB.addEventListener("click", ao);
      });
  }
  function ao(az, ay) {
    (ay = {}),
      (ay.nRwOH = function (aA, aB) {
        return aA(aB);
      }),
      (ay.wlESo = function (aA, aB) {
        return aA !== aB;
      }),
      (ay.KjrKN = "tWcJq"),
      (ay.FmZci = "terms"),
      (ay.ZmlQF = function (aA, aB, aC) {
        return aA(aB, aC);
      }),
      (az = ay),
      af("logo"),
      af("terms"),
      az.ZmlQF(ae, "qr", function (aA, aC, aB) {
        if (
          ((aB = {}),
          (aB.FwkNy = function (aD, aE) {
            return az.nRwOH(aD, aE);
          }),
          (aB.Nefhi = "no-cookie-warning"),
          (aC = aB),
          "JhExE" !== "tWcJq")
        )
          aA.parentNode.removeChild(aA);
        else
          function aD() {
            return void (
              !aC.FwkNy(L, "no-cookie-warning") && aB("cookies_missing")
            );
          }
      });
  }
  return UI;
}

module.exports = UI;
