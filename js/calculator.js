/* Investor return calculator. Pure math from data/model.json; the page-level
   disclaimer lives in the footer legal block. */

(function () {
  "use strict";
  var range = document.getElementById("calc-range");
  if (!range) return;

  var els = {
    amt: document.getElementById("calc-amt"),
    amtUsd: document.getElementById("calc-amt-usd"),
    stake: document.getElementById("calc-stake"),
    v2029: document.getElementById("calc-2029"),
    irr: document.getElementById("calc-irr"),
    v2032: document.getElementById("calc-2032")
  };

  function fmtR(v) {
    if (v >= 1e6) return "R" + (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "m";
    return "R" + Math.round(v).toLocaleString("en-ZA");
  }
  function fmtRFull(v) { return "R" + Math.round(v).toLocaleString("en-ZA"); }

  window.GL.model.then(function (m) {
    /* No fallback deal: if the model fails to load, leave the static HTML —
       which is correct and is the no-JS state — rather than render stale terms. */
    if (!m || !m.deal) return;
    var deal = m.deal;
    var fx = m.fx;

    function compute(amount) {
      var stakePct = (amount / deal.postMoneyZAR) * 100;
      var v2029 = amount * deal.multiple2029;
      var v2032 = amount * deal.multiple2032;
      /* 3.4 years: money in Q3 2026 to the 31 Dec 2029 milestone. */
      var irr = Math.pow(deal.multiple2029, 1 / 3.4) - 1;
      return { stakePct: stakePct, v2029: v2029, v2032: v2032, irr: irr };
    }

    // self-checks (console only)
    var t = compute(8000000);
    console.assert(Math.abs(t.stakePct - 15) < 1e-6, "stake math", t.stakePct);
    console.assert(Math.abs(t.v2029 - 8000000 * deal.multiple2029) < 1, "2029 math", t.v2029);
    console.assert(Math.abs(t.irr * 100 - deal.irr3yrPct) < 5, "IRR ~ stated", t.irr);

    function render() {
      var amount = Number(range.value);
      var r = compute(amount);
      els.amt.textContent = fmtRFull(amount);
      els.amtUsd.textContent = "≈ $" + Math.round(amount / fx).toLocaleString("en-US");
      els.stake.textContent = r.stakePct.toFixed(2) + "%";
      els.v2029.textContent = fmtR(r.v2029) + " · " + deal.multiple2029 + "×";
      els.irr.textContent = "~" + deal.irr3yrPct + "%";
      els.v2032.textContent = fmtR(r.v2032) + " · " + deal.multiple2032 + "×";
      range.setAttribute("aria-valuetext", fmtRFull(amount));
    }

    range.addEventListener("input", render);
    render();
  });
})();
