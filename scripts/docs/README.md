# Dataroom document sources

`doc-faq.html` and `doc-market.html` (+ `doc-style.css`) generate the two
Get Lucky dataroom PDFs, styled to match the Ernie one-pagers. To regenerate:

1. Serve the repo root (the docs load the logo from it):
   `python3 -m http.server 8123`
2. Print each HTML to PDF with headless Chromium/Playwright:
   A4, margins 16mm top / 15mm bottom / 19mm sides, printBackground: true.
3. Copy the output over `assets/docs/get-lucky-investor-faq.pdf` and
   `assets/docs/get-lucky-market-analysis.pdf`.

Keep figures in sync with `data/model.json` and `data/research.json`.
