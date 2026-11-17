# unMute performer form

The form lives on the unMute site at **unmutelineup.vercel.app/form/**. It isn't linked from anywhere on the site, and search engines are told to skip it.

Send it **the day after the show**: `unmutelineup.vercel.app/form/kolkata-2027`

The part after `/form/` is the show's id in data.js: city-year. If a city has two shows in one year, the second gets the month as well, for example `mumbai-2027-oct`.

Permission to film and to show names and photos before the show belongs in the lineup sign-up, since the practice clip is shot before the show and the show page lists the lineup.

Learners, teachers or mentors, and Artium team members each see only their own questions. To see every question, use the overview page that Claude published, or open `tools/form-preview.html`.

## Where answers go

`tools/form-backend.gs` runs in Artium's Google account. The setup steps are at the top of that file. For every response it:

1. adds a row to the **unMute performers** sheet, one column per question
2. makes a Drive folder **unMute performer forms / <edition> / <name>** with their photos, a Google Doc, a PDF and a .json copy of their answers
3. emails the PDF to the team, and a copy to the performer

Claude can read the sheet and the folders through the Google Drive connector, so "build Sohini's page and newsletter" works straight from the form. The PDF is the readable version to share.

## Changing questions

Edit `tools/form_spec.py`, then run `python3 tools/form_spec.py`. That regenerates the live form's questions (`form/spec.js`) and the overview page together.
