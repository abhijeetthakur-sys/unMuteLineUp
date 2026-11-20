/* =====================================================================
   unMute data: every edition and every artist.
   The homepage, Artists page, artist pages and edition pages are all
   built from this one file. To add a show or an artist, edit here only.

   Sources: The Stage + unMute newsletters (Hyderabad, Mumbai episode pages),
   lineup pages (Kolkata), Talent Dashboard (Bangalore, Mumbai 2025, Chennai: to confirm).

   After a show (all optional; dates are 'YYYY-MM-DD', India time). The site updates itself on each date.
     On each artist:
       out: '2027-01-02'   the day their full performance goes up on YouTube. Until then the video stays hidden.
       posts: [            their Instagram and YouTube posts. Each appears on their page from its date.
         { type: 'practice',    date: '2026-12-24', url: 'https://www.instagram.com/reel/...' },
         { type: 'intro',       date: '2026-12-26', url: '...' },   the photo + bio/quote carousel
         { type: 'cut',         date: '2026-12-29', url: '...' },   the performance cut
         { type: 'photos',      date: '2027-01-03', url: '...' },   photo carousel from the night
         { type: 'testimonial', date: '2027-01-05', url: '...' }
         { type: 'story',       date: '2026-11-18', url: 'https://artium-newsletters.vercel.app/...' }   their newsletter on The Stage
       ]                   url can be an Instagram link, a YouTube link or a YouTube id.
                           Add img: '<photo>' to a post to choose its picture (Instagram gives none to
                           fetch, so otherwise the artist's own photo is used).
     On the edition, for posts about the whole city:
       posts: [ { type: 'teaser', ... }, { type: 'reveal', ... }, { type: 'closing', ... } ]
   While a city has something new from the last 14 days it counts as live: the homepage leads with it,
   and every page shows a small "New from unMute <city>" card when it opens.
   Check it on any date by adding ?preview=2027-01-02 to a page's address.

   Edition ids are city-year, e.g. 'kolkata-2027'. They make the form links (artiumunmute.vercel.app/form/kolkata-2027).
   If a city has two shows in one year, add the month to the newer one: 'mumbai-2027-oct'.

   Photos:
     'cl:<version/path>'    an image in Artium's Cloudinary, cropped to the face automatically
     'clw:<version/path>'   an image in Cloudinary, cropped to the most interesting area (groups, duos)
     'yt:<videoId>:<n>'     frame n (1-3) of a YouTube video
     'https://...'          any full image URL, used as-is
   Optional ' @<x>%' after a photo shifts the crop sideways, e.g. 'yt:abc:1 @38%'
   ===================================================================== */
window.UNMUTE = {

  editions: [
    { id: 'bangalore-2025', n: 1, city: 'Bangalore', date: '2025-10-04', venue: 'The Stage, Indiranagar',
      note: 'The first edition of unMute.' },
    { id: 'mumbai-2025', n: 2, city: 'Mumbai', date: '2025-12-11', venue: 'The Artium Stage',
      note: 'Learners and teachers, plus a duet from two members of Artium’s team.' },
    { id: 'chennai-2026', n: 3, city: 'Chennai', date: '2026-02-19', venue: '',
      note: 'Seven performers, from a Carnatic kriti to The Climb.' },
    { id: 'hyderabad-2026', n: 4, city: 'Hyderabad', date: '2026-05-28', venue: 'Ameyaa Social',
      group: 'clw:v1780150465/WhatsApp_Image_2026-05-29_at_3.48.13_PM_dlcpas.jpg',
      note: 'Seven performers at Ameyaa Social. Carnatic classical, and Hindi and Telugu film songs, from learners and teachers.' },
    { id: 'london-2026', n: 5, city: 'London', date: '2026-07-25', venue: 'CoLabs, OPEN Southall',
      note: 'The first edition outside India, held at CoLabs in Southall.' },
    { id: 'mumbai-2026', n: 6, city: 'Mumbai', date: '2026-12-16', venue: '', count: 8,
      page: 'mumbai/dec-2026/', postcard: 'cl:v1794481164/unMute_Postcard_Mumbai_hl37xm.png',
      postcardCrop: 'c_crop,x_44,y_42,w_1652,h_1150',
      note: 'Eight performers.' },
    { id: 'kolkata-2027', n: 7, city: 'Kolkata', date: '2027-01-22', venue: '', count: 10,
      page: 'kolkata/jan-2027/', postcard: 'cl:v1794481163/unMute_Postcard_Kolkata-2_llrej4.png',
      postcardCrop: 'c_crop,x_40,y_40,w_1666,h_1158',
      note: 'Ten performers, including three Bengali songs produced for the evening.' },
    { id: 'bangalore-2027', n: 8, city: 'Bangalore', date: '2027-02-15', dateLabel: 'February 2027', tba: true, venue: '',
      note: '' }
  ],

  artists: [
    /* ---- Hyderabad, 28 May 2026 (source: unMute Hyderabad newsletter + episode pages) ---- */
    { slug: 'bhavya-tumuluru', name: 'Bhavya Tumuluru', ed: 'hyderabad-2026', role: 'Artium teacher', does: 'Carnatic classical',
      teacher: 'Lalitha ji and Haripriya ji (Hyderabad Sisters)',
      with: 'Kolipaka Veeraswamy on mridangam, Koundinya Pannala on violin',
      line: 'Carnatic vocalist and Artium teacher',
      photos: ['cl:v1791348626/Screenshot_2026-10-07_at_10.10.38_AM_f5glux.png', 'clw:v1791348629/Screenshot_2026-10-07_at_10.10.00_AM_r21uxz.png'],
      songs: ['Bhavayami Padumente'], video: 'g1H9p6Kkmzc', ep: 'unmute-hyderabad-bt',
      quote: 'Finishing this challenging classical piece at the end of my performance gave me a sense of satisfaction and made me feel like a complete musician.',
      bio: 'Bhavya sang Bhavayami Padumente, the Ragamalika from the Malayalam film Meghatheertham, moving through Pantuvarali, Mohana and Suddha Dhanyasi. Her great-grandfather was the Padma Bhushan Carnatic vocalist Dr. Sripada Pinakapani.' },
    { slug: 'pt-gayathri', name: 'P.T. Gayathri', ed: 'hyderabad-2026', role: 'Host, performer and Artium teacher', does: 'Telugu film music and Carnatic classical',
      with: 'Kolipaka Veeraswamy on mridangam, Koundinya Pannala on violin',
      line: 'Vocalist, Artium teacher and host of unMute Hyderabad',
      photos: ['cl:v1786691986/Screenshot_2026-08-13_at_6.48.51_PM_qc39u4.jpg', 'yt:IDqxB9fVExY:1 @46%'],
      songs: ['Brindavani Thillana', 'Alanai Neekai'], video: 'IDqxB9fVExY', ep: 'unmute-hyderabad-ep01-gayathript',
      quote: 'I imagine a peacock, I imagine Lord Krishna. And the raga itself is Vrindavani.',
      bio: 'Gayathri hosted the Hyderabad night and performed in it. Her Thillana in raga Brindavani, composed by Mangalampalli Balamuralikrishna, was the first unMute Hyderabad episode on YouTube.' },
    { slug: 'chinmayee-madha', name: 'Chinmayee Madha', ed: 'hyderabad-2026', does: 'Telugu film music',
      line: 'Vocalist and Artium learner',
      photos: ['cl:v1787388115/Screenshot_2026-08-22_at_2.07.18_PM_qrszow.jpg', 'cl:v1787388056/Screenshot_2026-08-22_at_2.08.24_PM_iskybj.jpg'],
      songs: ['Mayya Mayya'], video: 'k4Xt-O6ePys', ep: 'unmute-hyderabad-ep02-chinmayeem',
      quote: 'The venue and the song started to have a conversation with me.',
      bio: 'An A.R. Rahman fan, Chinmayee brought Mayya Mayya to the stage in Telugu, over an arrangement she had never sung before. The song opens with no music at all, just a voice in the open, so she spent the seconds before it humming quietly to find her note.' },
    { slug: 'akshita-pola', name: 'Akshita Pola', ed: 'hyderabad-2026', does: 'Carnatic classical',
      with: 'Koundinya Pannala on violin, Kolipaka Veeraswamy on mridangam',
      line: 'Carnatic vocalist and Artium learner',
      photos: ['cl:v1787978684/Screenshot_2026-08-29_at_9.45.38_AM_bxbgqk.jpg', 'cl:v1787978684/Akshita_Pola_jgxsyc.png'],
      songs: ['Govardhana Giridhara'], video: 'R2puVY3V-ZQ', ep: 'unmute-hyderabad-ep03-akshitap',
      quote: 'Most people enjoy other genres, as it is soothing and melodious to listen. I want to show them the power of Carnatic music.',
      bio: 'Her teacher told her to perform like a maestro, not like a student. So she did, and then dedicated the song to her.' },
    { slug: 'inaya-sharma', name: 'Inaya Sharma', ed: 'hyderabad-2026', does: 'Hindi film music', teacher: 'Abhishek Marotkar and Smriti Minocha',
      line: 'Vocalist and Artium learner',
      photos: ['cl:v1789020696/Screenshot_2026-09-10_at_11.40.30_AM_hxu07t.heic', 'cl:v1789020696/Screenshot_2026-09-10_at_11.36.40_AM_rycbz5.heic'],
      songs: ['Ye Ishq Hai'], video: 'xJ1EzqtsKFw', ep: 'unmute-hyderabad-ep04-inayas',
      quote: 'A song looks very easy, but if you dive deep into the song, then you will know that the song is hard.',
      bio: 'One voice, one microphone, and a 2007 film song rebuilt into something closer to rock. She walked on thinking “those who keep trying never truly fail.” She walked off looking for her parents’ faces.' },
    { slug: 'anvitha-gantasala', name: 'Anvitha Gantasala', ed: 'hyderabad-2026', does: 'Telugu film music',
      line: 'Vocalist and Artium learner',
      photos: ['yt:mA_tKjFTiiQ:1 @36%', 'yt:mA_tKjFTiiQ:2 @38%'],
      songs: ['Shakkalaka Baby'], video: 'mA_tKjFTiiQ', ep: 'unmute-hyderabad-ag',
      quote: 'It feels like a western song and a rap song at once. I just tried to own it, and stay in full josh.',
      bio: 'Anvitha took on A.R. Rahman’s Shakkalaka Baby, a song that swings between a pop hook and rap verses.' },
    { slug: 'alyna-shaikh', name: 'Alyna Shaikh', ed: 'hyderabad-2026', does: 'Hindi film music', teacher: 'Debadrita',
      line: 'Vocalist and Artium learner',
      photos: ['cl:v1790576936/Screenshot_2026-09-28_at_11.21.34_AM_axrq8c.png', 'cl:v1790576935/Screenshot_2026-09-28_at_11.20.49_AM_ifpcmc.png'],
      songs: ['Ghodey Pe Sawaar'], video: '825f7Nn2DFk', ep: 'unmute-hyderabad-as',
      quote: 'The unMute version gave me the freedom to express the emotions in my own way.',
      bio: 'Alyna sang Ghodey Pe Sawaar from Qala, written by Amit Trivedi and Amitabh Bhattacharya. Right before she began, she thought of her teacher, Debadrita, and gave herself one instruction: enjoy it.' },

    /* ---- Mumbai, Dec 2025 (names and videos from Artium's YouTube channel) ---- */
    { slug: 'abhijeet-thakur', name: 'Abhijeet Thakur', ed: 'mumbai-2025', role: 'Head of Talent Development & Originals, Artium', line: 'Head of Talent Development & Originals, Artium Academy',
      photos: ['clw:v1778843633/AT_SJ_tzpz1n.jpg'], vids: [{ id: '700HvOcGf-4', song: 'Tum Ho x Khaabon Ke Parindey', with: 'Shrey Jadav' }], ep: 'unmute-mum-at&sj',
      quote: 'We weren’t going to put this out. It was just for the room. But some things are too good to stay inside a room.',
      bio: 'A bossa nova reinterpretation of Tum Ho leading into Khaabon Ke Parindey. The team tried it with learners first, it never quite clicked, so two people who work at Artium every day, one on talent and one on content, got up and did it themselves.' },
    { slug: 'shrey-jadav', name: 'Shrey Jadav', ed: 'mumbai-2025', role: 'GM, Content and Social Media, Artium', line: 'GM, Content and Social Media, Artium Academy',
      photos: ['clw:v1778843633/AT_SJ_tzpz1n.jpg'], vids: [{ id: '700HvOcGf-4', song: 'Tum Ho x Khaabon Ke Parindey', with: 'Abhijeet Thakur' }], ep: 'unmute-mum-at&sj',
      quote: 'We weren’t going to put this out. It was just for the room. But some things are too good to stay inside a room.' },
    { slug: 'hridaya-dande', name: 'Hridaya Dande', ed: 'mumbai-2025', photos: ['yt:U7FDQc14Vgw:2 @40%', 'yt:U7FDQc14Vgw:0 @28%'],
      vids: [{ id: 'U7FDQc14Vgw', song: 'Thode Badmash' }, { id: 'Ut2d6kSqAFA', song: 'Badal Pe Paon Hai', with: 'Prissha Cholera' }] },
    { slug: 'prissha-cholera', name: 'Prissha Cholera', ed: 'mumbai-2025', photos: ['yt:0IJtc5Ji9iM:2 @45%', 'yt:0IJtc5Ji9iM:0 @0%'],
      vids: [{ id: '0IJtc5Ji9iM', song: 'Jiya Re' }, { id: 'Ut2d6kSqAFA', song: 'Badal Pe Paon Hai', with: 'Hridaya Dande' }] },
    { slug: 'neev-kanani', name: 'Neev Kanani', ed: 'mumbai-2025', photos: ['yt:OgKnGj5L5Fo:0 @17%'], vids: [{ id: 'OgKnGj5L5Fo', song: 'Mere Naam Tu' }] },
    { slug: 'abhishek-marotkar', name: 'Abhishek Marotkar', ed: 'mumbai-2025', role: 'Artium teacher', photos: ['yt:S0VNwOoyYZ0:0 @14%'],
      vids: [{ id: 'S0VNwOoyYZ0', song: 'Khel Mandala' }, { id: 'vcypATSglXY', song: 'Chappa Chappa', with: 'Jaydeep' }] },
    { slug: 'jaydeep', name: 'Jaydeep Bagwadkar', ed: 'mumbai-2025', role: 'Head of Performance, Artium Academy', photos: ['yt:vcypATSglXY:0 @0%'],
      vids: [{ id: 'vcypATSglXY', song: 'Chappa Chappa', with: 'Abhishek Marotkar' }] },
    { slug: 'sudhanshu-shome', name: 'Sudhanshu Shome', ed: 'mumbai-2025', role: 'Artium teacher', photos: ['yt:981RlPuL39U:2 @54%', 'yt:981RlPuL39U:0 @14%'], vids: [{ id: '981RlPuL39U', song: 'Zamaana Lage' }] },
    { slug: 'shalini-bairagi', name: 'Shalini Bairagi', ed: 'mumbai-2025', role: 'Artium teacher', photos: ['yt:E469HHvNbeM:0 @5%'], vids: [{ id: 'E469HHvNbeM', song: 'Salona Sa Sajan' }] },
    { slug: 'lekhashree-rajashekhar', name: 'Lekhashree Rajashekhar', ed: 'mumbai-2025', photos: ['yt:EUxpadZYVNI:0 @10%'], vids: [{ id: 'EUxpadZYVNI', song: 'Skyfall' }] },

    /* ---- Bangalore, Oct 2025 (names and videos from Artium's YouTube channel) ---- */
    { slug: 'aradhya-rao', name: 'Aradhya Rao', ed: 'bangalore-2025', does: 'Hindustani classical', photos: ['yt:J4BMC6lsPdg:1 @54%', 'yt:J4BMC6lsPdg:2 @54%'],
      vids: [{ id: 'J4BMC6lsPdg', song: 'Kabhi Neem Neem' }, { id: 'T6PudGH1yp4', song: 'Kehna Hi Kya x Pardesiya', with: 'Rohit Sundar' }, { id: 'ia_pp2HnSZU', song: 'Bahara x Khabar Nahi', with: 'Rohit Sundar' }] },
    { slug: 'rohit-sundar', name: 'Rohit Sundar', ed: 'bangalore-2025', photos: ['yt:8YY47vMI1GQ:3 @54%', 'yt:8YY47vMI1GQ:2 @40%'],
      vids: [{ id: '8YY47vMI1GQ', song: 'Bolna' }, { id: 'T6PudGH1yp4', song: 'Kehna Hi Kya x Pardesiya', with: 'Aradhya Rao' }, { id: 'ia_pp2HnSZU', song: 'Bahara x Khabar Nahi', with: 'Aradhya Rao' }] },
    { slug: 'sparsh-singhal', name: 'Sparsh Singhal', ed: 'bangalore-2025', photos: ['yt:Gprj7NRsib0:2 @37%'],
      vids: [{ id: 'Gprj7NRsib0', song: 'O Rangrez' }, { id: 'BrbQJYvKyhQ', song: 'Moh Moh Ke Dhaage x Agar Tum Saath Ho', with: 'Ananya S G' }] },
    { slug: 'ananya-s-g', name: 'Ananya S G', ed: 'bangalore-2025', photos: ['yt:9xBfhGA2F2I:1 @65%', 'yt:9xBfhGA2F2I:2 @50%'],
      vids: [{ id: '9xBfhGA2F2I', song: 'Gilehriyaan' }, { id: 'BrbQJYvKyhQ', song: 'Moh Moh Ke Dhaage x Agar Tum Saath Ho', with: 'Sparsh Singhal' }] },
    { slug: 'tejashree-kulkarni', name: 'Tejashree Kulkarni', ed: 'bangalore-2025', role: 'Artium teacher', photos: ['yt:1Kjr7pRAonA:2 @40%', 'yt:1Kjr7pRAonA:3 @72%'],
      vids: [{ id: '1Kjr7pRAonA', song: 'Aaj Jaane Ki Zid Na Karo' }] },

    /* ---- Chennai, Feb 2026 (names and videos from Artium's YouTube channel) ---- */
    { slug: 'prashanthine-saravanan', name: 'Prashanthine Saravanan', ed: 'chennai-2026', does: 'Carnatic classical', role: 'Artium teacher', line: 'Carnatic vocalist and Artium teacher',
      photos: ['yt:T0EbAplp7ow:0 @0%'], vids: [{ id: 'T0EbAplp7ow', song: 'E Taavunaraa' }] },
    { slug: 'ahana-balaji', name: 'Ahana Balaji', ed: 'chennai-2026', photos: ['yt:h0yPQL2i3NE:1 @28%', 'yt:h0yPQL2i3NE:0 @0%'], vids: [{ id: 'h0yPQL2i3NE', song: 'Snehidhane' }] },
    { slug: 'aairah-singh', name: 'Aairah Singh', ed: 'chennai-2026', photos: ['yt:zfrRiUW48uY:0 @5%'], vids: [{ id: 'zfrRiUW48uY', song: 'The Climb' }] },
    { slug: 'ridhudev', name: 'Ridhudev', ed: 'chennai-2026', photos: ['yt:wZyXwiZFTxs:1 @17%', 'yt:wZyXwiZFTxs:0 @10%'], vids: [{ id: 'wZyXwiZFTxs', song: 'Kannukkulla' }] },
    { slug: 'vinisha-vinoth', name: 'Vinisha Vinoth', ed: 'chennai-2026', photos: ['yt:-E7BeS3biTk:2 @40%', 'yt:-E7BeS3biTk:1 @23%'], vids: [{ id: '-E7BeS3biTk', song: 'Yaarumilla' }] },
    { slug: 'swarthamikaa', name: 'Swarthamikaa', ed: 'chennai-2026', photos: ['yt:qWxe53KyZzc:2 @54%', 'yt:qWxe53KyZzc:1 @50%'], vids: [{ id: 'qWxe53KyZzc', song: 'Malargal Kaettaen' }] },
    { slug: 'emilin', name: 'Emilin', ed: 'chennai-2026', photos: ['yt:YDMLSihoY3s:1 @46%', 'yt:YDMLSihoY3s:0 @5%'], vids: [{ id: 'YDMLSihoY3s', song: 'Ammadi Ammadi' }] },

    /* ---- London, 25 Jul 2026 (from Abhijeet; newsletters to follow) ---- */
    { slug: 'thanika-varunkumar', name: 'Thanika Varunkumar', ed: 'london-2026', does: 'Carnatic classical', line: 'Carnatic vocalist and Artium learner',
      photos: ['yt:cHwaOTW3W_s:2 @46%', 'yt:cHwaOTW3W_s:0 @36%'], vids: [{ id: 'cHwaOTW3W_s', song: 'Mooladhara Moorthy' }], ep: 'unmute-london-tv',
      quote: 'In rehearsal I was stuck worrying about the audience and voice glitches. On stage I remembered, the goal isn’t perfection.',
      bio: 'Thanika sang Mooladhara Moorthy, a kriti to Lord Ganesha. On stage, she said, the mridangam felt like a heartbeat.',
      posts: [{ type: 'story', date: '2026-11-18', url: 'https://artium-newsletters.vercel.app/unmute-london-tv' }] },
    { slug: 'preksha-mathur', name: 'Preksha Mathur', ed: 'london-2026', line: 'Vocalist and Artium learner',
      photos: ['yt:Bg0IC9r5qiE:2 @65%', 'yt:Bg0IC9r5qiE:1 @72%'], vids: [{ id: 'Bg0IC9r5qiE', song: 'Aage Bhi Jaane Na Tu' }], ep: 'unmute-london-pm',
      posts: [{ type: 'story', date: '2026-11-18', url: 'https://artium-newsletters.vercel.app/unmute-london-pm' }] },
    { slug: 'sudheesh-kakkunath', name: 'Sudheesh Kakkunath', ed: 'london-2026', line: 'Vocalist and Artium learner',
      photos: ['yt:rv0HpfKsSoE:2 @60%', 'yt:rv0HpfKsSoE:0 @32%'], vids: [{ id: 'rv0HpfKsSoE', song: 'Tu Jo Mila' }] },
    { slug: 'minnu-elsa-varghese', name: 'Minnu Elsa Varghese', ed: 'london-2026', line: 'Vocalist and Artium learner',
      photos: ['yt:6mXIgY4jVTg:2 @50%', 'yt:6mXIgY4jVTg:1 @42%'], vids: [{ id: '6mXIgY4jVTg', song: 'Chahun Main Ya Naa' }] },
    { slug: 'rajat-nigam', name: 'Rajat Nigam', ed: 'london-2026', line: 'Artium learner' },

    // Mumbai, December 2026 (7 of 11 so far)
    { slug: 'ian-daniel', name: 'Ian Daniel', ed: 'mumbai-2026' },
    { slug: 'anay-pratapwar', name: 'Anay Pratapwar', ed: 'mumbai-2026' },
    { slug: 'apeksha-panchal', name: 'Apeksha Panchal', ed: 'mumbai-2026' },
    { slug: 'aadya-mohanty', name: 'Aadya Mohanty', ed: 'mumbai-2026' },
    { slug: 'sarah-shinde', name: 'Sarah Shinde', ed: 'mumbai-2026' },
    { slug: 'anvita-mohod', name: 'Anvita Mohod', ed: 'mumbai-2026' },
    { slug: 'kaustubh-bagchi', name: 'Kaustubh Bagchi', ed: 'mumbai-2026' },
    { slug: 'radnyee-marotkar', name: 'Radnyee Marotkar', ed: 'mumbai-2026' },


    /* ---- Kolkata, 22 Jan 2027 (source: Kolkata lineup page) ---- */
    { slug: 'subhankar-banerjee', name: 'Subhankar Banerjee', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729065/Subhankar_qjyrba.png'] },
    { slug: 'drohan-chakroborty', name: 'Drohan Chakroborty', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Drohan_eutehn.png'] },
    { slug: 'anik-thakurta', name: 'Anik Thakurta', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_crop,x_0.033,y_0.0923,w_0.785,h_0.562,fl_relative/c_fill,w_600,h_750,q_auto,f_auto/v1789729068/Anik_eviii6.jpg'] },
    { slug: 'romi-roy-chowdhury', name: 'Romi Roy Chowdhury', ed: 'kolkata-2027', with: 'duet with Suparno Bhowmick', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729062/Romi_upqh0a.png'] },
    { slug: 'suparno-bhowmick', name: 'Suparno Bhowmick', ed: 'kolkata-2027', with: 'duet with Romi Roy Chowdhury', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729062/Suparno_lke83v.jpg'] },
    { slug: 'sreshtha-haldar', name: 'Sreshtha Haldar', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_crop,x_0.2879,y_0.0720,w_0.4046,h_0.4115,fl_relative/c_fill,w_600,h_750,q_auto,f_auto/v1789729059/Sreshtha_chczii.png'] },
    { slug: 'tanula-chakroborty', name: 'Tanula Chakroborty', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Tanula_ychd8d.png'] },
    { slug: 'sohini-chandra', name: 'Sohini Chandra', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789747254/Sohini_edmlco.png'] },
    { slug: 'rahul-mishra', name: 'Rahul Mishra', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Rahul_a9groy.png'] },
    { slug: 'aindrila-chakraborty', name: 'Aindrila Chakraborty', ed: 'kolkata-2027', photos: ['https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729063/Aindrila_pdfa7r.jpg'] }
  ]
};

/* Artists with a vids list: their songs and main video come from it. */
window.UNMUTE.artists.forEach(function (a) {
  if (a.vids && a.vids.length) { a.songs = a.vids.map(function (v) { return v.song; }); a.video = a.video || a.vids[0].id; }
});
/* LOCAL PHOTOS: written by tools/photos.py, do not edit */
(function (L) {
  window.UNMUTE.focus = L.focus;   // where the face is in each photo (0..1), so crops keep it in view
  window.UNMUTE.editions.forEach(function (e) { if (L.groups[e.id]) e.group = L.groups[e.id]; });
  window.UNMUTE.artists.forEach(function (a) {
    if (L.artists[a.slug]) a.photos = L.artists[a.slug];
    if (L.lineup[a.slug]) a.lineupPhoto = L.lineup[a.slug];
    if (L.hero[a.slug]) a.heroPhoto = L.hero[a.slug];
    if (L.about[a.slug]) a.aboutPhoto = L.about[a.slug];
    if (L.aboutTall[a.slug]) a.aboutTall = L.aboutTall[a.slug];
  });
})({
 "artists": {
  "abhijeet-thakur": [
   "img/mumbai-2025/abhijeet-thakur-1.jpg",
   "img/mumbai-2025/abhijeet-thakur-2.jpg"
  ],
  "shrey-jadav": [
   "img/mumbai-2025/shrey-jadav-1.jpg",
   "img/mumbai-2025/shrey-jadav-2.jpg"
  ],
  "hridaya-dande": [
   "img/mumbai-2025/hridaya-dande-1.jpg",
   "img/mumbai-2025/hridaya-dande-2.jpg"
  ],
  "prissha-cholera": [
   "img/mumbai-2025/prissha-cholera-1.jpg",
   "img/mumbai-2025/prissha-cholera-2.jpg"
  ],
  "neev-kanani": [
   "img/mumbai-2025/neev-kanani-1.jpg",
   "img/mumbai-2025/neev-kanani-2.jpg"
  ],
  "abhishek-marotkar": [
   "img/mumbai-2025/abhishek-marotkar-1.jpg",
   "img/mumbai-2025/abhishek-marotkar-2.jpg"
  ],
  "jaydeep": [
   "img/mumbai-2025/jaydeep-1.jpg",
   "img/mumbai-2025/jaydeep-2.jpg"
  ],
  "sudhanshu-shome": [
   "img/mumbai-2025/sudhanshu-shome-1.jpg",
   "img/mumbai-2025/sudhanshu-shome-2.jpg"
  ],
  "shalini-bairagi": [
   "img/mumbai-2025/shalini-bairagi-1.jpg",
   "img/mumbai-2025/shalini-bairagi-2.jpg"
  ],
  "lekhashree-rajashekhar": [
   "img/mumbai-2025/lekhashree-rajashekhar-1.jpg",
   "img/mumbai-2025/lekhashree-rajashekhar-2.jpg"
  ],
  "prashanthine-saravanan": [
   "img/chennai-2026/prashanthine-saravanan-1.jpg",
   "img/chennai-2026/prashanthine-saravanan-2.jpg"
  ],
  "ahana-balaji": [
   "img/chennai-2026/ahana-balaji-1.jpg",
   "img/chennai-2026/ahana-balaji-2.jpg"
  ],
  "aairah-singh": [
   "img/chennai-2026/aairah-singh-1.jpg",
   "img/chennai-2026/aairah-singh-2.jpg"
  ],
  "ridhudev": [
   "img/chennai-2026/ridhudev-1.jpg",
   "img/chennai-2026/ridhudev-2.jpg"
  ],
  "emilin": [
   "img/chennai-2026/emilin-1.jpg",
   "img/chennai-2026/emilin-2.jpg"
  ],
  "thanika-varunkumar": [
   "img/london-2026/thanika-varunkumar-1.jpg",
   "img/london-2026/thanika-varunkumar-2.jpg"
  ],
  "sudheesh-kakkunath": [
   "img/london-2026/sudheesh-kakkunath-1.jpg",
   "img/london-2026/sudheesh-kakkunath-2.jpg"
  ]
 },
 "groups": {},
 "lineup": {
  "ian-daniel": "img/mumbai-2026/ian-daniel-lineup.jpg",
  "anay-pratapwar": "img/mumbai-2026/anay-pratapwar-lineup.jpg",
  "apeksha-panchal": "img/mumbai-2026/apeksha-panchal-lineup.jpg",
  "aadya-mohanty": "img/mumbai-2026/aadya-mohanty-lineup.jpg",
  "sarah-shinde": "img/mumbai-2026/sarah-shinde-lineup.jpg",
  "anvita-mohod": "img/mumbai-2026/anvita-mohod-lineup.jpg",
  "kaustubh-bagchi": "img/mumbai-2026/kaustubh-bagchi-lineup.jpg",
  "radnyee-marotkar": "img/mumbai-2026/radnyee-marotkar-lineup.jpg"
 },
 "hero": {
  "bhavya-tumuluru": "img/hyderabad-2026/bhavya-tumuluru-hero.jpg",
  "pt-gayathri": "img/hyderabad-2026/pt-gayathri-hero.jpg",
  "chinmayee-madha": "img/hyderabad-2026/chinmayee-madha-hero.jpg",
  "akshita-pola": "img/hyderabad-2026/akshita-pola-hero.jpg",
  "inaya-sharma": "img/hyderabad-2026/inaya-sharma-hero.jpg",
  "anvitha-gantasala": "img/hyderabad-2026/anvitha-gantasala-hero.jpg",
  "alyna-shaikh": "img/hyderabad-2026/alyna-shaikh-hero.jpg",
  "abhijeet-thakur": "img/mumbai-2025/abhijeet-thakur-hero.jpg",
  "hridaya-dande": "img/mumbai-2025/hridaya-dande-hero.jpg",
  "prissha-cholera": "img/mumbai-2025/prissha-cholera-hero.jpg",
  "neev-kanani": "img/mumbai-2025/neev-kanani-hero.jpg",
  "abhishek-marotkar": "img/mumbai-2025/abhishek-marotkar-hero.jpg",
  "sudhanshu-shome": "img/mumbai-2025/sudhanshu-shome-hero.jpg",
  "shalini-bairagi": "img/mumbai-2025/shalini-bairagi-hero.jpg",
  "lekhashree-rajashekhar": "img/mumbai-2025/lekhashree-rajashekhar-hero.jpg",
  "aradhya-rao": "img/bangalore-2025/aradhya-rao-hero.jpg",
  "rohit-sundar": "img/bangalore-2025/rohit-sundar-hero.jpg",
  "sparsh-singhal": "img/bangalore-2025/sparsh-singhal-hero.jpg",
  "ananya-s-g": "img/bangalore-2025/ananya-s-g-hero.jpg",
  "tejashree-kulkarni": "img/bangalore-2025/tejashree-kulkarni-hero.jpg",
  "prashanthine-saravanan": "img/chennai-2026/prashanthine-saravanan-hero.jpg",
  "ahana-balaji": "img/chennai-2026/ahana-balaji-hero.jpg",
  "aairah-singh": "img/chennai-2026/aairah-singh-hero.jpg",
  "ridhudev": "img/chennai-2026/ridhudev-hero.jpg",
  "vinisha-vinoth": "img/chennai-2026/vinisha-vinoth-hero.jpg",
  "swarthamikaa": "img/chennai-2026/swarthamikaa-hero.jpg",
  "emilin": "img/chennai-2026/emilin-hero.jpg",
  "thanika-varunkumar": "img/london-2026/thanika-varunkumar-hero.jpg",
  "preksha-mathur": "img/london-2026/preksha-mathur-hero.jpg",
  "sudheesh-kakkunath": "img/london-2026/sudheesh-kakkunath-hero.jpg",
  "minnu-elsa-varghese": "img/london-2026/minnu-elsa-varghese-hero.jpg"
 },
 "about": {
  "bhavya-tumuluru": "img/hyderabad-2026/bhavya-tumuluru-about.jpg",
  "pt-gayathri": "img/hyderabad-2026/pt-gayathri-about.jpg",
  "alyna-shaikh": "img/hyderabad-2026/alyna-shaikh-about.jpg",
  "thanika-varunkumar": "img/london-2026/thanika-varunkumar-about.jpg",
  "preksha-mathur": "img/london-2026/preksha-mathur-about.jpg"
 },
 "aboutTall": {
  "pt-gayathri": "img/hyderabad-2026/pt-gayathri-about-tall.jpg"
 },
 "focus": {
  "clw:v1778843633/AT_SJ_tzpz1n.jpg": [
   0.285,
   0.198
  ],
  "clw:v1780150465/WhatsApp_Image_2026-05-29_at_3.48.13_PM_dlcpas.jpg": [
   0.454,
   0.418
  ],
  "clw:v1791348629/Screenshot_2026-10-07_at_10.10.00_AM_r21uxz.png": [
   0.508,
   0.334
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_crop,x_0.033,y_0.0923,w_0.785,h_0.562,fl_relative/c_fill,w_600,h_750,q_auto,f_auto/v1789729068/Anik_eviii6.jpg": [
   0.527,
   0.358
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_crop,x_0.2879,y_0.0720,w_0.4046,h_0.4115,fl_relative/c_fill,w_600,h_750,q_auto,f_auto/v1789729059/Sreshtha_chczii.png": [
   0.544,
   0.363
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Drohan_eutehn.png": [
   0.464,
   0.255
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Rahul_a9groy.png": [
   0.463,
   0.323
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729059/Tanula_ychd8d.png": [
   0.514,
   0.255
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729062/Romi_upqh0a.png": [
   0.402,
   0.289
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729062/Suparno_lke83v.jpg": [
   0.501,
   0.301
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729063/Aindrila_pdfa7r.jpg": [
   0.53,
   0.308
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789729065/Subhankar_qjyrba.png": [
   0.505,
   0.329
  ],
  "https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_face,w_600,h_750,q_auto,f_auto/v1789747254/Sohini_edmlco.png": [
   0.506,
   0.276
  ],
  "img/bangalore-2025/ananya-s-g-hero.jpg": [
   0.623,
   0.459
  ],
  "img/bangalore-2025/aradhya-rao-hero.jpg": [
   0.534,
   0.345
  ],
  "img/bangalore-2025/rohit-sundar-hero.jpg": [
   0.545,
   0.398
  ],
  "img/bangalore-2025/sparsh-singhal-hero.jpg": [
   0.484,
   0.278
  ],
  "img/bangalore-2025/tejashree-kulkarni-hero.jpg": [
   0.559,
   0.392
  ],
  "img/chennai-2026/aairah-singh-1.jpg": [
   0.45,
   0.197
  ],
  "img/chennai-2026/aairah-singh-2.jpg": [
   0.534,
   0.281
  ],
  "img/chennai-2026/aairah-singh-hero.jpg": [
   0.452,
   0.195
  ],
  "img/chennai-2026/ahana-balaji-1.jpg": [
   0.516,
   0.239
  ],
  "img/chennai-2026/ahana-balaji-2.jpg": [
   0.485,
   0.403
  ],
  "img/chennai-2026/ahana-balaji-hero.jpg": [
   0.544,
   0.241
  ],
  "img/chennai-2026/emilin-1.jpg": [
   0.537,
   0.311
  ],
  "img/chennai-2026/emilin-2.jpg": [
   0.455,
   0.305
  ],
  "img/chennai-2026/emilin-hero.jpg": [
   0.494,
   0.314
  ],
  "img/chennai-2026/prashanthine-saravanan-1.jpg": [
   0.871,
   0.47
  ],
  "img/chennai-2026/prashanthine-saravanan-2.jpg": [
   0.484,
   0.375
  ],
  "img/chennai-2026/prashanthine-saravanan-hero.jpg": [
   0.512,
   0.453
  ],
  "img/chennai-2026/ridhudev-1.jpg": [
   0.456,
   0.351
  ],
  "img/chennai-2026/ridhudev-2.jpg": [
   0.556,
   0.262
  ],
  "img/chennai-2026/ridhudev-hero.jpg": [
   0.463,
   0.348
  ],
  "img/chennai-2026/swarthamikaa-hero.jpg": [
   0.478,
   0.227
  ],
  "img/chennai-2026/vinisha-vinoth-hero.jpg": [
   0.456,
   0.294
  ],
  "img/hyderabad-2026/akshita-pola-hero.jpg": [
   0.56,
   0.428
  ],
  "img/hyderabad-2026/alyna-shaikh-about.jpg": [
   0.578,
   0.311
  ],
  "img/hyderabad-2026/alyna-shaikh-hero.jpg": [
   0.532,
   0.354
  ],
  "img/hyderabad-2026/anvitha-gantasala-hero.jpg": [
   0.346,
   0.319
  ],
  "img/hyderabad-2026/bhavya-tumuluru-about.jpg": [
   0.465,
   0.248
  ],
  "img/hyderabad-2026/bhavya-tumuluru-hero.jpg": [
   0.47,
   0.233
  ],
  "img/hyderabad-2026/chinmayee-madha-hero.jpg": [
   0.481,
   0.25
  ],
  "img/hyderabad-2026/inaya-sharma-hero.jpg": [
   0.475,
   0.272
  ],
  "img/hyderabad-2026/pt-gayathri-about-tall.jpg": [
   0.528,
   0.308
  ],
  "img/hyderabad-2026/pt-gayathri-about.jpg": [
   0.511,
   0.284
  ],
  "img/hyderabad-2026/pt-gayathri-hero.jpg": [
   0.535,
   0.423
  ],
  "img/london-2026/minnu-elsa-varghese-hero.jpg": [
   0.531,
   0.319
  ],
  "img/london-2026/preksha-mathur-about.jpg": [
   0.706,
   0.236
  ],
  "img/london-2026/preksha-mathur-hero.jpg": [
   0.544,
   0.203
  ],
  "img/london-2026/sudheesh-kakkunath-1.jpg": [
   0.419,
   0.402
  ],
  "img/london-2026/sudheesh-kakkunath-2.jpg": [
   0.276,
   0.419
  ],
  "img/london-2026/sudheesh-kakkunath-hero.jpg": [
   0.517,
   0.232
  ],
  "img/london-2026/thanika-varunkumar-1.jpg": [
   0.869,
   0.365
  ],
  "img/london-2026/thanika-varunkumar-2.jpg": [
   0.911,
   0.347
  ],
  "img/london-2026/thanika-varunkumar-about.jpg": [
   0.469,
   0.369
  ],
  "img/london-2026/thanika-varunkumar-hero.jpg": [
   0.587,
   0.366
  ],
  "img/mumbai-2025/abhijeet-thakur-1.jpg": [
   0.437,
   0.197
  ],
  "img/mumbai-2025/abhijeet-thakur-2.jpg": [
   0.297,
   0.247
  ],
  "img/mumbai-2025/abhijeet-thakur-hero.jpg": [
   0.397,
   0.185
  ],
  "img/mumbai-2025/abhishek-marotkar-1.jpg": [
   0.464,
   0.207
  ],
  "img/mumbai-2025/abhishek-marotkar-2.jpg": [
   0.355,
   0.277
  ],
  "img/mumbai-2025/abhishek-marotkar-hero.jpg": [
   0.445,
   0.203
  ],
  "img/mumbai-2025/hridaya-dande-1.jpg": [
   0.609,
   0.271
  ],
  "img/mumbai-2025/hridaya-dande-2.jpg": [
   0.605,
   0.28
  ],
  "img/mumbai-2025/hridaya-dande-hero.jpg": [
   0.543,
   0.268
  ],
  "img/mumbai-2025/jaydeep-1.jpg": [
   0.345,
   0.45
  ],
  "img/mumbai-2025/jaydeep-2.jpg": [
   0.305,
   0.219
  ],
  "img/mumbai-2025/lekhashree-rajashekhar-1.jpg": [
   0.411,
   0.355
  ],
  "img/mumbai-2025/lekhashree-rajashekhar-2.jpg": [
   0.633,
   0.343
  ],
  "img/mumbai-2025/lekhashree-rajashekhar-hero.jpg": [
   0.415,
   0.355
  ],
  "img/mumbai-2025/neev-kanani-1.jpg": [
   0.416,
   0.2
  ],
  "img/mumbai-2025/neev-kanani-2.jpg": [
   0.472,
   0.191
  ],
  "img/mumbai-2025/neev-kanani-hero.jpg": [
   0.564,
   0.204
  ],
  "img/mumbai-2025/prissha-cholera-1.jpg": [
   0.795,
   0.267
  ],
  "img/mumbai-2025/prissha-cholera-2.jpg": [
   0.471,
   0.334
  ],
  "img/mumbai-2025/prissha-cholera-hero.jpg": [
   0.615,
   0.27
  ],
  "img/mumbai-2025/shalini-bairagi-1.jpg": [
   0.651,
   0.327
  ],
  "img/mumbai-2025/shalini-bairagi-2.jpg": [
   0.678,
   0.342
  ],
  "img/mumbai-2025/shalini-bairagi-hero.jpg": [
   0.579,
   0.326
  ],
  "img/mumbai-2025/shrey-jadav-1.jpg": [
   0.562,
   0.231
  ],
  "img/mumbai-2025/shrey-jadav-2.jpg": [
   0.475,
   0.245
  ],
  "img/mumbai-2025/shrey-jadav-hero.jpg": [
   0.522,
   0.268
  ],
  "img/mumbai-2025/sudhanshu-shome-1.jpg": [
   0.649,
   0.268
  ],
  "img/mumbai-2025/sudhanshu-shome-2.jpg": [
   0.626,
   0.235
  ],
  "img/mumbai-2025/sudhanshu-shome-hero.jpg": [
   0.642,
   0.277
  ],
  "img/mumbai-2026/aadya-mohanty-lineup.jpg": [
   0.545,
   0.347
  ],
  "img/mumbai-2026/anay-pratapwar-lineup.jpg": [
   0.475,
   0.313
  ],
  "img/mumbai-2026/anvita-mohod-lineup.jpg": [
   0.499,
   0.302
  ],
  "img/mumbai-2026/apeksha-panchal-lineup.jpg": [
   0.527,
   0.287
  ],
  "img/mumbai-2026/ian-daniel-lineup.jpg": [
   0.5,
   0.352
  ],
  "img/mumbai-2026/kaustubh-bagchi-lineup.jpg": [
   0.453,
   0.304
  ],
  "img/mumbai-2026/radnyee-marotkar-lineup.jpg": [
   0.465,
   0.251
  ],
  "img/mumbai-2026/sarah-shinde-lineup.jpg": [
   0.475,
   0.2
  ],
  "yt:-E7BeS3biTk:1": [
   0.418,
   0.286
  ],
  "yt:-E7BeS3biTk:2": [
   0.457,
   0.271
  ],
  "yt:0IJtc5Ji9iM:0": [
   0.232,
   0.185
  ],
  "yt:0IJtc5Ji9iM:2": [
   0.487,
   0.29
  ],
  "yt:1Kjr7pRAonA:2": [
   0.558,
   0.355
  ],
  "yt:1Kjr7pRAonA:3": [
   0.565,
   0.325
  ],
  "yt:6mXIgY4jVTg:1": [
   0.49,
   0.352
  ],
  "yt:6mXIgY4jVTg:2": [
   0.565,
   0.359
  ],
  "yt:8YY47vMI1GQ:2": [
   0.542,
   0.404
  ],
  "yt:8YY47vMI1GQ:3": [
   0.538,
   0.444
  ],
  "yt:981RlPuL39U:0": [
   0.328,
   0.223
  ],
  "yt:981RlPuL39U:2": [
   0.488,
   0.255
  ],
  "yt:9xBfhGA2F2I:1": [
   0.644,
   0.333
  ],
  "yt:9xBfhGA2F2I:2": [
   0.643,
   0.385
  ],
  "yt:Bg0IC9r5qiE:1": [
   0.668,
   0.295
  ],
  "yt:Bg0IC9r5qiE:2": [
   0.559,
   0.297
  ],
  "yt:E469HHvNbeM:0": [
   0.33,
   0.229
  ],
  "yt:EUxpadZYVNI:0": [
   0.346,
   0.241
  ],
  "yt:Gprj7NRsib0:2": [
   0.501,
   0.26
  ],
  "yt:IDqxB9fVExY:1": [
   0.543,
   0.345
  ],
  "yt:J4BMC6lsPdg:1": [
   0.536,
   0.292
  ],
  "yt:J4BMC6lsPdg:2": [
   0.538,
   0.28
  ],
  "yt:OgKnGj5L5Fo:0": [
   0.273,
   0.253
  ],
  "yt:S0VNwOoyYZ0:0": [
   0.278,
   0.218
  ],
  "yt:T0EbAplp7ow:0": [
   0.312,
   0.267
  ],
  "yt:U7FDQc14Vgw:0": [
   0.407,
   0.195
  ],
  "yt:U7FDQc14Vgw:2": [
   0.539,
   0.241
  ],
  "yt:YDMLSihoY3s:0": [
   0.224,
   0.225
  ],
  "yt:YDMLSihoY3s:1": [
   0.488,
   0.262
  ],
  "yt:cHwaOTW3W_s:0": [
   0.512,
   0.244
  ],
  "yt:cHwaOTW3W_s:2": [
   0.561,
   0.294
  ],
  "yt:h0yPQL2i3NE:0": [
   0.307,
   0.222
  ],
  "yt:h0yPQL2i3NE:1": [
   0.401,
   0.216
  ],
  "yt:mA_tKjFTiiQ:1": [
   0.444,
   0.189
  ],
  "yt:mA_tKjFTiiQ:2": [
   0.484,
   0.2
  ],
  "yt:qWxe53KyZzc:1": [
   0.519,
   0.235
  ],
  "yt:qWxe53KyZzc:2": [
   0.514,
   0.241
  ],
  "yt:rv0HpfKsSoE:0": [
   0.517,
   0.229
  ],
  "yt:rv0HpfKsSoE:2": [
   0.784,
   0.426
  ],
  "yt:vcypATSglXY:0": [
   0.256,
   0.188
  ],
  "yt:wZyXwiZFTxs:0": [
   0.285,
   0.238
  ],
  "yt:wZyXwiZFTxs:1": [
   0.36,
   0.446
  ],
  "yt:zfrRiUW48uY:0": [
   0.311,
   0.226
  ]
 }
});
/* END LOCAL PHOTOS */
