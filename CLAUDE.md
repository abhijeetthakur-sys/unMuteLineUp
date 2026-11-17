# unMute website

The public site for unMute, Artium Academy's live performance series: Artium students and teachers perform one evening in one city, a new city each month or so. Live at https://unmutelineup.vercel.app, repo `abhijeetthakur-sys/unMuteLineUp`, deployed by Vercel on every push to `main`.

## How it's built

Plain static HTML, CSS and JS. No build step, no framework.

- `data.js` holds every edition and artist (`window.UNMUTE`). Almost every content change is an edit here.
- `site.js` holds shared helpers (`window.UM`): header, footer, artist cards, dates, photo URLs, the free-trial link.
- `site.css` holds the shared styles and tokens.
- Pages: `index.html` (home), `artists/`, `artist/?a=<slug>`, `edition/?e=<id>`, plus hand-made show pages `mumbai/dec-2026/` and `kolkata/jan-2027/`.
- Dates are in IST. An edition counts as past from the day after its date, and the site switches over by itself.

## Photos

Each artist's `photos` list is in order: 1st is the card and page hero, 2nd is the hover flip, 3rd is the About panel. An entry can be:

- `cl:<cloudinary id>` cropped to the face
- `clw:<cloudinary id>` cropped smartly (duos, groups, wide shots)
- `yt:<video id>:<n>` a YouTube frame (1 to 3), or `0` for the official thumbnail
- `img/...` a local photo published by `tools/photos.py`
- any of these can end in ` @30%` to shift the crop sideways

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
