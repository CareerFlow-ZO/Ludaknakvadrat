#!/usr/bin/env python3
"""Build compressed WebP portfolio previews for LNK DIGITAL (preserve PNG originals)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path("assets/previews")
FILES = ("beauty", "barbershop", "auto")
WIDTHS = (720, None)
for name in FILES:
    source = ROOT / (name + ".png")
    if not source.is_file():
        raise SystemExit("Source image missing: " + str(source))
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.load()
        if image.width < 720 or image.height < 400:
            raise SystemExit("Unexpected source dimensions: " + str(source))
        image = image.convert("RGB")
        for width in WIDTHS:
            w = width or image.width
            output = image if w == image.width else image.resize(
                (w, round(image.height * w / image.width)), Image.Resampling.LANCZOS
            )
            suffix = "-720" if width else ""
            target = ROOT / (name + suffix + ".webp")
            output.save(target, "WEBP", quality=86, method=6)
            if target.stat().st_size >= source.stat().st_size:
                raise SystemExit("WebP not smaller than PNG: " + str(target))
            print(f"{source.name} ({source.stat().st_size} B) -> {target.name} ({target.stat().st_size} B); {output.size}")
print("Six LNK portfolio WebPs created; all original PNGs remain unchanged.")
