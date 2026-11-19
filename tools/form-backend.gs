/**
 * unMute performer form: where answers go.
 *
 * Every time a performer sends the form at artiumunmute.vercel.app/form/, this script:
 *   1. adds a row to the "unMute performers" Google Sheet (one column per question),
 *   2. makes a folder for them in Drive:  unMute performer forms / <edition> / <name>,
 *   3. saves their photos there, a Google Doc and a PDF of their answers, and a .json copy,
 *   4. emails the PDF to the team, and a copy to the performer.
 *
 * Set up once (about 5 minutes), signed in to the Artium Google account:
 *   1. Open https://script.google.com, click "New project", paste this whole file, click Save.
 *   2. Put the team's email in TEAM_EMAIL below.
 *   3. Choose "setup" in the function menu at the top and click Run. Allow the permissions it asks for.
 *      It creates the sheet and the Drive folder and prints their links in the Execution log.
 *   4. Click Deploy > New deployment > the gear > Web app.
 *        Execute as: Me.   Who has access: Anyone.   Click Deploy and copy the Web app URL.
 *   5. Paste that URL into ENDPOINT near the top of the script in form/index.html, and publish the site.
 *
 * If you change this script later: Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy.
 * The URL stays the same.
 */
var TEAM_EMAIL = '';              // who gets every response, e.g. 'unmute@artiumacademy.com'. Several: separate with commas.
var SEND_PERFORMER_COPY = true;   // email performers a PDF of their own answers

function setup() {
  var p = PropertiesService.getScriptProperties();
  if (!p.getProperty('FOLDER')) p.setProperty('FOLDER', DriveApp.createFolder('unMute performer forms').getId());
  if (!p.getProperty('SHEET')) {
    var ss = SpreadsheetApp.create('unMute performers');
    ss.getSheets()[0].setName('Responses');
    var posts = ss.insertSheet('Posts');
    posts.getRange(1, 1, 1, 5).setValues([['Date posted', 'Artist', 'Type', 'Link', 'Title (optional)']]).setFontWeight('bold');
    posts.setFrozenRows(1);
    posts.getRange('A2:A').setNumberFormat('yyyy-mm-dd');
    posts.getRange('C2:C').setDataValidation(SpreadsheetApp.newDataValidation()
      .requireValueInList(['practice', 'intro', 'cut', 'photos', 'testimonial', 'teaser', 'reveal', 'closing'], true).build());
    posts.getRange('F1').setValue('Types: practice = practice clip, intro = photo and bio carousel, cut = performance cut, photos = photo carousel, ' +
      'testimonial = testimonial clip. For posts about the whole city (teaser, reveal, closing), write the city in the Artist column.')
      .setWrap(true).setFontColor('#777777');
    posts.setColumnWidth(4, 360); posts.setColumnWidth(6, 420);
    DriveApp.getFileById(ss.getId()).moveTo(DriveApp.getFolderById(p.getProperty('FOLDER')));
    p.setProperty('SHEET', ss.getId());
  }
  Logger.log('Responses sheet: ' + SpreadsheetApp.openById(p.getProperty('SHEET')).getUrl());
  Logger.log('Drive folder: ' + DriveApp.getFolderById(p.getProperty('FOLDER')).getUrl());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var d = JSON.parse(e.postData.contents);
    var a = d.answers || {}, p = PropertiesService.getScriptProperties();
    var name = clean(a.name) || 'Unnamed', edition = clean(a.edition) || 'No edition';
    var partLabel = d.part === 'after' ? 'After the show' : 'Performer form';

    // folder: unMute performer forms / Kolkata, January 2027 / Sohini Chandra
    var root = DriveApp.getFolderById(p.getProperty('FOLDER'));
    var edF = child(root, edition), me = child(edF, name);
    var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HHmm');

    // photos
    (d.photos || []).forEach(function (ph, i) {
      var bytes = Utilities.base64Decode(ph.data.split(',')[1]);
      me.createFile(Utilities.newBlob(bytes, 'image/jpeg', (i + 1) + ' ' + clean(ph.name || 'photo.jpg')));
    });

    // a readable document, then a PDF of it
    var doc = DocumentApp.create(name + ', ' + partLabel + ', ' + stamp);
    var body = doc.getBody();
    body.appendParagraph(name).setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph(partLabel + '. unMute ' + edition + '. ' + (a.role || '') + '. Sent ' + stamp + ' IST.');
    (d.readable || []).forEach(function (s) {
      body.appendParagraph(s.section).setHeading(DocumentApp.ParagraphHeading.HEADING1);
      s.items.forEach(function (x) {
        body.appendParagraph(x.q).setHeading(DocumentApp.ParagraphHeading.HEADING3);
        body.appendParagraph(x.a || 'Not answered').setItalic(!x.a);
      });
    });
    if ((d.photos || []).length) body.appendParagraph((d.photos.length) + ' photos saved in this folder.').setItalic(true);
    doc.saveAndClose();
    var docFile = DriveApp.getFileById(doc.getId());
    docFile.moveTo(me);
    var pdf = me.createFile(docFile.getAs('application/pdf')).setName(name + ', ' + partLabel + '.pdf');
    me.createFile(Utilities.newBlob(JSON.stringify(d.answers, null, 1), 'application/json', name + ', ' + partLabel + '.json'));

    // one row in the sheet, one column per question
    var sh = SpreadsheetApp.openById(p.getProperty('SHEET')).getSheetByName('Responses');
    var fixed = ['Sent (IST)', 'Part', 'Name', 'Edition', 'Role', 'Folder', 'PDF'];
    var head = sh.getLastColumn() ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0] : [];
    if (!head.length) { head = fixed.slice(); sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold'); sh.setFrozenRows(1); }
    Object.keys(a).forEach(function (k) { if (head.indexOf(k) < 0) { head.push(k); sh.getRange(1, head.length).setValue(k).setFontWeight('bold'); } });
    var row = head.map(function () { return ''; });
    var vals = { 'Sent (IST)': stamp, 'Part': partLabel, 'Name': name, 'Edition': edition, 'Role': a.role || '', 'Folder': me.getUrl(), 'PDF': pdf.getUrl() };
    head.forEach(function (h, i) { row[i] = h in vals ? vals[h] : (Array.isArray(a[h]) ? a[h].join('; ') : (a[h] == null ? '' : a[h])); });
    sh.appendRow(row);

    // emails
    var subject = 'unMute ' + edition + ': ' + name + ' (' + partLabel + ')';
    if (TEAM_EMAIL) MailApp.sendEmail({ to: TEAM_EMAIL, subject: subject, attachments: [pdf.getBlob()],
      body: name + ' sent the ' + partLabel.toLowerCase() + '.\n\nFolder: ' + me.getUrl() + '\nSheet: ' + sh.getParent().getUrl() });
    if (SEND_PERFORMER_COPY && /^\S+@\S+\.\S+$/.test(a.email || '')) MailApp.sendEmail({ to: a.email, subject: 'Your unMute answers', attachments: [pdf.getBlob()],
      body: 'Hi ' + name.split(' ')[0] + ',\n\nThank you for filling in the unMute form. A copy of your answers is attached.\n' +
            'We will send you the written version to approve before anything is published.\n\nThe unMute team, Artium Academy' });

    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function child(parent, name) { var it = parent.getFoldersByName(name); return it.hasNext() ? it.next() : parent.createFolder(name); }
function clean(s) { return String(s || '').replace(/[\/\\:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
