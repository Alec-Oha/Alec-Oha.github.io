"""Download book covers into static/images/books/<id>.jpg.

Run from the repo root:  python fetch_covers.py
  --force       re-download covers that already exist
  --only ID ... only fetch these book ids

Reads book entries from themes/alec/static/js/books.js. Tries Open Library first,
then Google Books. Resizes to 400px wide if Pillow is installed (pip install pillow).
To override a bad cover, drop your own JPG at static/images/books/<id>.jpg.
"""
import json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BOOKS_JS = ROOT / "themes/alec/static/js/books.js"
OUT = ROOT / "static/images/books"
UA = {"User-Agent": "alecohanesian.com cover fetcher (AlecOhanesian@gmail.com)"}

def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        data = r.read()
    return data if binary else json.loads(data)

def field(entry, name):
    m = re.search(name + r""":(['"])(.*?)\1""", entry)
    return m.group(2) if m else None

def parse_books():
    src = BOOKS_JS.read_text(encoding="utf-8")
    books = []
    for line in src.splitlines():
        line = line.strip()
        if not line.startswith("{id:"):
            continue
        title = field(line, "title")
        series = re.search(r"series:\[\s*(['\"])(.*?)\1", line)
        if series:  # series/omnibus names rarely have covers; use book 1
            title = series.group(2)
        else:
            title = re.sub(r"\s+(series|trilogy)$", "", title, flags=re.I)
        books.append({"id": field(line, "id"), "title": title, "author": field(line, "author")})
    return books

def open_library(title, author):
    q = {"title": title, "limit": 1, "fields": "cover_i"}
    if author:
        q["author"] = author
    data = get("https://openlibrary.org/search.json?" + urllib.parse.urlencode(q))
    docs = data.get("docs") or []
    cid = docs[0].get("cover_i") if docs else None
    return f"https://covers.openlibrary.org/b/id/{cid}-L.jpg?default=false" if cid else None

def google_books(title, author):
    q = f"intitle:{title}" + (f" inauthor:{author}" if author else "")
    data = get("https://www.googleapis.com/books/v1/volumes?" + urllib.parse.urlencode({"q": q, "maxResults": 1}))
    links = ((data.get("items") or [{}])[0].get("volumeInfo") or {}).get("imageLinks") or {}
    url = links.get("thumbnail") or links.get("smallThumbnail")
    return url.replace("http:", "https:").replace("&edge=curl", "") if url else None

def find_cover(b):
    last = b["author"].split()[-1]
    for fn, author in ((open_library, last), (open_library, None), (google_books, last), (google_books, None)):
        try:
            url = fn(b["title"], author)
            if url:
                return url
        except Exception:
            pass
        time.sleep(0.4)
    return None

def save(data, path):
    try:
        from PIL import Image
        import io
        im = Image.open(io.BytesIO(data)).convert("RGB")
        if im.width > 400:
            im = im.resize((400, round(im.height * 400 / im.width)), Image.LANCZOS)
        im.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    except ImportError:
        path.write_bytes(data)

def main():
    args = sys.argv[1:]
    force = "--force" in args
    only = set(args[args.index("--only") + 1:]) if "--only" in args else None
    OUT.mkdir(parents=True, exist_ok=True)
    missing = []
    for b in parse_books():
        if only and b["id"] not in only:
            continue
        path = OUT / f"{b['id']}.jpg"
        if path.exists() and not force:
            print(f"skip   {b['id']}")
            continue
        url = find_cover(b)
        if not url:
            print(f"MISS   {b['id']}  ({b['title']})")
            missing.append(b["id"])
            continue
        try:
            save(get(url, binary=True), path)
            print(f"ok     {b['id']}")
        except Exception as e:
            print(f"FAIL   {b['id']}  {e}")
            missing.append(b["id"])
        time.sleep(0.4)
    if missing:
        print("\nAdd these manually as static/images/books/<id>.jpg:\n  " + "\n  ".join(missing))

if __name__ == "__main__":
    main()
