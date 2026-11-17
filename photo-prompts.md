# unMute artist photos: prompts for ChatGPT or Gemini

Goal: turn whatever photo an artist sends into 2–3 photos that look like they came from one
real unMute photoshoot. The site shows them in black and white and turns them to colour on
hover, so always generate in COLOUR.

Why the same prompts for everyone: a grid looks premium when every photo shares one light,
one backdrop and one lens. Different backgrounds and filters per person is what makes a
grid look cheap.

## How to run it

1. Start a NEW chat for each artist (old chats leak faces between people).
2. Attach their clearest photo: face visible, good light, highest resolution they have.
3. Paste **Block 1 + one of the photo prompts + Block 2**, all in one message.
4. Make photos A and B for everyone. Make C when you want a stronger artist page.
5. Before using any result, put it next to the original and check eyes, nose, jaw, skin
   tone, hairline and glasses. If anything changed, use the fix-up prompt at the bottom.
   Still wrong after two tries? Use their original photo instead.
6. Show the result to the artist (or a parent, for under-18s) before it goes up.
7. Upload to Cloudinary, in a folder such as `unmute/artists/`, and name the files
   `firstname-lastname-a`, `-b` and `-c`.

---

## Block 1: keep the person (paste first, every time)

> Use the person in the attached photo as the subject. This must remain the same real
> person. Keep their exact face shape, eyes, eyebrows, nose, lips, jaw, ears, skin tone,
> skin texture, moles and marks, hairline, hair, glasses, age and body shape. Do not
> beautify, slim, lighten skin, smooth skin or reshape any feature. Only the lighting,
> background, pose, framing and camera change.

## Photo A: the portrait (grid photo, black and white until hover)

> An editorial portrait of this person for a music festival's artist page. Chest-up, body
> turned slightly to one side, face toward the camera, a calm, natural expression with a
> slight smile at most. Plain warm-grey seamless paper backdrop. One large soft light from
> camera left that falls gently into shadow on the right side of the face; no rim light,
> no hair light. Full-frame camera, 85mm lens at f/2.8, focus sharp on the eyes. Their own
> clothes, unchanged; if their clothes aren't visible, a plain dark top. Vertical 4:5
> framing, head in the upper third.

## Photo B: on stage (the photo the card flips to on hover)

> A candid live photo of this person mid-performance on a small, intimate stage,
> [singing into a handheld microphone / playing the ______], eyes closed or looking past
> the camera, caught in a real moment, not posing. Warm tungsten stage light from above
> and one side, deep shadows, a red exposed-brick wall softly out of focus behind them,
> a little haze in the light. Shot from the front row by a concert photographer on a
> full-frame camera, 50mm f/1.8, high ISO grain, a touch of motion in the hands, framing
> slightly imperfect. Vertical 4:5.

## Photo C: the quiet moment (optional, for the artist page)

> A quiet documentary portrait of this person before a show, sitting on a wooden stool
> near a window, [holding their instrument / holding a printed lyric sheet], looking down
> at it or just off camera. Soft daylight from the window, the rest of the room falling
> into shadow. 35mm lens at f/2, like a photo from a magazine profile. Vertical 4:5.

## Block 2: make it look photographed, not generated (paste last, every time)

> Make it look like an unretouched frame from a professional photographer, lightly edited
> by a careful photo editor: true-to-life colour, real skin texture with visible pores,
> natural flyaway hairs, fine film grain like Kodak Portra 400, real blacks, soft
> contrast. Avoid: airbrushed or plastic skin, glowing edges, HDR, teal-and-orange grading,
> perfect symmetry, bokeh balls, extra or merged fingers, warped microphones or
> instruments, text, logos, watermarks.

---

## Fix-up prompt (when the face drifts)

> The face has changed. Redo it and keep the face exactly as it is in the original photo:
> same features, same skin tone, same expression lines. Change only the lighting,
> background and framing.

## Quick checks before publishing

- Same person? Ask someone who knows them, not just yourself.
- Skin tone unchanged, not lighter.
- Hands: count the fingers. Microphones and instruments: shapes make sense.
- No stray text or logos in the background.
- Under 18: a parent has seen and approved the photos.
