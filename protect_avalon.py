"""Build the password-protected Avalon Aero pages into static/avalon/.

Usage (from the repo root):
    python protect_avalon.py "<path to avalon-aero folder>" "<password>"

Each page (index, partners, contact) has its images inlined, then is encrypted
with AES-GCM using a key derived from the password (PBKDF2-SHA256). The 3D model
is encrypted into model.bin. Only encrypted data is written, so nothing readable
ends up in the public GitHub repo. Visitors unlock once per browser tab session.

To change the password, just run this again with a new one and publish.
Needs: pip install cryptography
"""
import base64, json, mimetypes, os, re, shutil, sys
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "static" / "avalon"
PAGES = ["index.html", "partners.html", "contact.html"]
MODEL = "models/Excalibur_Assembly.glb"
SWORD = ROOT / "avalon-sword.png"  # spinning sword on the password screen
ITERATIONS = 600_000


def derive_key(password, salt):
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITERATIONS)
    return kdf.derive(password.encode("utf-8"))


def encrypt(key, data):
    iv = os.urandom(12)
    return iv + AESGCM(key).encrypt(iv, data, None)


def inline_images(html, src_dir):
    def repl(m):
        path = src_dir / m.group(2)
        if not path.is_file():
            return m.group(0)
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        data = base64.b64encode(path.read_bytes()).decode()
        return f'{m.group(1)}data:{mime};base64,{data}{m.group(3)}'
    return re.sub(r'(src=["\'])(assets/[^"\']+)(["\'])', repl, html)


GATE = """<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>Avalon Aero · Private</title>
<style>
:root{--bg:#f6f6f4;--fg:#16181d;--muted:#6b6f78;--line:#d9dad6;--accent:#16181d;--err:#b42318}
@media (prefers-color-scheme:dark){:root{--bg:#0d0f13;--fg:#e9eaec;--muted:#8b909a;--line:#2a2e36;--accent:#e9eaec;--err:#f97066}}
*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--fg);font:15px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
main{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px 16px}
form{width:100%;max-width:340px}
h1{font:600 20px/1.3 system-ui,sans-serif;margin:0 0 4px;letter-spacing:.02em}
p{margin:0 0 20px;color:var(--muted);font-size:13px}
input{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:6px;background:transparent;color:var(--fg);font:inherit}
input:focus{outline:2px solid var(--accent);outline-offset:1px}
button{margin-top:10px;width:100%;padding:11px;border:0;border-radius:6px;background:var(--accent);color:var(--bg);font:inherit;font-weight:600;cursor:pointer}
button:disabled{opacity:.6;cursor:wait}
.err{min-height:20px;margin-top:10px;color:var(--err);font-size:13px}
.sword{width:100%;aspect-ratio:__SWORD_RATIO__;margin:0 0 28px;background:var(--fg);
  -webkit-mask:url(__SWORD__) center/contain no-repeat;mask:url(__SWORD__) center/contain no-repeat;
  animation:spin 3.2s linear infinite}
@keyframes spin{from{transform:perspective(700px) rotateX(0deg)}to{transform:perspective(700px) rotateX(360deg)}}
@media (prefers-reduced-motion:reduce){.sword{animation:none}}
</style></head>
<body><main><form id="f" hidden>
__SWORD_DIV__<h1>Avalon Aero</h1><p>This page is private. Enter the password to continue.</p>
<input id="pw" type="password" autocomplete="current-password" aria-label="Password" autofocus required>
<button id="go" type="submit">Unlock</button><div class="err" id="err" role="alert"></div>
</form></main>
<script>
const CFG = __CFG__;
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const KEY_SLOT = 'avalon-key';
async function deriveKey(pw) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2', hash:'SHA-256', salt:b64(CFG.salt), iterations:CFG.iter}, base, 256));
}
async function decrypt(raw, blob) {
  const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
  return new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM', iv:blob.slice(0,12)}, key, blob.slice(12)));
}
async function unlock(raw) {
  let html = new TextDecoder().decode(await decrypt(raw, b64(CFG.page)));
  if (CFG.model) {
    const res = await fetch(CFG.model);
    const glb = await decrypt(raw, new Uint8Array(await res.arrayBuffer()));
    const url = URL.createObjectURL(new Blob([glb], {type:'model/gltf-binary'}));
    html = html.split('__AVALON_MODEL_URL__').join(url);
  }
  try { sessionStorage.setItem(KEY_SLOT, btoa(String.fromCharCode(...raw))); } catch (e) {}
  // replacing the page before this one finishes loading leaves the gate's markup behind
  if (document.readyState !== 'complete') await new Promise(r => addEventListener('load', r, {once:true}));
  document.open(); document.write(html); document.close();
}
const form = document.getElementById('f'), pw = document.getElementById('pw'),
      go = document.getElementById('go'), err = document.getElementById('err');
form.addEventListener('submit', async e => {
  e.preventDefault(); go.disabled = true; err.textContent = ''; go.textContent = 'Unlocking…';
  try { await unlock(await deriveKey(pw.value)); }
  catch (x) { err.textContent = 'Wrong password.'; go.disabled = false; go.textContent = 'Unlock'; pw.select(); }
});
(async () => {
  let saved = null;
  try { saved = sessionStorage.getItem(KEY_SLOT); } catch (e) {}
  if (saved) { try { await unlock(b64(saved)); return; } catch (e) { try { sessionStorage.removeItem(KEY_SLOT); } catch (x) {} } }
  form.hidden = false; pw.focus();
})();
</script></body></html>
"""


def gate_html():
    if not SWORD.is_file():
        return GATE.replace("__SWORD_DIV__", "")
    from struct import unpack
    data = SWORD.read_bytes()
    w, h = unpack(">II", data[16:24])  # PNG width/height
    uri = "data:image/png;base64," + base64.b64encode(data).decode()
    return (GATE.replace("__SWORD_DIV__", '<div class="sword" aria-hidden="true"></div>\n')
                .replace("__SWORD_RATIO__", f"{w}/{h}").replace("__SWORD__", uri))


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src, password = Path(sys.argv[1]), sys.argv[2]
    salt = os.urandom(16)
    key = derive_key(password, salt)
    # clear old files (not the folder itself, which OneDrive may hold open)
    OUT.mkdir(parents=True, exist_ok=True)
    for f in OUT.iterdir():
        shutil.rmtree(f) if f.is_dir() else f.unlink()

    model_src = src / MODEL
    if model_src.is_file():
        (OUT / "model.bin").write_bytes(encrypt(key, model_src.read_bytes()))

    for name in PAGES:
        html = (src / name).read_text(encoding="utf-8")
        html = inline_images(html, src)
        has_model = MODEL in html
        if has_model:
            html = html.replace(MODEL, "__AVALON_MODEL_URL__")
        # keep the private pages out of search engines once unlocked, too
        html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex,nofollow,noarchive">', 1)
        cfg = {
            "salt": base64.b64encode(salt).decode(),
            "iter": ITERATIONS,
            "page": base64.b64encode(encrypt(key, html.encode("utf-8"))).decode(),
            "model": "model.bin" if has_model else None,
        }
        (OUT / name).write_text(gate_html().replace("__CFG__", json.dumps(cfg)), encoding="utf-8")
        print(f"ok  {name}{'  (+ model)' if has_model else ''}")
    print(f"\nWrote {OUT}")


if __name__ == "__main__":
    main()
