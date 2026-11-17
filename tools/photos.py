#!/usr/bin/env python3
"""unMute photo publisher.

  python3 tools/photos.py          make the dump folders (safe to rerun)
  python3 tools/photos.py publish  resize everything in photos/ into img/ and update data.js

Dump folders:  photos/<edition>/<artist-slug>/   and   photos/<edition>/_group/
Order inside an artist folder is by file name:
  1st  card photo + top of the artist page
  2nd  shown when you hover the card
  3rd  photo in the About panel (falls back to 2nd, then 1st)
Anything in a folder replaces that artist's current photos. Empty folders change nothing,
so it is safe to run on a laptop that doesn't have the raw photos.
"""
import os, re, sys, json, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP, OUT, DATA = os.path.join(ROOT, 'photos'), os.path.join(ROOT, 'img'), os.path.join(ROOT, 'data.js')
EXT = ('.jpg', '.jpeg', '.png', '.heic', '.webp', '.tif', '.tiff')
START, END = '/* LOCAL PHOTOS: written by tools/photos.py, do not edit */', '/* END LOCAL PHOTOS */'

def lineup():
    js = open(DATA).read()
    eds = re.findall(r"\bid:\s*'([a-z0-9-]+)'", js)
    arts = re.findall(r"slug:\s*'([a-z0-9-]+)'[^}]*?\bed:\s*'([a-z0-9-]+)'", js, re.S)
    return eds, arts

def make_folders():
    eds, arts = lineup()
    for e in eds: os.makedirs(os.path.join(DUMP, e, '_group'), exist_ok=True)
    for slug, e in arts: os.makedirs(os.path.join(DUMP, e, slug), exist_ok=True)
    print('folders ready in photos/ for', len(eds), 'editions and', len(arts), 'artists')

def resize(src, dst, edge):   # only ever shrinks, never blows a small photo up
    info = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', src], capture_output=True, text=True).stdout
    big = max([int(n) for n in re.findall(r'pixel(?:Width|Height): (\d+)', info)] or [0])
    size = ['-Z', str(edge)] if big > edge else []
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '80'] + size + [src, '--out', dst],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def publish():
    eds, arts = lineup()
    found = {'artists': {}, 'groups': {}}
    def kept(e, prefix):   # photos already in img/ from an earlier publish (maybe on another laptop)
        d = os.path.join(OUT, e)
        return sorted('img/%s/%s' % (e, f) for f in os.listdir(d) if re.match(re.escape(prefix) + r'(-\d+)?\.jpg$', f)) if os.path.isdir(d) else []
    def clear(e, prefix):
        for f in kept(e, prefix): os.remove(os.path.join(ROOT, f))
    def files(d):
        return sorted(f for f in os.listdir(d) if f.lower().endswith(EXT)) if os.path.isdir(d) else []
    for e in eds:
        g = files(os.path.join(DUMP, e, '_group'))
        if not g:
            if kept(e, 'group'): found['groups'][e] = kept(e, 'group')[0]
            continue
        if g:
            os.makedirs(os.path.join(OUT, e), exist_ok=True)
            out = 'img/%s/group.jpg' % e
            resize(os.path.join(DUMP, e, '_group', g[0]), os.path.join(ROOT, out), 2400)
            found['groups'][e] = out
    for slug, e in arts:
        fs = files(os.path.join(DUMP, e, slug))
        if not fs:
            if kept(e, slug): found['artists'][slug] = sorted(kept(e, slug), key=lambda f: int(re.search(r'-(\d+)\.jpg$', f).group(1)))
            continue
        clear(e, slug)
        os.makedirs(os.path.join(OUT, e), exist_ok=True)
        outs = []
        for i, f in enumerate(fs[:6], 1):
            out = 'img/%s/%s-%d.jpg' % (e, slug, i)
            resize(os.path.join(DUMP, e, slug, f), os.path.join(ROOT, out), 2000)
            outs.append(out)
        found['artists'][slug] = outs
    js = open(DATA).read()
    js = re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\n?', '', js, flags=re.S).rstrip() + '\n'
    js += START + '\n(function (L) {\n' \
          '  window.UNMUTE.editions.forEach(function (e) { if (L.groups[e.id]) e.group = L.groups[e.id]; });\n' \
          '  window.UNMUTE.artists.forEach(function (a) { if (L.artists[a.slug]) a.photos = L.artists[a.slug]; });\n' \
          '})(' + json.dumps(found, indent=1) + ');\n' + END + '\n'
    open(DATA, 'w').write(js)
    print('published', len(found['artists']), 'artists and', len(found['groups']), 'group photos into img/')

if __name__ == '__main__':
    make_folders()
    if sys.argv[1:] == ['publish']: publish()
