/* unMute site: shared helpers. Needs data.js loaded first. */
(function () {
  var D = window.UNMUTE;
  var ROOT = document.body.getAttribute('data-root') || '';
  var LOGO = '<svg width="645" height="229" viewBox="0 0 645 229" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect class="bar" x="71" y="144.479" width="29" height="5" rx="2.5" fill="#4B28E3"/> <rect class="bar" x="71" y="136.479" width="29" height="5" rx="2.5" fill="#762ECE"/> <rect class="bar" x="71" y="128.479" width="29" height="5" rx="2.5" fill="#B43DB3"/> <rect class="bar" x="71" y="120.479" width="29" height="5" rx="2.5" fill="#C658BF"/> <rect class="bar" x="71" y="112.479" width="29" height="5" rx="2.5" fill="#D379D4"/> <path d="M278.74 74.8469C291.725 74.8469 302.026 78.78 309.643 86.6461C317.384 94.5123 321.255 105.438 321.255 119.422V180.479H289.415V123.73C289.415 116.987 287.605 111.805 283.984 108.185C280.488 104.439 275.618 102.566 269.375 102.566C263.132 102.566 258.2 104.439 254.58 108.185C251.083 111.805 249.335 116.987 249.335 123.73V180.479H217.496V123.73C217.496 116.987 215.686 111.805 212.065 108.185C208.569 104.439 203.699 102.566 197.456 102.566C191.213 102.566 186.281 104.439 182.66 108.185C179.164 111.805 177.416 116.987 177.416 123.73V180.479H145.389V75.9706H177.416V89.0809C180.662 84.7108 184.908 81.2772 190.152 78.78C195.396 76.1579 201.327 74.8469 207.944 74.8469C215.81 74.8469 222.803 76.5325 228.921 79.9037C235.164 83.2749 240.033 88.082 243.529 94.325C247.15 88.5815 252.082 83.8992 258.325 80.2783C264.568 76.6573 271.373 74.8469 278.74 74.8469Z" fill="currentColor"/> <path d="M446.85 75.9706V180.479H414.824V166.244C411.577 170.864 407.145 174.61 401.526 177.482C396.032 180.229 389.914 181.602 383.172 181.602C375.181 181.602 368.126 179.854 362.008 176.358C355.89 172.737 351.145 167.556 347.774 160.813C344.403 154.071 342.717 146.142 342.717 137.027V75.9706H374.556V132.72C374.556 139.712 376.367 145.143 379.988 149.014C383.609 152.884 388.478 154.82 394.596 154.82C400.839 154.82 405.771 152.884 409.392 149.014C413.013 145.143 414.824 139.712 414.824 132.72V75.9706H446.85Z" fill="currentColor"/> <path d="M528.102 153.321V180.479H511.808C500.196 180.479 491.144 177.669 484.651 172.05C478.158 166.307 474.912 157.005 474.912 144.144V102.566H462.176V75.9706H474.912V50.4991H506.938V75.9706H527.915V102.566H506.938V144.519C506.938 147.64 507.688 149.888 509.186 151.261C510.684 152.635 513.181 153.321 516.677 153.321H528.102Z" fill="currentColor"/> <path d="M644.456 126.539C644.456 129.536 644.269 132.657 643.894 135.903H571.413C571.912 142.396 573.973 147.391 577.594 150.887C581.339 154.258 585.897 155.944 591.266 155.944C599.257 155.944 604.813 152.572 607.935 145.83H642.021C640.273 152.697 637.089 158.878 632.47 164.372C627.975 169.865 622.294 174.173 615.426 177.295C608.559 180.416 600.88 181.977 592.39 181.977C582.151 181.977 573.036 179.792 565.045 175.422C557.054 171.052 550.811 164.809 546.316 156.693C541.821 148.577 539.574 139.087 539.574 128.225C539.574 117.362 541.759 107.872 546.129 99.7565C550.624 91.6405 556.867 85.3975 564.858 81.0274C572.849 76.6573 582.026 74.4723 592.39 74.4723C602.503 74.4723 611.493 76.5949 619.359 80.8402C627.225 85.0854 633.344 91.1411 637.714 99.0073C642.209 106.873 644.456 116.051 644.456 126.539ZM611.68 118.111C611.68 112.617 609.807 108.247 606.062 105.001C602.316 101.754 597.634 100.131 592.015 100.131C586.646 100.131 582.089 101.692 578.343 104.813C574.722 107.935 572.474 112.367 571.6 118.111H611.68Z" fill="currentColor"/> <path d="M29.1007 107.55V179.025C29.1007 186.173 30.8592 191.675 34.3762 195.532C37.8932 199.39 43.0554 201.319 49.8625 201.319C56.6697 201.319 61.8885 199.39 65.519 195.532C69.1495 191.675 70.9647 186.173 70.9647 179.025V152.249H100.065V178.855C100.065 189.519 97.7963 198.539 93.2582 205.913C88.7201 213.288 82.5937 218.847 74.8789 222.591C67.2775 226.335 58.7686 228.207 49.352 228.207C39.9354 228.207 31.4832 226.392 23.9953 222.761C16.6208 219.017 10.778 213.458 6.46681 206.084C2.1556 198.596 0 189.519 0 178.855V107.55H29.1007Z" fill="currentColor"/> <path d="M96.2134 75.8271C107.708 75.8271 116.857 79.5805 123.66 87.0872C130.58 94.4766 134.04 104.681 134.04 117.7V179.979H104.131V121.747C104.131 115.179 102.43 110.076 99.0285 106.44C95.627 102.804 91.0526 100.986 85.3053 100.986C79.558 100.986 74.9836 102.804 71.5821 106.44C68.1807 110.076 66.4799 115.179 66.4799 121.747V175.056H36.3945V76.8828H66.4799V89.9022C69.5295 85.5624 73.6347 82.1609 78.7956 79.6978C83.9564 77.1174 89.7624 75.8271 96.2134 75.8271Z" fill="currentColor"/> <circle cx="51.3953" cy="175.915" r="15.0008" fill="currentColor"/> <path d="M49.117 53.037C47.3657 53.037 45.709 52.8003 44.147 52.327C42.585 51.8537 41.1887 51.1673 39.958 50.268C38.7273 49.3213 37.7333 48.1617 36.976 46.789C36.266 45.369 35.911 43.7123 35.911 41.819C35.911 39.405 36.3843 37.4407 37.331 35.926C38.2777 34.364 39.5557 33.1807 41.165 32.376C42.8217 31.5713 44.6913 31.027 46.774 30.743C48.8567 30.4117 51.034 30.246 53.306 30.246H60.619C60.619 28.5893 60.3587 27.1693 59.838 25.986C59.3173 24.7553 58.489 23.785 57.353 23.075C56.2643 22.365 54.8443 22.01 53.093 22.01C51.957 22.01 50.892 22.152 49.898 22.436C48.9513 22.6727 48.123 23.075 47.413 23.643C46.7503 24.1637 46.277 24.85 45.993 25.702H37.118C37.4493 23.7613 38.112 22.1047 39.106 20.732C40.1473 19.312 41.4017 18.1523 42.869 17.253C44.3837 16.3537 46.0403 15.691 47.839 15.265C49.6377 14.7917 51.46 14.555 53.306 14.555C58.7493 14.555 62.7017 16.117 65.163 19.241C67.6717 22.365 68.926 26.7433 68.926 32.376V52.54H61.258L61.045 47.712C59.9563 49.3213 58.6547 50.5047 57.14 51.262C55.6253 52.0193 54.158 52.4927 52.738 52.682C51.318 52.9187 50.111 53.037 49.117 53.037ZM50.821 46.008C52.7143 46.008 54.3947 45.653 55.862 44.943C57.3293 44.233 58.489 43.239 59.341 41.961C60.2403 40.683 60.69 39.2157 60.69 37.559V36.352H53.874C52.738 36.352 51.602 36.3993 50.466 36.494C49.3773 36.5413 48.3833 36.7307 47.484 37.062C46.5847 37.346 45.851 37.7957 45.283 38.411C44.7623 39.0263 44.502 39.902 44.502 41.038C44.502 42.174 44.786 43.097 45.354 43.807C45.9693 44.517 46.7503 45.0613 47.697 45.44C48.691 45.8187 49.7323 46.008 50.821 46.008Z" fill="currentColor"/> <path d="M77.1958 52.54V15.123H85.0768L85.5738 20.022C86.5205 18.602 87.5855 17.5133 88.7688 16.756C89.9995 15.9513 91.3012 15.3833 92.6738 15.052C94.0938 14.7207 95.5138 14.555 96.9338 14.555C97.4545 14.555 97.9278 14.555 98.3538 14.555C98.8272 14.555 99.2058 14.5787 99.4898 14.626V22.862H97.2178C94.7565 22.862 92.6738 23.3353 90.9698 24.282C89.2658 25.2287 87.9878 26.5777 87.1358 28.329C86.2838 30.0803 85.8578 32.234 85.8578 34.79V52.54H77.1958Z" fill="currentColor"/> <path d="M123.063 52.54C120.034 52.54 117.525 52.1377 115.537 51.333C113.596 50.5283 112.129 49.2267 111.135 47.428C110.188 45.6293 109.715 43.2153 109.715 40.186V22.791H103.964V15.123H109.715V4.686H118.377V15.123H127.11V22.791H118.377V39.05C118.377 40.9433 118.708 42.387 119.371 43.381C120.034 44.375 121.525 44.872 123.844 44.872H126.826V52.54H123.063Z" fill="currentColor"/> <path d="M132.873 52.54V15.123H141.535V52.54H132.873ZM137.204 10.792C135.547 10.792 134.222 10.295 133.228 9.301C132.234 8.307 131.737 7.00533 131.737 5.396C131.737 3.834 132.257 2.556 133.299 1.562C134.34 0.520666 135.642 0 137.204 0C138.718 0 140.02 0.496999 141.109 1.491C142.197 2.485 142.742 3.78667 142.742 5.396C142.742 7.00533 142.221 8.307 141.18 9.301C140.138 10.295 138.813 10.792 137.204 10.792Z" fill="currentColor"/> <path d="M166.472 53.037C161.076 53.037 156.935 51.6407 154.047 48.848C151.207 46.0553 149.787 41.7953 149.787 36.068V15.123H158.449V35.5C158.449 37.488 158.71 39.2157 159.23 40.683C159.798 42.1503 160.674 43.2863 161.857 44.091C163.088 44.8483 164.626 45.227 166.472 45.227C168.46 45.227 170.022 44.8247 171.158 44.02C172.342 43.168 173.17 42.0083 173.643 40.541C174.117 39.0737 174.353 37.3933 174.353 35.5V15.123H183.015V36.068C183.015 41.9373 181.548 46.2447 178.613 48.99C175.726 51.688 171.679 53.037 166.472 53.037Z" fill="currentColor"/> <path d="M191.253 52.54V15.123H199.205L199.773 19.383C200.72 18.105 201.738 17.1347 202.826 16.472C203.962 15.762 205.122 15.265 206.305 14.981C207.536 14.697 208.696 14.555 209.784 14.555C212.151 14.555 214.163 15.0283 215.819 15.975C217.523 16.9217 218.849 18.3417 219.795 20.235C220.742 18.9097 221.807 17.8447 222.99 17.04C224.174 16.188 225.428 15.5727 226.753 15.194C228.079 14.768 229.475 14.555 230.942 14.555C233.83 14.555 236.149 15.1703 237.9 16.401C239.652 17.5843 240.93 19.241 241.734 21.371C242.539 23.4537 242.941 25.844 242.941 28.542V52.54H234.279V31.311C234.279 30.3643 234.232 29.3703 234.137 28.329C234.043 27.2877 233.782 26.3173 233.356 25.418C232.978 24.5187 232.41 23.785 231.652 23.217C230.895 22.649 229.83 22.365 228.457 22.365C227.085 22.365 225.949 22.6727 225.049 23.288C224.197 23.856 223.487 24.637 222.919 25.631C222.399 26.5777 222.02 27.6427 221.783 28.826C221.594 29.962 221.499 31.098 221.499 32.234V52.54H212.837V31.24C212.837 30.3407 212.766 29.394 212.624 28.4C212.53 27.3587 212.293 26.3883 211.914 25.489C211.583 24.5423 211.015 23.785 210.21 23.217C209.453 22.649 208.388 22.365 207.015 22.365C205.027 22.365 203.513 22.9093 202.471 23.998C201.477 25.0867 200.791 26.412 200.412 27.974C200.081 29.536 199.915 31.027 199.915 32.447V52.54H191.253Z" fill="currentColor"/> </svg>';
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function logo(cls, label) { return LOGO.replace('<svg ', '<svg class="unmute-logo ' + (cls || '') + '" role="img" aria-label="' + (label || 'artium unMute') + '" '); }

  /* ---- dates (all shows are in India time; London is labelled by month) ---- */
  function parts(e) { var p = e.date.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  /* preview the site on another day: add ?preview=2027-01-10 to any URL (?preview=off to stop) */
  var PREVIEW = null;
  try {
    var pq = new URLSearchParams(location.search).get('preview');
    if (pq === 'off') sessionStorage.removeItem('um-preview');
    else if (/^\d{4}-\d{2}-\d{2}$/.test(pq || '')) sessionStorage.setItem('um-preview', pq);
    PREVIEW = sessionStorage.getItem('um-preview');
  } catch (err) {}
  function dayMs(s) { return Date.parse(s + 'T00:00:00+05:30'); }
  function now() { return PREVIEW ? dayMs(PREVIEW) + 12 * 36e5 : Date.now(); }
  function reached(s) { return !!s && now() >= dayMs(s); }
  function startMs(e) { return dayMs(e.date); }
  function isPast(e) { return now() >= startMs(e) + 864e5; }
  function daysTo(e) { return Math.ceil((startMs(e) - now()) / 864e5); }
  function dayLabel(s) { var p = s.split('-'); return DAYS[new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).getUTCDay()] + ' ' + (+p[2]) + ' ' + MONTHS[p[1] - 1]; }

  /* ---- after a show: the full performance unlocks on its `out` date, posts on theirs (see data.js) ---- */
  D.artists.forEach(function (a) {
    if (a.out && !reached(a.out)) { a.pending = true; a.video = null; a.vids = null; }
  });
  function ytId(v) { var m = /(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/.exec(v || ''); return m ? m[1] : /^[\w-]{11}$/.test(v || '') ? v : null; }
  function videoURL(v) { return /^[\w-]{11}$/.test(v || '') ? 'https://www.youtube.com/watch?v=' + v : v; }
  // how a post is described. On an artist's own page it gets a title; elsewhere the artist's name leads
  // and this short line sits under it. Any post can set its own `title` instead.
  var KIND = { practice: 'In rehearsal', intro: 'Profile', cut: 'On stage', photos: 'Photos', testimonial: 'After the show',
               performance: 'Full performance', story: 'The story', teaser: 'Teaser', reveal: 'The lineup', closing: 'Closing film' };
  function postTitle(x) {
    if (x.p.title) return x.p.title;
    var a = x.a, song = a && ((a.songs && a.songs[0]) || (a.vids && a.vids[0] && a.vids[0].song)), first = a && a.name.split(' ')[0], c = x.e.city;
    switch (x.p.type) {
      case 'practice': return song ? 'Rehearsing ' + song : 'In rehearsal';
      case 'intro': return first + '’s story';
      case 'cut': return song ? song + ', on stage' : 'On stage in ' + c;
      case 'photos': return 'Photos from ' + c;
      case 'testimonial': return 'After the show';
      case 'story': return song ? 'The story behind ' + song : first + '’s story';
      case 'performance': return song ? song + ', full performance' : 'Full performance';
      case 'teaser': return 'unMute ' + c + ', the teaser';
      case 'reveal': return 'The ' + c + ' lineup';
      case 'closing': return 'unMute ' + c + ', the closing film';
    }
    return 'New from unMute ' + c;
  }
  // everything that's out, newest first: { type, date, url, img, artist, edition }
  function feed(edId, slug) {
    var list = [];
    D.editions.forEach(function (e) { (e.posts || []).forEach(function (p) { list.push({ p: p, e: e }); }); });
    D.artists.forEach(function (a) {
      (a.posts || []).forEach(function (p) { list.push({ p: p, a: a, e: ed(a.ed) }); });
      if (a.out && a.video) list.push({ p: { type: 'performance', date: a.out, url: a.video }, a: a, e: ed(a.ed) });
    });
    return list.filter(function (x) { return x.p.date && reached(x.p.date) && (!edId || x.e.id === edId) && (!slug || (x.a && x.a.slug === slug)); })
      .sort(function (x, y) { return dayMs(y.p.date) - dayMs(x.p.date); });
  }
  function ageDays(x) { return (now() - dayMs(x.p.date)) / 864e5; }
  // a city is "live" while its posts are going out: something new in the last 14 days
  function isLive(e) { var f = feed(e.id); return isPast(e) && f.length > 0 && ageDays(f[0]) < 14; }
  function liveCities() { return D.editions.filter(isLive); }
  function postThumb(x) {
    if (x.p.img) return photo(x.p.img, 640, 800).src;
    var y = ytId(x.p.url); if (y) return 'https://i.ytimg.com/vi/' + y + '/hqdefault.jpg';
    if (x.a) {   // no picture of its own: rotate through the artist's photos and performance frames so cards differ
      var pool = (x.a.photos || []).concat(x.a.video ? [1, 2, 3].map(function (n) { return 'yt:' + x.a.video + ':' + n; }) : []);
      var i = (x.a.posts || []).indexOf(x.p);
      if (pool.length) return photo(pool[Math.max(0, i) % pool.length], 640, 800).src;
    }
    return x.e.postcard ? postcard(x.e, 640) : '';
  }
  function platform(x) { return x.p.type === 'story' ? 'The Stage' : /instagram\.com/.test(x.p.url) ? 'Instagram' : 'YouTube'; }
  function shortDay(s) { var p = s.split('-'); return (+p[2]) + ' ' + MONTHS[p[1] - 1].slice(0, 3); }
  // one post as a card; opens on Instagram or YouTube
  function postCard(x, withName) {
    var t = postThumb(x);
    return '<a class="post" href="' + esc(videoURL(x.p.url)) + '" target="_blank" rel="noopener">' +
      '<span class="pimg' + (t ? '' : ' none') + '">' + (t ? '<img src="' + esc(t) + '" alt="" loading="lazy">' : '') + '<i class="plat">' + platform(x) + '</i></span>' +
      '<b>' + esc(withName && x.a ? x.a.name : postTitle(x)) + '</b>' +
      '<small>' + esc(withName && x.a ? (x.p.title || KIND[x.p.type] || 'New') + ', ' : '') + shortDay(x.p.date) + '</small></a>';
  }

  /* when a page opens: if something went out in the last week, say so once */
  function announce(a) {
    var pick = (a && feed(null, a.slug)[0]) || feed()[0];
    if (!pick || ageDays(pick) >= 7) return;
    var key = 'um-seen-' + (pick.a ? pick.a.slug : pick.e.id) + '-' + pick.p.type + '-' + pick.p.date;
    try { if (sessionStorage.getItem(key)) return; } catch (err) {}
    var own = a && pick.a === a, t = postThumb(pick);
    var href = own || !pick.a ? videoURL(pick.p.url) : artistURL(pick.a.slug) + '#posts';
    var el = document.createElement('aside');
    el.className = 'announce'; el.setAttribute('aria-label', 'New from unMute');
    el.innerHTML = (t ? '<img src="' + esc(t) + '" alt="">' : '') +
      '<div><small>New from unMute ' + esc(pick.e.city) + '</small><b>' + esc(pick.a ? pick.a.name : postTitle(pick)) + '</b>' +
      '<span>' + esc(pick.a ? postTitle(pick) : 'Out now on ' + platform(pick)) + '</span></div>' +
      '<a class="btn" href="' + esc(href) + '"' + (own || !pick.a ? ' target="_blank" rel="noopener"' : '') + '>' + (own || !pick.a ? (pick.p.type === 'story' ? 'Read' : 'Watch') : 'See it') + '</a>' +
      '<button type="button" class="x" aria-label="Close">×</button>';
    function close() { el.classList.remove('on'); document.body.classList.remove('announcing'); try { sessionStorage.setItem(key, 1); } catch (err) {} }
    el.querySelector('.x').addEventListener('click', close);
    el.querySelector('.btn').addEventListener('click', close);
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add('on'); document.body.classList.add('announcing'); }, document.querySelector('.top.home') ? 2200 : 900);
  }
  function dateLong(e) { if (e.dateLabel) return e.dateLabel; var p = parts(e); return DAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()] + ' ' + p.d + ' ' + MONTHS[p.m - 1] + ' ' + p.y; }
  function dateMed(e) { if (e.dateLabel) return e.dateLabel; var p = parts(e); return p.d + ' ' + MONTHS[p.m - 1] + ' ' + p.y; }
  function year(e) { return parts(e).y; }

  function ed(id) { for (var i = 0; i < D.editions.length; i++) if (D.editions[i].id === id) return D.editions[i]; }
  function artistsOf(id) { return D.artists.filter(function (a) { return a.ed === id; }); }
  function artist(slug) { for (var i = 0; i < D.artists.length; i++) if (D.artists[i].slug === slug) return D.artists[i]; }
  function upcoming() { return D.editions.filter(function (e) { return !isPast(e); }).sort(function (a, b) { return startMs(a) - startMs(b); }); }
  function past() { return D.editions.filter(isPast).sort(function (a, b) { return startMs(b) - startMs(a); }); }
  function nextShow() { var u = upcoming().filter(function (e) { return !e.tba; }); return u[0]; }

  /* ---- links ---- */
  function artistURL(slug) { return ROOT + 'artist/index.html?a=' + slug; }
  function editionURL(e) { return e.page && !isPast(e) ? ROOT + e.page : ROOT + 'edition/index.html?e=' + e.id; }
  // The Stage: Artium's home for performance stories (newsletters)
  var STAGE = 'https://artium-stage.vercel.app';
  function trial(campaign, content) { return 'https://register.artiumacademy.com/?utm_source=UNMUTE&utm_medium=SITE&utm_campaign=' + campaign + (content ? '&utm_content=' + content : ''); }

  /* ---- photos ---- */
  function photo(p, w, h, full) {   // full: no cropping, original shape, up to w pixels wide
    var pos = '50%', m = p.match(/\s@(\d+%)$/);
    if (m) { pos = m[1]; p = p.replace(m[0], ''); }
    var src = p;
    if (full && /^clw?:/.test(p)) src = 'https://res.cloudinary.com/dd7s6bb58/image/upload/c_limit,w_' + (w || 2400) + ',q_auto,f_auto/' + p.replace(/^clw?:/, '');
    else if (p.indexOf('clw:') === 0) src = 'https://res.cloudinary.com/dd7s6bb58/image/upload/c_fill,g_auto,w_' + (w || 600) + ',h_' + (h || 750) + ',q_auto,f_auto/' + p.slice(4);
    else if (p.indexOf('cl:') === 0) src = 'https://res.cloudinary.com/dd7s6bb58/image/upload/c_thumb,g_face,z_0.7,w_' + (w || 600) + ',h_' + (h || 750) + ',q_auto,f_auto/' + p.slice(3);
    else if (p.indexOf('yt:') === 0) { var q = p.split(':'); src = 'https://i.ytimg.com/vi/' + q[1] + '/' + (q[2] === '0' ? 'maxresdefault' : 'maxres' + (q[2] || 1)) + '.jpg'; }
    else if (p.indexOf('img/') === 0) src = ROOT + p;   // local photo published by tools/photos.py
    // where the face is (found by tools/photos.py): crops keep it in view. Cloudinary face crops already do.
    var f = D.focus && D.focus[p], op = null;
    if (f && p.indexOf('cl:') !== 0 && !(p.indexOf('clw:') === 0 && !full)) op = Math.round(f[0] * 100) + '% ' + Math.round(f[1] * 100) + '%';
    return { src: src, pos: pos, op: op };
  }
  function postcard(e, w) { return 'https://res.cloudinary.com/dd7s6bb58/image/upload/' + e.postcardCrop + '/c_scale,w_' + (w || 600) + '/q_auto,f_auto/' + e.postcard.slice(3); }

  /* ---- what someone is, for lineups: "Vocalist & Artium Learner". Set `desig` on an artist to override ---- */
  function desig(a) {
    if (a.desig) return a.desig;
    var t = (a.line || '') + ' ' + (a.role || '');
    if (/head of|gm,|director|founder/i.test(t)) return (a.role || a.line).replace(/, Artium( Academy)?$/, '');
    var what = /carnatic vocal/i.test(t) ? 'Carnatic Vocalist' : /hindustani vocal/i.test(t) ? 'Hindustani Vocalist' : /vocal/i.test(t) || (a.vids && a.vids.length) || a.pending ? 'Vocalist' : '';
    var who = /mentor/i.test(t) ? 'Artium Mentor' : /teacher/i.test(t) ? 'Artium Teacher' : 'Artium Learner';
    return what ? what + ' & ' + who : who;
  }

  /* ---- artist card ---- */
  function card(a, opts) {
    opts = opts || {};
    var e = ed(a.ed), ph = a.photos || [], inner;
    if (ph.length) {
      var A = photo(ph[0]), B = ph[1] ? photo(ph[1]) : null;
      inner = '<img class="a" src="' + A.src + '" style="object-position:' + (A.op || A.pos + ' 30%') + '" alt="" loading="lazy">' +
              (B ? '<img class="b" src="' + B.src + '" style="object-position:' + (B.op || B.pos + ' 30%') + '" alt="" loading="lazy">' : '');
    } else {
      var ini = a.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
      inner = '<div class="noph">' + esc(ini) + '<small>Photo to come</small></div>';
    }
    var sub = opts.sub || desig(a);
    return '<a class="acard' + (ph[1] ? ' flip' : '') + '" href="' + artistURL(a.slug) + '"><div class="ph' + (ph.length ? '' : ' empty') + '">' + inner + '</div><h3>' + esc(a.name) + '</h3><p>' + esc(sub) + '</p></a>';
  }

  /* ---- header / footer ---- */
  function header(active, mode) {
    var home = mode === 'home';
    var links = [['Shows', ROOT + 'index.html#shows', 'shows'], ['Artists', ROOT + 'artists/index.html', 'artists'], ['Watch', ROOT + 'index.html#watch', 'watch'], ['Editions', ROOT + 'index.html#editions', 'editions'], ['The Stage', STAGE, 'stage']];
    var nav = links.map(function (l) { return '<a href="' + l[1] + '"' + (l[2] === 'stage' ? ' target="_blank" rel="noopener"' : '') + (l[2] === active ? ' aria-current="page"' : '') + '>' + l[0] + '</a>'; }).join('');
    return '<header class="top' + (home ? ' home' : mode === 'dark' ? ' dark' : '') + '"><div class="wrap">' +
      (home ? '<span class="mark mark-slot" aria-hidden="true"></span>' : '<a class="mark" href="' + ROOT + 'index.html" aria-label="unMute home">' + logo('', 'artium unMute') + '</a>') +
      '<nav aria-label="Main"><span class="navlinks">' + nav + '</span><a class="btn light" href="' + trial('NAV') + '">Book a free class</a></nav>' +
      '</div><div class="mnav">' + nav + '</div></header>';
  }
  function footer() {
    return '<footer class="foot"><div class="wrap">' +
      '<div><a class="mark" href="' + ROOT + 'index.html" aria-label="unMute home">' + logo('', 'artium unMute') + '</a></div>' +
      '<div><h4>unMute</h4><ul><li><a href="' + ROOT + 'index.html#shows">Upcoming shows</a></li><li><a href="' + ROOT + 'artists/index.html">The artists</a></li><li><a href="' + ROOT + 'index.html#watch">Watch</a></li><li><a href="' + ROOT + 'index.html#editions">Every edition</a></li></ul></div>' +
      '<div><h4>Artium Academy</h4><ul><li><a href="https://www.artiumacademy.com" target="_blank" rel="noopener">artiumacademy.com</a></li><li><a href="https://www.youtube.com/channel/UCb4wuyVXjQ_a3_jVXi9hgPg" target="_blank" rel="noopener">YouTube</a></li><li><a href="' + STAGE + '" target="_blank" rel="noopener">The Stage</a></li><li><a href="' + trial('FOOTER') + '">Book a free class</a></li></ul></div>' +
      '<div><h4>Find us</h4><address><a href="https://www.google.com/maps/search/?api=1&query=Artium+Academy+Gundecha+Onclave+Khairani+Rd+Andheri+Mumbai+400072" target="_blank" rel="noopener">Artium Academy, 5th Floor, D Wing, Gundecha Onclave, 5D2, Khairani Rd, Andheri, Ansa Industrial Estate, Chandivali, Saki Naka, Mumbai, Maharashtra 400072</a></address></div>' +
      '<p class="fine">unMute is a live performance series by Artium Academy.</p>' +
      '</div></footer>';
  }

  /* ---- next-show bar ---- */
  function nextbar(showAfter) {
    var e = nextShow(); if (!e) return;
    var d = daysTo(e), when = d <= 0 ? 'Tonight' : d === 1 ? 'Tomorrow' : d + ' days to go';
    var a = document.createElement('a');
    a.className = 'nextbar'; a.href = editionURL(e);
    a.innerHTML = '<span><small>Next show, ' + when + '</small><b>' + esc(e.city) + ', ' + parts(e).d + ' ' + MONTHS[parts(e).m - 1].slice(0, 3) + '</b></span><span class="go">See the show</span>';
    document.body.appendChild(a);
    var limit = showAfter || 320;
    function check() { a.classList.toggle('show', window.scrollY > limit && (window.innerHeight + window.scrollY) < document.body.scrollHeight - 260); }
    window.addEventListener('scroll', check, { passive: true }); check();
  }

  /* ---- the mic in the logo works like a level meter: bars light from the bottom up ---- */
  function meter(svg) {
    var bars = Array.prototype.slice.call(svg.querySelectorAll('.bar')); // first bar in the file is the bottom one
    if (!bars.length) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(level) { bars.forEach(function (b, i) { b.style.opacity = i < level ? 1 : 0.14; }); }
    if (reduce) { show(5); return; }
    var level = 0, target = 5, t = 0;
    show(0);
    setTimeout(function tick() {                       // sweep up once, then behave like live audio
      t++;
      if (t > 6 && Math.random() < 0.35) target = 1 + Math.floor(Math.random() * 5);
      level += level < target ? 1 : level > target ? -1 : 0;
      if (level === target && t > 6) target = Math.max(1, Math.min(5, target + (Math.random() < 0.5 ? -2 : 2)));
      show(level);
      setTimeout(tick, 90 + Math.random() * 70);
    }, 700);
  }

  /* ---- behaviours ---- */
  function wire(root) {
    root = root || document;
    // phones have no hover: colour the card that's in the middle of the screen
    if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (x) { x.target.classList.toggle('lit', x.isIntersecting); }); }, { rootMargin: '-38% 0px -38% 0px' });
      root.querySelectorAll('.acard').forEach(function (c) { io.observe(c); });
    }
    root.querySelectorAll('[data-yt]').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
        f.title = b.getAttribute('aria-label') || 'unMute performance';
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
        b.parentNode.replaceChild(f, b);
      });
    });
  }

  function mount(active, mode) {
    var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
    if (h) h.outerHTML = header(active, mode);
    if (f) f.outerHTML = footer();
    // expose the header's height so other sticky things sit just below it
    var top = document.querySelector('.top');
    function hh() { if (top) document.documentElement.style.setProperty('--hh', top.offsetHeight + 'px'); }
    hh(); window.addEventListener('resize', hh);
    if (PREVIEW) {
      var pb = document.createElement('a');
      pb.href = '?preview=off'; pb.className = 'preview-badge';
      pb.textContent = 'Previewing ' + dayLabel(PREVIEW) + ' ' + PREVIEW.slice(0, 4) + '. Tap to stop.';
      document.body.appendChild(pb);
    }
  }

  window.UM = { D: D, ROOT: ROOT, esc: esc, logo: logo, ed: ed, artist: artist, artistsOf: artistsOf, upcoming: upcoming, past: past, nextShow: nextShow,
    isPast: isPast, daysTo: daysTo, now: now, reached: reached, dayLabel: dayLabel, ytId: ytId, videoURL: videoURL, feed: feed, isLive: isLive, liveCities: liveCities, postCard: postCard, announce: announce, KIND: KIND, desig: desig, postTitle: postTitle, shortDay: shortDay, dateLong: dateLong, dateMed: dateMed, year: year, parts: parts, MONTHS: MONTHS,
    meter: meter, artistURL: artistURL, editionURL: editionURL, trial: trial, photo: photo, postcard: postcard, card: card, mount: mount, nextbar: nextbar, wire: wire };
})();
