/* Get Lucky pitch — interactions: scroll reveal + hero stat counters.
   All figures come from data/model.json (loaded by charts/calculator);
   static markup carries the same values as no-JS fallback. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- scroll reveal -------------------------------------------------------
  var revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // --- hero stat counters ---------------------------------------------------
  var counters = document.querySelectorAll("[data-count]");
  function animate(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = (String(el.getAttribute("data-count")).split(".")[1] || "").length;
    var t0 = null;
    var DURATION = 1400;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / DURATION, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = decimals > 0
        ? (target * eased).toFixed(decimals)
        : Math.round(target * eased).toLocaleString("en-US");
      el.textContent = prefix + v + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // --- shared model loader (used by charts.js / calculator.js) --------------
  window.GL = window.GL || {};
  window.GL.model = fetch("data/model.json")
    .then(function (r) { if (!r.ok) throw new Error("model.json " + r.status); return r.json(); })
    .catch(function (err) {
      console.warn("model.json unavailable — static fallbacks remain", err);
      return null;
    });
  window.GL.fmtR = function (v, opts) {
    opts = opts || {};
    if (v >= 1e6) return "R" + (v / 1e6).toFixed(opts.dp != null ? opts.dp : (v % 1e6 === 0 ? 0 : 2)).replace(/\.00$/, "") + "m";
    if (v >= 1e3) return "R" + Math.round(v / 1e3) + "k";
    return "R" + Math.round(v);
  };
  // --- allocation meter (renders only with real values in model.json) -------
  window.GL.model.then(function (m) {
    if (!m || !m.deal || !m.deal.allocation || !m.deal.allocation.show) return;
    var alloc = m.deal.allocation;
    var meter = document.getElementById("allocation-meter");
    if (!meter || alloc.committedZAR == null) return;
    var pct = Math.max(0, Math.min(100, (alloc.committedZAR / m.deal.raiseZAR) * 100));
    document.getElementById("allocation-fill").style.flex = String(pct);
    document.getElementById("allocation-fill").textContent = Math.round(pct) + "% committed";
    document.getElementById("allocation-rest").style.flex = String(100 - pct);
    var txt = "R" + (alloc.committedZAR / 1e6).toFixed(2).replace(/\.?0+$/, "") + "m of R4m committed";
    if (alloc.closeDate) txt += " · round closes " + alloc.closeDate;
    document.getElementById("allocation-text").textContent = txt;
    meter.hidden = false;
  });

  window.GL.fmtUSD = function (zar, fx) {
    var usd = zar / fx;
    if (usd >= 1e6) return "$" + (usd / 1e6).toFixed(2) + "m";
    if (usd >= 1e3) return "$" + Math.round(usd / 1e3) + "k";
    return "$" + Math.round(usd);
  };
})();
