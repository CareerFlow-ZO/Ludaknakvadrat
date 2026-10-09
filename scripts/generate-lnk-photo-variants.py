#!/usr/bin/env python3
"""Create smaller LNK DIGITAL photograph variants without touching original images."""
from pathlib import Path
from PIL import Image

PHOTO_NAMES = (
    "hero", "strategy", "artdirection", "business", "redesign", "seo",
    "discover", "design", "build", "launch", "positioning", "mobile", "growth"
)
ROOT = Path("assets/photos")

for name in PHOTO_NAMES:
    source = ROOT / f"{name}.webp"
    target = ROOT / f"{name}-600.webp"
    if not source.is_file():
        raise SystemExit(f"Source image missing: {source}")
    with Image.open(source) as image:
        image.load()
        if image.width < 600:
            raise SystemExit(f"Unexpectedly narrow image: {source}: {image.size}")
        height = round(image.height * 600 / image.width)
        image = image.resize((600, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=82, method=6)
        print(f"{source.name} -> {target.name}: {target.stat().st_size} bytes ({600}x{height})")

print(f"Generated {len(PHOTO_NAMES)} responsive LNK variants; originals unchanged.")
