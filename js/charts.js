/* Get Lucky pitch — charts. Data: data/model.json (single source of truth).
   Palette (validated for CVD + contrast on the card surface):
     series green #478f41 · series gold #b07c10 · ink #182716
   Brand deep green stays for text/UI; these are data-mark variants. */

(function () {
  "use strict";
  if (typeof Chart === "undefined") return;

  var GREEN = "#478f41";
  var GOLD = "#b07c10";
  var INK = "#182716";
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
      var years = m.deckForecast.years;
      var rev = m.deckForecast.revenueZAR;
      var marginPct = m.deckForecast.ebitdaMarginPct;
      var ebitda = rev.map(function (r, i) { return Math.round(r * marginPct[i] / 100); });
      var marginLabel = {
        id: "marginLabel",
        afterDatasetsDraw: function (chart) {
          var ctx = chart.ctx;
          var meta = chart.getDatasetMeta(1);
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
            { label: "Revenue", data: rev, backgroundColor: GREEN, borderRadius: 4, maxBarThickness: 56 },
            { label: "EBITDA (margin shown)", data: ebitda, backgroundColor: GOLD, borderRadius: 4, maxBarThickness: 56 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { boxWidth: 12, boxHeight: 12 } },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  var s = ctx.dataset.label.split(" ")[0] + ": " + fmtR(ctx.parsed.y);
                  if (ctx.datasetIndex === 1) s += " (" + marginPct[ctx.dataIndex] + "% margin)";
                  return s;
                }
              }
            }
          },
          scales: baseScales(function (v) { return fmtR(v); })
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
