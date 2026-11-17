#!/usr/bin/env python3
"""The unMute performer form, defined once.

  python3 tools/form_spec.py
      writes form/spec.js             (the live form on the website reads it)
      and    tools/form-preview.html  (the shareable overview of every question)

Each question:
  id     a short key; also the column name in the responses sheet
  t      text, para, choice, check, list, photos, email
  q      the question
  help   help text under it
  req    required
  opts   choices
  use    where the answer is used: W website, N newsletter, I Instagram, P private
  who    which performers see it: L learner, T teacher or mentor, M Artium team member
  show   only show when another answer matches: (question id, [values])

One form, sent the day after the show ('after' is kept empty so old links still work).
"""
import json, os

EDITIONS = ['Mumbai, December 2026', 'Kolkata, January 2027', 'London, July 2026', 'Hyderabad, May 2026',
            'Chennai, February 2026', 'Mumbai, December 2025', 'Bangalore, October 2025', 'Other']
ROLE = ['An Artium learner', 'An Artium teacher or mentor', 'Part of the Artium team']
MINOR = ['Under 13', '13 to 17']

def Q(id, t, q, help='', req=False, opts=None, use='', who='LTM', show=None):
    return {'id': id, 't': t, 'q': q, 'help': help, 'req': req, 'opts': opts, 'use': use, 'who': who, 'show': show}

BEFORE = [
  { 'title': 'About you', 'help': '', 'items': [
    Q('role', 'choice', 'You performed as', '', True, ROLE, 'W'),
    Q('name', 'text', 'Your full name, exactly as it should appear', 'On the website, newsletter, Instagram and YouTube. Spelling and capitals matter.', True, use='WNI'),
    Q('caption_name', 'text', 'The name to use in captions', 'Your first name, or the name people call you.', use='I'),
    Q('say_name', 'text', 'How do you say your name?', 'Only if people often get it wrong. For example: THUH-ni-kaa.', use='I'),
    Q('city', 'text', 'The city you live in now', '', True, use='WN'),
    Q('grew_up', 'text', 'Where did you grow up?', use='N'),
    Q('outside', 'text', 'What do you do outside music?', 'For example: Class 9 student in Pune. Software engineer. Doctor. Retired banker.', use='NI', who='L'),
  ]},
  { 'title': 'Your unMute', 'help': '', 'items': [
    Q('edition', 'list', 'Your unMute', '', True, EDITIONS, 'W'),
    Q('format', 'choice', 'How did you perform?', '', True, ['Solo', 'In a duet', 'In a group'], 'W'),
    Q('partners', 'text', 'If it was a duet or group, who with?', 'Full names.', use='WNI', show=('format', ['In a duet', 'In a group'])),
  ]},
  { 'title': 'You at Artium', 'help': 'This becomes the line under your name, for example "Vocalist & Artium Learner".', 'items': [
    Q('performs', 'check', 'What do you perform?', '', True, ['Vocals', 'Guitar', 'Piano or keys', 'Violin', 'Flute', 'Tabla', 'Drums', 'Other'], 'W'),
    Q('styles', 'check', 'Your styles', '', False, ['Hindustani classical', 'Carnatic classical', 'Bollywood and film', 'Western', 'Sufi and ghazal', 'Folk', 'Devotional', 'Original music', 'Other'], 'WN'),
    Q('course', 'text', 'Your Artium course', 'For example: Hindustani Vocals, Intermediate.', use='N', who='L'),
    Q('teacher', 'text', 'Your Artium teacher', 'Full name. They are credited alongside you.', use='WNI', who='L'),
    Q('teaches', 'text', 'What do you teach at Artium?', 'For example: Carnatic Vocals, all levels.', True, use='WN', who='T'),
    Q('teaching_since', 'text', 'When did you start teaching at Artium?', 'Month and year.', use='N', who='T'),
    Q('gurus_before', 'text', 'Teachers or gurus before Artium', '', use='N', who='L'),
    Q('gurus', 'text', 'Your teachers or gurus', 'Who you learnt from, and your gharana or bani if you follow one.', use='WN', who='T'),
    Q('training', 'para', 'Your training', 'Formal training, degrees, exams, scholarships.', use='N', who='T'),
    Q('started', 'text', 'When did you start music?', 'An age or a year is fine.', True, use='WN'),
    Q('joined', 'text', 'When did you join Artium?', 'Month and year.', True, use='N', who='LM'),
  ]},
  { 'title': 'Your music story', 'help': 'This is the heart of your newsletter and the About section on your page.', 'items': [
    Q('origin', 'para', 'How did music start for you?', 'A person, a song, a place, a moment. A few sentences is plenty.', True, use='WN'),
    Q('first_song', 'text', 'The first song you remember singing or playing', use='NI', who='LM'),
    Q('turning_point', 'para', 'Was there a turning point?', 'A moment you decided to take music seriously, or nearly gave it up.', use='N'),
    Q('since_artium', 'para', 'What has changed since you started at Artium?', 'A class, a teacher, the first time you noticed you had improved.', use='N', who='L'),
    Q('milestones', 'para', 'Your milestones so far', 'Performances, competitions, exams, recordings. One per line, with the year.', use='WN', who='LM'),
    Q('career', 'para', 'Your work as a musician', 'Concerts, recordings, films, shows, collaborations, awards. One per line, with the year.', use='WN', who='T'),
    Q('teaching', 'para', 'What do you love about teaching?', '', use='NI', who='T'),
    Q('learnt_from_learners', 'para', 'What have your learners taught you?', '', use='NI', who='T'),
    Q('influences', 'text', 'Which singers or musicians shaped your sound?', 'Up to three.', use='WN'),
    Q('signature_song', 'para', 'One song that explains who you are, and why', '', use='NI'),
  ]},
  { 'title': 'Your songs', 'help': 'Arrangements are made by the Artium team. We add the full song credits ourselves.', 'items': [
    Q('songs', 'para', 'The songs you performed', 'One per line, with the film or album. For example: Tum Ho, Rockstar.', True, use='WNI'),
    Q('song_meaning', 'para', 'What does your song mean to you?', 'If you sang more than one, pick the one closest to you.', True, use='NI'),
  ]},
  { 'title': 'Getting ready', 'help': 'Used for your practice clip and your newsletter.', 'items': [
    Q('stage_before', 'choice', 'Before unMute, how often had you performed on a stage?', '', True, ['Never, this was my first time', 'A few times', 'Many times'], 'NI', who='LM'),
    Q('prep_time', 'text', 'How long did you prepare?', 'For example: three weeks, an hour a day.', use='NI', who='LM'),
    Q('practice_day', 'para', 'What did a practice day look like?', '', use='NI', who='LM'),
    Q('hardest', 'para', 'What was the hardest part?', '', use='NI'),
    Q('teacher_advice', 'para', 'The best advice your teacher gave you for this', '', use='NI', who='L'),
    Q('alongside', 'para', 'What was it like preparing alongside your learners?', '', use='NI', who='T'),
    Q('audience_feel', 'para', 'What did you want the audience to feel?', '', use='NI', who='T'),
  ]},
  { 'title': 'The night', 'help': 'Your words here become quotes on your page, in your newsletter and in your testimonial clip.', 'items': [
    Q('before_walking_on', 'para', 'What did you feel just before you walked on?', '', True, use='WNI'),
    Q('moment', 'para', 'One moment from the night you will keep', '', True, use='WNI'),
    Q('watching_learners', 'para', 'Watching your learners on stage, what stayed with you?', '', use='NI', who='T'),
    Q('who_came', 'text', 'Who came to watch you?', '', use='N', who='LM'),
    Q('what_they_said', 'para', 'What did they say to you afterwards?', '', use='N', who='LM'),
    Q('advice', 'para', 'What would you tell someone about to perform for the first time?', '', use='NI'),
  ]},
  { 'title': 'In your own words', 'help': 'Short lines for your Instagram carousel and the top of your page.', 'items': [
    Q('intro_line', 'text', 'Introduce yourself in one line', 'Under 15 words. For example: A Carnatic singer from Chennai who started at five.', True, use='WI'),
    Q('quote', 'text', 'Finish this sentence: "When I sing (or play), I..."', 'Under 20 words. This often becomes your quote.', True, use='WI'),
    Q('leave_out', 'para', 'Is there anything you would rather we did not mention?', 'We will leave it out.', use='P'),
  ]},
  { 'title': 'Behind every artist', 'help': 'The newsletter thanks the people behind you by name.', 'items': [
    Q('thanks', 'para', 'Who would you like to thank?', 'Family, friends, teachers, anyone who made this possible.', use='N'),
    Q('close_line', 'para', 'A line from someone close to you', 'Optional. Ask a parent, partner or friend what it is like watching you perform, and write their name after it.', use='N'),
  ]},
  { 'title': 'Photos, videos and links', 'help': 'We take the stage photos and videos. These are optional extras of your own.', 'items': [
    Q('photos', 'photos', 'Add a few photos', 'Up to 5, straight from your phone. A childhood photo, you practising, you with your teacher or family. Clear and unfiltered, no screenshots.', use='WNI'),
    Q('media_link', 'text', 'A link to more photos or videos in full quality', 'For videos, or original photo files. Put them in a Google Drive folder, then click Share, set General access to "Anyone with the link", copy the link and paste it here. iCloud or WeTransfer links work too.', use='WNI'),
    Q('photo_credit', 'text', 'Who took your photos or videos?', 'So we can credit them. Leave blank if it was you or family.', use='W', show=None),
    Q('instagram', 'text', 'Instagram handle', 'We tag you when your posts go up.', use='WI'),
    Q('youtube', 'text', 'YouTube channel', use='W'),
    Q('spotify', 'text', 'Spotify or other music links', use='W'),
  ]},
  { 'title': 'Private', 'help': 'Only for our team. Never published.', 'items': [
    Q('email', 'email', 'Email', 'We send you a copy of your answers, and the written version to approve.', True, use='P'),
    Q('phone', 'text', 'Phone number (WhatsApp)', '', True, use='P'),
    Q('age', 'choice', 'Your age', '', True, ['Under 13', '13 to 17', '18 or older'], 'P', who='L'),
    Q('guardian', 'text', 'Parent or guardian: name, relationship and phone', '', True, use='P', who='L', show=('age', MINOR)),
    Q('consent', 'check', 'Permissions', 'Tick everything you agree to.', True, [
      'My name, photos, videos and words can appear on the unMute website.',
      'They can appear in the Artium newsletter.',
      'They can appear on Artium\'s Instagram, YouTube and other social media, and I can be tagged.',
      'I understand I will see the written version to approve before anything is published.'], 'P'),
    Q('guardian_ok', 'check', 'Parent or guardian', '', True, ['My parent or guardian has read this form and agrees to everything ticked above.'], 'P', who='L', show=('age', MINOR)),
  ]},
]

AFTER = []   # one form now, sent the day after the show

FORM = {
  'title': 'unMute performer form',
  'intro': [
    'Thank you for performing at unMute. This form gives us what we need for your page on the unMute website, your Artium newsletter and our Instagram posts about you.',
    'Answer the way you would talk to us. Short and honest is better than polished. Anything without a star is optional. We write it up and send it to you to approve before anything is published.',
    'It takes about 20 minutes. Your answers are saved on this device as you go, so you can stop and come back.'],
  'after_intro': [
    'Thank you for performing at unMute. A few questions about the night, while it is fresh. About 5 minutes.'],
  'thanks': 'Thank you. We have your answers, and a copy is on its way to your email. We will send you the written version to approve before anything is published.',
  'before': BEFORE, 'after': AFTER,
}

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

def main():
    js = json.dumps(FORM, ensure_ascii=False, indent=1)
    os.makedirs(os.path.join(ROOT, 'form'), exist_ok=True)
    open(os.path.join(ROOT, 'form', 'spec.js'), 'w').write('/* generated by tools/form_spec.py: edit questions there */\nwindow.UNMUTE_FORM = ' + js + ';\n')
    tpl = open(os.path.join(HERE, 'form-preview.template.html')).read()
    open(os.path.join(HERE, 'form-preview.html'), 'w').write(tpl.replace('__FORM__', json.dumps(FORM, ensure_ascii=False)))
    for part in ('before', 'after'):
        items = [q for s in FORM[part] for q in s['items']]
        print(part, len(FORM[part]), 'pages,', len(items), 'questions | learner', sum('L' in q['who'] for q in items),
              '| teacher', sum('T' in q['who'] for q in items), '| team', sum('M' in q['who'] for q in items))

if __name__ == '__main__':
    main()
