#!/usr/bin/env python3
"""Tie every published figure back to data/model.json.

Drift between model.json and the HTML has been the recurring failure in this
repo: the JSON gets updated, one of five surfaces does not, and an investor
finds a table that fails its own arithmetic. Run this before regenerating the
PDFs and before any release.

    python3 scripts/tie-out.py
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
m = json.loads((ROOT / "data/model.json").read_text())
SURFACES = ["index.html", "dataroom.html",
            "scripts/docs/doc-faq.html", "scripts/docs/doc-market.html",
            "scripts/docs/doc-simulator.html"]
text = {f: (ROOT / f).read_text() for f in SURFACES}
fails, checks = [], 0


def must_not(pattern, why):
    """No surface may still carry a withdrawn figure."""
    global checks
    checks += 1
    for f, s in text.items():
        for mo in re.finditer(pattern, s):
            fails.append(f"{f}: {why} — found {mo.group(0)!r}")


def arithmetic(label, got, want, tol=0.01):
    global checks
    checks += 1
    if abs(got - want) > tol:
        fails.append(f"arithmetic: {label} — got {got:,.2f}, expected {want:,.2f}")


# --- 1. the model must be internally consistent -----------------------------
mf = m["modelForecast"]
streams = mf["revenueStreamsZAR"]
for i, y in enumerate(mf["years"]):
    arithmetic(f"{y} stream components sum to revenueZAR",
               sum(v["ZAR"][i] for v in streams.values()), mf["revenueZAR"][i], tol=1)
    arithmetic(f"{y} cost stack sums to costZAR",
               sum(v[i] for v in mf["costStackZAR"].values()), mf["costZAR"][i], tol=1)
    arithmetic(f"{y} revenue - cost = EBITDA",
               mf["revenueZAR"][i] - mf["costZAR"][i], mf["ebitdaZAR"][i], tol=1)
    arithmetic(f"{y} EBITDA margin",
               mf["ebitdaZAR"][i] / mf["revenueZAR"][i] * 100, mf["ebitdaMarginPct"][i], tol=0.1)

d, vm = m["deal"], m["valuationModel"]
arithmetic("post = pre + raise", d["preMoneyZAR"] + d["raiseZAR"], d["postMoneyZAR"], tol=1)
arithmetic("raise / post = equity% (equityPct is the rounded headline)",
           d["raiseZAR"] / d["postMoneyZAR"] * 100, d["equityPct"], tol=0.05)
mult = vm["nearTermMultiple"]
arithmetic("2029 milestone = 3.0x revenue", vm["milestonesZAR"]["2029"], mf["revenueZAR"][1] * mult, tol=1)
arithmetic("2032 milestone = 3.0x revenue", vm["milestonesZAR"]["2032"], mf["revenueZAR"][2] * mult, tol=1)
arithmetic("stake 2029 = exact equity x milestone",
           d["stake2029ZAR"],
           vm["milestonesZAR"]["2029"] * d["raiseZAR"] / d["postMoneyZAR"], tol=2)
arithmetic("multiple2029 = stake / raise",
           d["multiple2029"], d["stake2029ZAR"] / d["raiseZAR"], tol=0.01)
arithmetic("entry multiple = post / 2026 revenue",
           vm["entryMultipleImplied"], d["postMoneyZAR"] / mf["revenueZAR"][0], tol=0.05)

ins = m["insuranceModel"]
wavg = sum(t["entryUSD"] * t["mixPct"] / 100 for t in ins["ladder"])
claim = sum(t["prizeUSD"] * t["mixPct"] / 100 for t in ins["ladder"]) * ins["acePerAttempt"]
arithmetic("weighted average entry", wavg, ins["weightedAvgEntryUSD"], tol=0.01)
arithmetic("premium per entry", wavg * ins["premiumPctOfEntry"] / 100, ins["premiumPerEntryUSD"], tol=0.01)
arithmetic("expected claim per entry", claim, ins["expectedClaimPerEntryUSD"], tol=0.01)
arithmetic("loss ratio", claim / ins["premiumPerEntryUSD"] * 100, ins["lossRatioPct"], tol=0.1)
arithmetic("tier mix totals 100%", sum(t["mixPct"] for t in ins["ladder"]), 100)

# The retired-figure list below is hand-maintained and has collided three times
# with values that were later reinstated (2.74x, 5.42x, ~34%, R53.3m). Before
# adding a pattern, check it is not a number the model currently publishes;
# before removing one, check the value is genuinely back in model.json.

# --- 2. withdrawn figures must not survive anywhere -------------------------
for pat, why in [
    (r"R4\.0m for 10%|R36m pre|R40m post", "withdrawn R4m/10% round"),
    (r"2\.42×|12\.5×", "withdrawn round's returns"),
    (r"R147m|R807m", "pre-flattening milestones"),
    (r"Valuation \(2\.74|2\.74× revenue", "abandoned 2.74x REVENUE multiple (distinct from the 2.74x investor return)"),
    (r"R157\.7m|2\.96×|R396m|R132\.1m|R52\.6m", "superseded milestones"),
    (r"R177\.5m|R174\.6m|R371m|R365\.6m|R123\.7m|R121\.9m|R59\.2m|R58\.2m", "superseded v1/v2 milestones"),
    (r"3\.33×|3\.27×|6\.96×|6\.86×|4\.46×|4\.55×", "superseded v1/v2 multiples"),
    (r"9,715|18,465|104,946|199,474", "superseded v2 member and entry counts"),
    (r"R113\.1m|2\.12×|4\.76×|R37\.7m", "superseded pre-repricing figures"),
    (r"16\.9%|R47\.3m|R39\.3m|2\.74×|R129\.9m|6\.10×|3\.48×", "the 16.9% pricing, superseded"),
    (r"R47m post|R39m pre-money|2\.76×|6\.15×|2\.13%", "the 17% pricing, superseded"),
    (r"4\.77×", "the entry multiple from the superseded 2026-start model"),
    (r"billion-rand|R1bn|R333m", "the billion-rand horizon, removed on instruction"),
    (r"Strava|Peloton|Whoop", "comparable band that does not survive scrutiny"),
    (r"engaged-community businesses trade|below the bottom of that band", "the withdrawn comp-band claim"),
    (r"R36m pre|R42m pre|R39\.3m pre", "superseded pre-money figures"),

    (r"closest to the pin takes", "proximity claim the rig cannot verify"),
    (r"same stage as Ernie", "overclaims the terms Ernie came in on"),
    (r"22,886|9,720|2,130 subscribers", "superseded subscriber counts"),
    (r"60% EBITDA margin|50% EBITDA", "superseded per-stream margins"),
]:
    must_not(pat, why)

# --- 3. figures the page must actually carry --------------------------------
def unlimited_must_be_counterfactual():
    """"Unlimited" may appear only as the thing we explain we do NOT do."""
    global checks
    checks += 1
    ok = ("cannot", "533%", "would be", "not unlimited", "no one will write")
    for f, s in text.items():
        for mo in re.finditer(r"unlimited", s, re.I):
            # tags split sentences, so judge a window rather than a fragment
            window = s[max(0, mo.start() - 220): mo.end() + 220]
            if not any(k in window for k in ok):
                fails.append(f"{f}: 'unlimited' stated as a product claim, not a counterfactual "
                             f"— {window[200:320].strip()!r}")


unlimited_must_be_counterfactual()


def must_have(f, needle, why):
    global checks
    checks += 1
    if needle not in text[f]:
        fails.append(f"{f}: missing {why} — expected {needle!r}")

must_have("index.html", "R4.0m", "the trailing revenue disclosure")
must_have("index.html", "FORECAST", "the forecast label on the headline")
must_have("index.html", 'id="risk"', "the risk section")
must_have("index.html", "31.9%", "the insurance loss ratio")
must_have("index.html", "2.51×", "the breakeven ace multiple")
must_have("index.html", "533%", "the unlimited-swings counterfactual")
must_have("index.html", "four insured swings", "the capped allowance that makes the blend work")
must_have("index.html", "Cloud &amp; Things", "the technology partner")
must_have("index.html", "What your R1m buys", "the investor-rights block")
must_have("index.html", "Who buys this in 2032", "the exit narrative")
must_have("index.html", "4.5×", "the stressed LTV/CAC, not just the flattering one")
must_have("index.html", "2024 base", "the base year on the insurance-market stat")
must_have("index.html", "15%", "the equity")
must_have("index.html", "R53.3m", "the post-money")

must_have("index.html", "At 2.5×", "the multiple sensitivity, so 3.0x reads as a choice")
must_have("index.html", "Why R8m when the plan only draws", "the raise-size question, answered where it is asked")

# every published USD conversion must equal the ZAR figure at the stated FX
fx = m["fx"]
for zar_m, usd in re.findall(r"R([\d.]+)m<span class=\"usd\">≈ \$([\d.]+)m", text["index.html"]):
    checks += 1
    want = float(zar_m) / fx
    if abs(float(usd) - want) > 0.02:
        fails.append(f"index.html: R{zar_m}m converts to ${want:.2f}m at FX {fx}, page says ${usd}m")
for zar_m, usd_k in re.findall(r"R([\d.]+)m<span class=\"usd\">≈ \$(\d+)k", text["index.html"]):
    checks += 1
    want = float(zar_m) * 1000 / fx
    if abs(float(usd_k) - want) > 5:
        fails.append(f"index.html: R{zar_m}m converts to ${want:.0f}k at FX {fx}, page says ${usd_k}k")

print(f"tie-out: {checks} checks")
if fails:
    print(f"\n{len(fails)} FAILURES:\n")
    for x in fails:
        print("  ✗", x)
    sys.exit(1)
print("all clear — every published figure ties to data/model.json")
