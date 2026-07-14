# Get Lucky Golf × Ernie Els — Investment Pitch Site

Static site (no build step). `index.html` is the public pitch; `dataroom.html` is the
NDA-gated dataroom. Deploy by pointing Vercel at this repo — `vercel.json` already
sets noindex headers on the dataroom and documents.

## Editing numbers

Every key figure lives in **`data/model.json`** (deal terms, traction, forecasts,
subscriber model). Charts and the investor calculator read it at runtime — edit the
JSON and the charts/calculator update. The same numbers appear in the HTML copy as
static text, so after changing the JSON, search `index.html` for the old value to
keep prose in sync.

Every **external market claim** (golfer counts, market sizes) lives in
**`data/research.json`** with its named source and URL. The dataroom's
"Sources & citations" section renders straight from this file.

## Structure

```
index.html        public pitch (single scroll)
dataroom.html     NDA wall + gated documents
css/styles.css    design system — brand tokens at the top
js/main.js        reveal animations, counters, model loader
js/charts.js      Chart.js charts (vendored: vendor/chart.umd.min.js)
js/calculator.js  investor return calculator
js/nda.js         NDA gate (client-side session; see below)
data/model.json   canonical numbers
data/research.json  cited market claims
assets/img/       brand art extracted from the PDFs
assets/docs/      dataroom document copies
scripts/extract-assets.py  re-runs the PDF asset extraction (pip install pymupdf)
```

## NDA recording

`js/nda.js` gates the dataroom client-side (deterrent + audit trail, not real
authentication). Signatures are stored in the visitor's browser; to receive them,
set `NDA_ENDPOINT` at the top of `js/nda.js` to a Formspree/getform-style URL —
every acceptance is then POSTed there as JSON (name, email, company, timestamp).

## Assets wanted (placeholder slots ready)

| Slot | Where | What to supply |
|---|---|---|
| Ernie pull-quote | Ernie section | a real quote from Ernie |
| `app-entry` / `app-verify` / `app-winner` | How it works | app demo screens, 9:19.5 |
| Wide video slot | How it works (optional) | ace/winner reel, 16:9 |
| Allocation meter | Deal section | set `deal.allocation` in `data/model.json` (`show: true`, `committedZAR`, `closeDate`) |
| 3-year cashflow PDF | Dataroom | referenced in deck slide 9, not yet in repo |

## Regenerating extracted assets

```
pip install pymupdf pillow
python3 scripts/extract-assets.py     # raw pulls land in assets/img/raw (gitignored)
```
