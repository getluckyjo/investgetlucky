/* Get Lucky pitch — charts. Data: data/model.json (single source of truth).
   Palette (validated for CVD + contrast on the card surface):
     series green #478f41 · series gold #b07c10 · ink #16261a
   Brand deep green stays for text/UI; these are data-mark variants. */

(function () {
  "use strict";
  if (typeof Chart === "undefined") return;

  var GREEN = "#478f41";
  var GREEN_LIGHT = "#8fc089"; /* second revenue stream — same family, clear luminance step */
  var TEAL = "#2f6f6b";  /* third revenue stream — distinct hue, CVD-safe against both greens */
  var SAND = "#7d8f5a";  /* fourth revenue stream — olive, separable from both greens and the teal */
  var GOLD = "#b07c10";
  var INK = "#16261a";
  var GRID = "rgba(24, 39, 22, 0.08)";
  var FONT = { family: "Inter, 'Helvetica Neue', Arial, sans-serif", size: 12 };

  Chart.defaults.font = FONT;
  Chart.defaults.color = "rgba(24, 39, 22, 0.72)";

  function fmtR(v) {
    if (v >= 1e6) return "R" + (v / 1e6).toFixed(v % 1e6 === 0 ? 0 : 1) + "m";
    if (v >= 1e3) return "R" + Math.round(v / 1e3) + "k";
    return "R" + v;
  }

  function box(id, h) {
    var c = document.getElementById(id);
    if (!c) return null;
    c.parentElement.style.height = h + "px";
    return c;
  }

  var baseScales = function (yFmt) {
    return {
      x: { grid: { display: false }, border: { color: GRID } },
      y: {
        grid: { color: GRID }, border: { display: false },
        ticks: { callback: yFmt, maxTicksLimit: 6 },
        beginAtZero: true
      }
    };
  };

  window.GL.model.then(function (m) {
    if (!m) return;

    /* --- 1. traction sparkline: Jul–Dec 2025 ------------------------------ */
    (function () {
      var c = box("chart-traction", 220);
      if (!c) return;
      var start = m.traction.monthlyRevenueZAR["2025-07"];
      var end = m.traction.monthlyRevenueZAR["2025-12"];
      var months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var ratio = Math.pow(end / start, 1 / (months.length - 1));
      var data = months.map(function (_, i) { return Math.round(start * Math.pow(ratio, i)); });
      data[months.length - 1] = end;
      new Chart(c, {
        type: "line",
        data: {
          labels: months,
          datasets: [{
            label: "Monthly revenue",
            data: data,
            borderColor: GREEN,
            borderWidth: 2,
            pointRadius: function (ctx) { return ctx.dataIndex === 0 || ctx.dataIndex === months.length - 1 ? 4 : 0; },
            pointHoverRadius: 5,
            pointBackgroundColor: GREEN,
            fill: { target: "origin" },
            backgroundColor: "rgba(71, 143, 65, 0.10)",
            tension: 0.35
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: function (ctx) { return fmtR(ctx.parsed.y) + (ctx.dataIndex > 0 && ctx.dataIndex < months.length - 1 ? " (interpolated)" : ""); } } }
          },
          scales: baseScales(function (v) { return fmtR(v); })
        }
      });
    })();

    /* --- 2. subscriber ramp: 36 months ------------------------------------ */
    (function () {
      var c = box("chart-subs", 260);
      if (!c) return;
      var subs = m.valuationModel.subsMonthly;
      var labels = subs.map(function (_, i) { return "M" + (i + 1); });
      new Chart(c, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Subscribers",
            data: subs,
            borderColor: GREEN,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHitRadius: 12,
            fill: { target: "origin" },
            backgroundColor: "rgba(71, 143, 65, 0.10)",
            tension: 0.25
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: function (items) {
                  var i = items[0].dataIndex;
                  return "Month " + (i + 1) + " (year " + (Math.floor(i / 12) + 1) + ")";
                },
                label: function (ctx) { return ctx.parsed.y.toLocaleString("en-ZA") + " subscribers"; }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false }, border: { color: GRID },
              ticks: {
                maxRotation: 0,
                callback: function (v, i) { return (i + 1) % 12 === 0 ? "Year " + ((i + 1) / 12) : null; }
              }
            },
            y: {
              grid: { color: GRID }, border: { display: false }, beginAtZero: true,
              ticks: { callback: function (v) { return v.toLocaleString("en-ZA"); }, maxTicksLimit: 6 }
            }
          }
        }
      });
    })();

    /* --- 3. revenue & EBITDA (both in R — one axis; margin % as labels) ---- */
    (function () {
      var c = box("chart-pnl", 260);
      if (!c) return;
      var years = m.modelForecast.years;
      var streams = m.modelForecast.revenueStreamsZAR;
      var courses = streams.coursesAndApp.ZAR;
      var sim = streams.simulators.ZAR;
      var spon = streams.territorySponsorship.ZAR;
      var ups = streams.inPlayUpsells.ZAR;
      var total = m.modelForecast.revenueZAR;
      var marginPct = m.modelForecast.ebitdaMarginPct;
      var ebitda = m.modelForecast.ebitdaProxyZAR;
      /* Revenue stacked by stream — this is one plan's composition, courses and app
         alongside simulators, not a base case with an optional extra on top. */
      var marginLabel = {
        id: "marginLabel",
        afterDatasetsDraw: function (chart) {
          var ctx = chart.ctx;
          var meta = chart.getDatasetMeta(4);
          ctx.save();
          ctx.font = "700 12px " + FONT.family;
          ctx.fillStyle = INK;
          ctx.textAlign = "center";
          meta.data.forEach(function (bar, i) {
            ctx.fillText(marginPct[i] + "%", bar.x, bar.y - 6);
          });
          ctx.restore();
        }
      };
      new Chart(c, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            { label: "Courses & app subscription", data: courses, backgroundColor: GREEN, stack: "rev", borderRadius: 4, maxBarThickness: 56 },
            { label: "Simulators", data: sim, backgroundColor: GREEN_LIGHT, stack: "rev", borderRadius: 4, maxBarThickness: 56 },
            { label: "Territory sponsorship", data: spon, backgroundColor: TEAL, stack: "rev", borderRadius: 4, maxBarThickness: 56 },
            { label: "In-play upsells", data: ups, backgroundColor: SAND, stack: "rev", borderRadius: 4, maxBarThickness: 56 },
            { label: "EBITDA (margin shown)", data: ebitda, backgroundColor: GOLD, stack: "ebitda", borderRadius: 4, maxBarThickness: 56 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 12, boxHeight: 12 } },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  var s = ctx.dataset.label + ": " + fmtR(ctx.parsed.y);
                  if (ctx.datasetIndex === 4) s += " (" + marginPct[ctx.dataIndex] + "% margin)";
                  return s;
                },
                footer: function (items) {
                  var i = items[0].dataIndex;
                  return "Total revenue: " + fmtR(total[i]);
                }
              }
            }
          },
          scales: {
            x: { stacked: true, grid: { display: false }, border: { color: GRID } },
            y: {
              stacked: true, grid: { color: GRID }, border: { display: false },
              ticks: { callback: function (v) { return fmtR(v); }, maxTicksLimit: 6 },
              beginAtZero: true
            }
          }
        },
        plugins: [marginLabel]
      });
    })();

    /* --- 4. valuation bridge ------------------------------------------------ */
    (function () {
      var c = box("chart-bridge", 240);
      if (!c) return;
      var ms = m.valuationModel.milestonesZAR;
      var labels = ["2026 — this round", "2029 — 3-year plan", "2032 — exit vision"];
      var vals = [ms["2026"], ms["2029"], ms["2032"]];
      var valueLabel = {
        id: "valueLabel",
        afterDatasetsDraw: function (chart) {
          var ctx = chart.ctx;
          var meta = chart.getDatasetMeta(0);
          ctx.save();
          ctx.font = "700 13px " + FONT.family;
          ctx.fillStyle = INK;
          meta.data.forEach(function (bar, i) {
            ctx.textAlign = "left";
            ctx.fillText(fmtR(vals[i]), bar.x + 8, bar.y + 4);
          });
          ctx.restore();
        }
      };
      new Chart(c, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{ label: "Company valuation", data: vals, backgroundColor: GREEN, borderRadius: 4, maxBarThickness: 40 }]
        },
        options: {
          indexAxis: "y",
          responsive: true, maintainAspectRatio: false,
          layout: { padding: { right: 70 } },
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: function (ctx) { return fmtR(ctx.parsed.x); } } }
          },
          scales: {
            x: {
              grid: { color: GRID }, border: { display: false }, beginAtZero: true,
              ticks: { callback: function (v) { return fmtR(v); }, maxTicksLimit: 6 }
            },
            y: { grid: { display: false }, border: { color: GRID } }
          }
        },
        plugins: [valueLabel]
      });
    })();
  });
})();
