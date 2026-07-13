#!/usr/bin/env python3
"""Extract brand assets from the Get Lucky source PDFs.

Usage:
    pip install pymupdf pillow
    python3 scripts/extract-assets.py [--out assets/img/raw]

Pulls every embedded image out of the source PDFs (logos, founder photos,
course badges, hero photography) and renders each deck slide at 150 dpi as
design reference. Raw output needs a manual pass: rename the keepers into
assets/img/ with semantic names, delete the rest.
"""
import argparse
import pathlib
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF missing — run: pip install pymupdf")

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDFS = [
    "the-get-lucky-deck-2025.pdf",
    "Get Lucky App Market Analysis.pdf",
    "Ernie_Partnership_OnePager_1.pdf",
    "Ernie_Commercial_OnePager_1.pdf",
    "Get Lucky Investor FAQ (1).pdf",
]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="assets/img/raw")
    args = ap.parse_args()
    out = ROOT / args.out
    imgdir = out / "images"
    slidedir = out / "slides"
    imgdir.mkdir(parents=True, exist_ok=True)
    slidedir.mkdir(parents=True, exist_ok=True)

    for pdf_name in PDFS:
        pdf_path = ROOT / pdf_name
        if not pdf_path.exists():
            print(f"skip (missing): {pdf_name}")
            continue
        stem = pdf_name.replace(" ", "_").rsplit(".", 1)[0][:24]
        doc = fitz.open(pdf_path)
        seen: set[int] = set()
        for pno, page in enumerate(doc, start=1):
            for idx, img in enumerate(page.get_images(full=True)):
                xref = img[0]
                if xref in seen:
                    continue
                seen.add(xref)
                pix = fitz.Pixmap(doc, xref)
                if pix.colorspace and pix.colorspace.n > 3:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                dest = imgdir / f"{stem}_p{pno:02d}_{idx:02d}.png"
                pix.save(dest)
                print(f"image  {dest.relative_to(ROOT)}  {pix.width}x{pix.height}")
            # 150 dpi slide renders, deck only (design reference / og-image source)
            if pdf_name.startswith("the-get-lucky-deck"):
                mat = fitz.Matrix(150 / 72, 150 / 72)
                page.get_pixmap(matrix=mat).save(slidedir / f"slide_{pno:02d}.png")
        doc.close()
    print(f"\ndone → {out.relative_to(ROOT)} (rename keepers into assets/img/, delete the rest)")


if __name__ == "__main__":
    main()
