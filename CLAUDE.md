# unMute website

The public site for unMute, Artium Academy's live performance series: Artium students and teachers perform one evening in one city, a new city each month or so. Live at https://artiumunmute.vercel.app (the old unmutelineup.vercel.app redirects there; printed QR codes use it), repo `abhijeetthakur-sys/unMuteLineUp`, deployed by Vercel on every push to `main`.

## How it's built

Plain static HTML, CSS and JS. No build step, no framework.

- `data.js` holds every edition and artist (`window.UNMUTE`). Almost every content change is an edit here.
- `site.js` holds shared helpers (`window.UM`): header, footer, artist cards, dates, photo URLs, the free-trial link.
- `site.css` holds the shared styles and tokens.
- Pages: `index.html` (home), `artists/`, `artist/?a=<slug>`, `edition/?e=<id>`, plus hand-made show pages `mumbai/dec-2026/` and `kolkata/jan-2027/`.
- Dates are in IST. An edition counts as past from the day after its date, and the site switches over by itself.

## Photos

Two kinds, kept apart: the **lineup photo** (before the show, only on the city's show page, e.g. mumbai/dec-2026) and the **website photos** (after the show, artist cards and pages). In a person's folder, a file named `lineup.jpg` is the lineup photo; `1`, `2`, `3` are the website photos. The show pages read their lineup from `data.js` (`lineupPhoto`, else `photos[0]`) and show initials when there is no photo. If data.js fails to load they keep the lineup written in their HTML. To add a performer to a show page, add them to data.js with the show's `ed`.

**The face is the subject.** Every crop on the site (cards, hover, hero, About panel, show-page tiles, mosaics) is positioned on the face. `tools/photos.py publish` finds the face in every photo (local and YouTube/Cloudinary) with `tools/faces.swift` (Apple Vision, compiled to tools/.bin/faces), caches results in `tools/focus.json`, and writes them to `window.UNMUTE.focus`; `photo()` in site.js returns `op`, the object-position to use. Always use `op` when adding a new crop.

A `hero.jpg` in a person's folder is a wide photo for the top of their page on desktop (`heroPhoto` in data.js); phones get their portrait `1.jpg` instead, because a wide frame crops to a soft sliver there. Without a `hero.jpg`, the first photo is used. Video frames have the Artium logo burned into both top corners: for heroes the corners are filled in with ffmpeg's `delogo` (rects x=50,y=34,w=330,h=118 and x=1550,y=26,w=340,h=124 on 1080p) and the bottom 13% is cut off (captions).

Photos cut from the performance videos (done Nov 2026 for 15 artists in Mumbai 2025, Chennai and London, to replace YouTube thumbnails that had text on them): `yt-dlp` and `ffmpeg` are in ~/.local/bin. Download the video at 1080p, make a timestamped contact sheet (`fps=1/4`, tile), pick close-up moments by eye, then cut a 4:5 portrait around the performer (full height minus the bottom 13%, which is where the video's captions sit; keep clear of the corner logos) and drop it in the person's photos folder as 1.jpg, 2.jpg. The other artists still use YouTube auto-frames (`yt:id:n`), which have no text but show the corner logos.

Owner's routine: drop photos in `photos/<show>/<person>/`, double-click `Publish photos.command` (prints what is missing), then upload `img` + `data.js` to GitHub.

Each artist's `photos` list is in order: 1st is the card and page hero, 2nd is the hover flip. An entry can be:

- `cl:<cloudinary id>` cropped to the face
- `clw:<cloudinary id>` cropped smartly (duos, groups, wide shots)
- `yt:<video id>:<n>` a YouTube frame (1 to 3), or `0` for the official thumbnail
- `img/...` a local photo published by `tools/photos.py`
- any of these can end in ` @30%` to shift the crop sideways

**No blurred or hazy photos** unless it's a deliberate artistic choice. Never fill a slot with a stand-in. The About panel shows only a photo the owner chose (`about.jpg` in the person's folder → `aboutPhoto`); without one, the panel is text only. YouTube auto-frames (`yt:id:1..3`) are random stills that crop soft, so treat them as temporary.

The Artists page, the home page artist teaser and the name roll only list people whose show is over and whose content has started going out (`released()` / `shown()` in site.js). An upcoming lineup is hidden on the site (edition page says "The lineup will be revealed on <date>, the day of the show") until the show day (`revealed()`; set `reveal: 'YYYY-MM-DD'` on an edition to change it). The QR postcard pages always show it. Editions with `tba: true` show "Date to be announced" and "Lineup coming soon". The home teaser leads with the most recent show. The home page has no "city is out" section; the owner rejected it.

New photos go into `photos/<edition>/<artist-slug>/` named 1, 2, 3 (group shots in `_group/`), then `python3 tools/photos.py publish` resizes them into `img/` and writes the block at the end of `data.js`. Local photos override the ones written in the artist's entry. `photos/` holds heavy originals and is not in git; `img/` is.

Edition banners use the group photo if there is one, then a mosaic of at least 3 lineup photos, then the edition number in big type.

## Taste and copy (the owner's standing preferences)

- Premium and human, like applemusichall.com. Never generic or "AI-looking".
- Copy is plain and specific. No hype, no clichés. The owner rejects anything cheesy.
- Font is Archivo (variable width). Bold, wide caps for display. Nothing quirky.
- The unMute logo is the hero: big on load, flies to the top left on scroll. Its mic bars move up and down.
- Artist pages follow the Apple Music Hall structure with a Charli XCX-style About panel. The hero is not full screen, so people know to scroll.
- Artist photos are black and white, colour on hover.
- No sub-text under upcoming city names.

## Working rules

- The owner commits and pushes. Give them exact steps; don't push for them.
- Check every script with `node --check` after editing, and check new image URLs load.
- Internal files (`*.md`, `tools/`, `photos/`, `hub-old.html`, `demo.html`) are kept off the live site by `.vercelignore`.
- The performer form is live at `form/` (custom page, posts to the Apps Script in `tools/form-backend.gs`, which writes to a Google Sheet + per-performer Drive folder with PDF). Questions are defined once in `tools/form_spec.py`; running it regenerates `form/spec.js` and `tools/form-preview.html`. `artist-form.md` explains it.
- Wording: "learner", never "student". Don't mention ATDP. Arrangements are by Artium (Akshay and team), not the performer.
- Lineup cards show a designation ("Vocalist & Artium Learner"), never the song. It comes from `desig()` in site.js; set `desig` on an artist to override.
- Artist posts (Instagram/YouTube) go in each artist's `posts`; see the notes at the top of data.js. `photo-prompts.md` has AI photo prompts.

## Open questions for the owner

- Shrey Jadav or Shrey Yadav?
- Mumbai 2025 date and venue (dashboard says Blue Frog; the newsletter says The Artium Stage)
- Ananya S G, or Ananya Godavarty as on the dashboard?
- Bangalore 2025 and Chennai 2026 venue and date come only from the dashboard
- Show London as "London" or "Southall"?
- Rajat Nigam (London) has no photo or video yet
