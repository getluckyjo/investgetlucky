/* Investor return calculator. Pure math from data/model.json; the disclaimer
   node (#calc-note) is part of the component and must stay attached. */

(function () {
  "use strict";
  var range = document.getElementById("calc-range");
  if (!range) return;

  var els = {
    amt: document.getElementById("calc-amt"),
    amtUsd: document.getElementById("calc-amt-usd"),
    stake: document.getElementById("calc-stake"),
    v2028: document.getElementById("calc-2028"),
    irr: document.getElementById("calc-irr"),
    v2032: document.getElementById("calc-2032")
  };

  function fmtR(v) {
    if (v >= 1e6) return "R" + (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "m";
    return "R" + Math.round(v).toLocaleString("en-ZA");
  }
  function fmtRFull(v) { return "R" + Math.round(v).toLocaleString("en-ZA"); }

  window.GL.model.then(function (m) {
    var deal = m ? m.deal : {
      postMoneyZAR: 40000000, multiple2028: 2.42, multiple2032: 12.5, irr3yrPct: 30
    };
    var fx = m ? m.fx : 18.5;

    function compute(amount) {
      var stakePct = (amount / deal.postMoneyZAR) * 100;
      var v2028 = amount * deal.multiple2028;
      var v2032 = amount * deal.multiple2032;
      // IRR sanity: multiple2028^(1/3) - 1 should approximate the stated IRR
      var irr = Math.pow(deal.multiple2028, 1 / 3) - 1;
      return { stakePct: stakePct, v2028: v2028, v2032: v2032, irr: irr };
    }

    // self-checks (console only)
    var t = compute(4000000);
    console.assert(Math.abs(t.stakePct - 10) < 1e-9, "stake math", t.stakePct);
    console.assert(Math.abs(t.v2028 - 9680000) < 1, "2028 math", t.v2028);
    console.assert(Math.abs(t.irr * 100 - deal.irr3yrPct) < 5, "IRR ≈ stated", t.irr);

    function render() {
      var amount = Number(range.value);
      var r = compute(amount);
      els.amt.textContent = fmtRFull(amount);
      els.amtUsd.textContent = "≈ $" + Math.round(amount / fx).toLocaleString("en-US");
      els.stake.textContent = r.stakePct.toFixed(2) + "%";
      els.v2028.textContent = fmtR(r.v2028) + " · " + deal.multiple2028 + "×";
      els.irr.textContent = "~" + deal.irr3yrPct + "%";
      els.v2032.textContent = fmtR(r.v2032) + " · " + deal.multiple2032 + "×";
      range.setAttribute("aria-valuetext", fmtRFull(amount));
    }

    range.addEventListener("input", render);
    render();
  });
})();
