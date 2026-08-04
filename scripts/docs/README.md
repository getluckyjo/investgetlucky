# Dataroom document sources

`doc-faq.html`, `doc-market.html` and `doc-simulator.html` (+ `doc-style.css`)
generate the three Get Lucky dataroom PDFs, styled to match the Ernie
one-pagers. To regenerate:

1. Serve the repo root (the docs load the logo from it):
   `python3 -m http.server 8123`
2. Print each HTML to PDF with headless Chromium:

   ```
   chrome --headless --no-sandbox --no-pdf-header-footer \
     --print-to-pdf=out.pdf http://localhost:8123/scripts/docs/<doc>.html
   ```

   Page geometry (A4, margins 16mm top / 15mm bottom / 19mm sides) comes from
   the `@page` rule in `doc-style.css`, so no margin flags are needed. If you
   drive it through Playwright instead, pass `printBackground: true` and let
   the stylesheet set the size.
3. Copy the output over `assets/docs/get-lucky-investor-faq.pdf`,
   `assets/docs/get-lucky-market-analysis.pdf` and
   `assets/docs/get-lucky-simulator-channel.pdf`.

Keep figures in sync with `data/model.json` and `data/research.json`.

Note the layering rule: `modelForecast.revenueZAR` is the base plan and
`simRevenueZAR` is the simulator channel. Every document reports them
separately — never publish only the total.
