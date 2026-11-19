#!/usr/bin/env python3
"""unMute photo publisher.

  python3 tools/photos.py          make the folders and print a report of what is there and what is missing
  python3 tools/photos.py publish  the same, then resize everything in photos/ into img/ and update data.js

Or just double-click "Publish photos.command" in the unmute-lineup folder.

Folders:  photos/<edition>/<artist-slug>/      one folder per person, made for you
          photos/<edition>/_group/             a group photo of the whole lineup
In a person's folder:
  lineup.jpg    their photo for the city's lineup page (the QR page). Any file type, the name must start with "lineup"
  hero.jpg      a wide (landscape) photo for the top of their page. Optional. Name must start with "hero"
  about.jpg     the photo beside their story in the About panel. Optional; you choose it.
  about-tall.jpg  optional upright version of it for phones (e.g. just the singer from a group shot)
                Without one the panel is text only (no stand-in photo). Name must start with "about"
  1.jpg, 2.jpg, 3.jpg   their photos for the main website, in this order:
                1st = artist card + top of their page, 2nd = card hover
Anything in a folder replaces that person's current photos. Empty folders change nothing,
so it is safe to run on a laptop that doesn't have the raw photos.
"""
import os, re, sys, json, difflib, subprocess, hashlib, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP, OUT, DATA = os.path.join(ROOT, 'photos'), os.path.join(ROOT, 'img'), os.path.join(ROOT, 'data.js')
EXT = ('.jpg', '.jpeg', '.png', '.heic', '.webp', '.tif', '.tiff')
IGNORE = ('.ds_store', 'thumbs.db', 'desktop.ini')
START, END = '/* LOCAL PHOTOS: written by tools/photos.py, do not edit */', '/* END LOCAL PHOTOS */'

HAS_PHOTO = set()

def lineup():
    js = open(DATA).read()
    eds = re.findall(r"\bid:\s*'([a-z0-9-]+)'", js)
    arts = re.findall(r"slug:\s*'([a-z0-9-]+)'[^}]*?\bed:\s*'([a-z0-9-]+)'", js, re.S)
    names = dict(re.findall(r"slug:\s*'([a-z0-9-]+)',\s*name:\s*'([^']+)'", js))
    # who already has a photo written into their entry in data.js (from before this tool)
    chunks = re.split(r"(?=\{ slug: ')", js.split(START)[0])
    for c in chunks:
        m = re.match(r"\{ slug: '([a-z0-9-]+)'", c)
        if m and re.search(r"\bphotos:\s*\[", c.split('\n    { slug')[0]): HAS_PHOTO.add(m.group(1))
    return eds, arts, names

def make_folders():
    eds, arts, _ = lineup()
    for e in eds: os.makedirs(os.path.join(DUMP, e, '_group'), exist_ok=True)
    for slug, e in arts: os.makedirs(os.path.join(DUMP, e, slug), exist_ok=True)

def size_of(path):
    info = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', path], capture_output=True, text=True).stdout
    return [int(n) for n in re.findall(r'pixel(?:Width|Height): (\d+)', info)] or [0]

def resize(src, dst, edge):   # only ever shrinks, never blows a small photo up
    size = ['-Z', str(edge)] if max(size_of(src)) > edge else []
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '82'] + size + [src, '--out', dst],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def images(d):
    return sorted(f for f in os.listdir(d) if f.lower().endswith(EXT)) if os.path.isdir(d) else []

def split(d):
    """a person's folder -> (lineup photo or None, [website photos])"""
    fs = images(d)
    lu = [f for f in fs if os.path.splitext(f)[0].lower().startswith('lineup')]
    hero = [f for f in fs if os.path.splitext(f)[0].lower().startswith('hero')]
    about = [f for f in fs if os.path.splitext(f)[0].lower().startswith('about')]   # about.jpg and about-tall.jpg
    return (lu[0] if lu else None), (hero[0] if hero else None), [f for f in fs if f not in lu and f not in hero and f not in about]

def about_of(d):
    fs = sorted(f for f in os.listdir(d) if not f.startswith('.')) if os.path.isdir(d) else []
    a = [f for f in fs if os.path.splitext(f)[0].lower().startswith('about') and 'tall' not in f.lower()]
    t = [f for f in fs if os.path.splitext(f)[0].lower().startswith('about') and 'tall' in f.lower()]
    return (a[0] if a else None), (t[0] if t else None)

def report(eds, arts, names):
    """print what is there and what is missing; returns the number of warnings"""
    warn = []
    slugs = [s for s, _ in arts]
    # things in the wrong place
    if os.path.isdir(DUMP):
        for x in sorted(os.listdir(DUMP)):
            if x.lower() in IGNORE: continue
            if x not in eds: warn.append("'%s' is directly inside photos/. Photos belong in photos/<show>/<person>/ (nothing here is used)." % x)
        for e in eds:
            d = os.path.join(DUMP, e)
            if not os.path.isdir(d): continue
            for x in sorted(os.listdir(d)):
                p = os.path.join(d, x)
                if x.lower() in IGNORE or x == '_group': continue
                mine = [s for s, ee in arts if ee == e]
                if x not in mine:
                    guess = difflib.get_close_matches(x.lower().replace(' ', '-'), mine, 1, 0.5)
                    warn.append("'%s/%s' is not a person on this lineup%s. It is ignored." % (e, x, ". Did you mean '%s'?" % guess[0] if guess else ''))
            for s in [s for s, ee in arts if ee == e]:
                sd = os.path.join(d, s)
                if not os.path.isdir(sd): continue
                for f in sorted(os.listdir(sd)):
                    if f.lower() in IGNORE: continue
                    if not f.lower().endswith(EXT): warn.append("%s/%s/%s is not a photo file, so it is ignored." % (e, s, f))
                    elif max(size_of(os.path.join(sd, f))) < 900: warn.append("%s/%s/%s is small (under 900 pixels). It may look blurry; ask for the original." % (e, s, f))
                if len(split(sd)[2]) > 6: warn.append("%s/%s has more than 6 website photos. Only the first 6 are used." % (e, s))
    print()
    for e in eds:
        people = [s for s, ee in arts if ee == e]
        if not people: continue
        got_lu, got_site, miss = [], [], []
        for s in people:
            lu, hero, site = split(os.path.join(DUMP, e, s))
            has_lu = bool(lu) or os.path.exists(os.path.join(OUT, e, s + '-lineup.jpg')) or s in HAS_PHOTO   # the lineup page falls back to their website photo
            has_site = bool(site) or s in HAS_PHOTO or any(re.match(re.escape(s) + r'-\d+\.jpg$', f) for f in (os.listdir(os.path.join(OUT, e)) if os.path.isdir(os.path.join(OUT, e)) else []))
            if has_lu: got_lu.append(s)
            if has_site: got_site.append(s)
            if not has_lu: miss.append(names.get(s, s))
        print('%-24s photo on the lineup page: %2d of %-2d    photos on the website: %2d of %-2d' % (e, len(got_lu), len(people), len(got_site), len(people)))
        if miss and len(miss) < len(people): print('    still need a photo: ' + ', '.join(miss))
    if warn:
        print('\nPlease check:')
        for w in warn: print('  - ' + w)
    return len(warn)

FACES_SRC, FACES_BIN = os.path.join(ROOT, 'tools', 'faces.swift'), os.path.join(ROOT, 'tools', '.bin', 'faces')
FOCUS_CACHE, DL = os.path.join(ROOT, 'tools', 'focus.json'), os.path.join(ROOT, 'tools', '.cache')

def remote_url(ref):
    if ref.startswith('yt:'):
        q = ref.split(':'); return 'https://i.ytimg.com/vi/%s/%s.jpg' % (q[1], 'maxresdefault' if q[2] == '0' else 'maxres' + q[2])
    if ref.startswith('clw:'): return 'https://res.cloudinary.com/dd7s6bb58/image/upload/c_limit,w_1600,f_jpg/' + ref[4:]
    if ref.startswith('https://'): return ref
    return None

def focus(local_refs):
    """where the face is in every photo, so every crop on the site keeps it in view"""
    if not os.path.exists(FACES_BIN):
        os.makedirs(os.path.dirname(FACES_BIN), exist_ok=True)
        r = subprocess.run(['swiftc', '-O', '-o', FACES_BIN, FACES_SRC], capture_output=True, text=True)
        if r.returncode: print('(face finder not available on this Mac; keeping the face positions found before)')
    try: cache = json.load(open(FOCUS_CACHE))
    except Exception: cache = {}
    js = open(DATA).read().split(START)[0]
    remote = set(re.findall(r"'((?:yt:[\w-]+:\d)|(?:clw:[^'\s@]+)|(?:https://res\.cloudinary\.com/[^'\s@]+))(?:\s*@\d+%)?'", js))
    todo = {}
    os.makedirs(DL, exist_ok=True)
    for ref in sorted(remote):
        if ref in cache: continue
        url = remote_url(ref)
        if not url: continue
        path = os.path.join(DL, hashlib.sha1(ref.encode()).hexdigest() + '.jpg')
        if not os.path.exists(path):
            try: urllib.request.urlretrieve(url, path)
            except Exception: continue
        todo[path] = ref
    for ref in local_refs: todo[os.path.join(ROOT, ref)] = ref    # local photos: always re-checked, the file may have been replaced
    if todo and os.path.exists(FACES_BIN):
        paths = list(todo)
        for i in range(0, len(paths), 40):
            out = subprocess.run([FACES_BIN] + paths[i:i + 40], capture_output=True, text=True).stdout
            for line in out.splitlines():
                bits = line.split('\t')
                if bits[0] in todo: cache[todo[bits[0]]] = None if bits[1] == 'none' else [float(bits[1]), float(bits[2])]
    json.dump(cache, open(FOCUS_CACHE, 'w'), indent=0, sort_keys=True)
    return {k: v for k, v in cache.items() if v}

def publish():
    eds, arts, _ = lineup()
    found = {'artists': {}, 'groups': {}, 'lineup': {}, 'hero': {}, 'about': {}, 'aboutTall': {}}
    def kept(e, pat):   # photos already in img/ from an earlier publish (maybe on another laptop)
        d = os.path.join(OUT, e)
        return sorted('img/%s/%s' % (e, f) for f in os.listdir(d) if re.match(pat, f)) if os.path.isdir(d) else []
    for e in eds:
        g = images(os.path.join(DUMP, e, '_group'))
        if not g:
            if kept(e, r'group\.jpg$'): found['groups'][e] = kept(e, r'group\.jpg$')[0]
            continue
        os.makedirs(os.path.join(OUT, e), exist_ok=True)
        out = 'img/%s/group.jpg' % e
        resize(os.path.join(DUMP, e, '_group', g[0]), os.path.join(ROOT, out), 2400)
        found['groups'][e] = out
    for slug, e in arts:
        d = os.path.join(DUMP, e, slug)
        lu, hero, site = split(d)
        os.makedirs(os.path.join(OUT, e), exist_ok=True)
        # the lineup-page photo
        lu_out = 'img/%s/%s-lineup.jpg' % (e, slug)
        if lu: resize(os.path.join(d, lu), os.path.join(ROOT, lu_out), 1600)
        if os.path.exists(os.path.join(ROOT, lu_out)): found['lineup'][slug] = lu_out
        # the wide photo for the top of their page (optional; without it the first website photo is used)
        hero_out = 'img/%s/%s-hero.jpg' % (e, slug)
        if hero: resize(os.path.join(d, hero), os.path.join(ROOT, hero_out), 2400)
        if os.path.exists(os.path.join(ROOT, hero_out)): found['hero'][slug] = hero_out
        # the About-panel photo, only when one is chosen
        (ab, abt), ab_out, abt_out = about_of(d), 'img/%s/%s-about.jpg' % (e, slug), 'img/%s/%s-about-tall.jpg' % (e, slug)
        if ab: resize(os.path.join(d, ab), os.path.join(ROOT, ab_out), 2000)
        if os.path.exists(os.path.join(ROOT, ab_out)): found['about'][slug] = ab_out
        # optional upright version for phones (about-tall.jpg), when the wide one has other people at the sides
        if abt: resize(os.path.join(d, abt), os.path.join(ROOT, abt_out), 1400)
        if os.path.exists(os.path.join(ROOT, abt_out)): found['aboutTall'][slug] = abt_out
        # the website photos
        if site:
            for f in kept(e, re.escape(slug) + r'-\d+\.jpg$'): os.remove(os.path.join(ROOT, f))
            outs = []
            for i, f in enumerate(site[:6], 1):
                out = 'img/%s/%s-%d.jpg' % (e, slug, i)
                resize(os.path.join(d, f), os.path.join(ROOT, out), 2000)
                outs.append(out)
            found['artists'][slug] = outs
        elif kept(e, re.escape(slug) + r'-\d+\.jpg$'):
            found['artists'][slug] = sorted(kept(e, re.escape(slug) + r'-\d+\.jpg$'), key=lambda f: int(re.search(r'-(\d+)\.jpg$', f).group(1)))
        if os.path.isdir(os.path.join(OUT, e)) and not os.listdir(os.path.join(OUT, e)): os.rmdir(os.path.join(OUT, e))
    local = [p for l in found['artists'].values() for p in l] + list(found['lineup'].values()) + list(found['hero'].values()) + list(found['about'].values()) + list(found['aboutTall'].values()) + list(found['groups'].values())
    found['focus'] = focus(local)
    js = open(DATA).read()
    js = re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\n?', '', js, flags=re.S).rstrip() + '\n'
    js += START + '\n(function (L) {\n' \
          '  window.UNMUTE.focus = L.focus;   // where the face is in each photo (0..1), so crops keep it in view\n' \
          '  window.UNMUTE.editions.forEach(function (e) { if (L.groups[e.id]) e.group = L.groups[e.id]; });\n' \
          '  window.UNMUTE.artists.forEach(function (a) {\n' \
          '    if (L.artists[a.slug]) a.photos = L.artists[a.slug];\n' \
          '    if (L.lineup[a.slug]) a.lineupPhoto = L.lineup[a.slug];\n' \
          '    if (L.hero[a.slug]) a.heroPhoto = L.hero[a.slug];\n' \
          '    if (L.about[a.slug]) a.aboutPhoto = L.about[a.slug];\n' \
          '    if (L.aboutTall[a.slug]) a.aboutTall = L.aboutTall[a.slug];\n' \
          '  });\n' \
          '})(' + json.dumps(found, indent=1) + ');\n' + END + '\n'
    open(DATA, 'w').write(js)
    print('\nDone. Now upload the "img" folder and "data.js" to GitHub (Add file > Upload files > Commit changes).')

if __name__ == '__main__':
    make_folders()
    eds, arts, names = lineup()
    n = report(eds, arts, names)
    if sys.argv[1:] == ['publish']: publish()
