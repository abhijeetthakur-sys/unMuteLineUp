// faces IMAGE...  -> one line per image: path<TAB>x<TAB>y   (where the face is, 0..1 from the top-left)
// or path<TAB>none when no face is found. Uses Apple's Vision face detection; nothing is uploaded anywhere.
// Several people in the photo (a duet, a group): the point is the middle of all the faces that matter.
import Foundation
import Vision

for path in CommandLine.arguments.dropFirst() {
  let url = URL(fileURLWithPath: path)
  let handler = VNImageRequestHandler(url: url, options: [:])
  let faces = VNDetectFaceRectanglesRequest()
  try? handler.perform([faces])
  var boxes = (faces.results ?? []).map { $0.boundingBox }
  if boxes.isEmpty {   // no face visible (turned away, in shadow): fall back to the upper body
    let body = VNDetectHumanRectanglesRequest(); body.upperBodyOnly = true
    try? handler.perform([body])
    boxes = (body.results ?? []).map { b in
      CGRect(x: b.boundingBox.minX, y: b.boundingBox.maxY - b.boundingBox.height * 0.35, width: b.boundingBox.width, height: b.boundingBox.height * 0.35)
    }
  }
  guard let biggest = boxes.max(by: { $0.width * $0.height < $1.width * $1.height }) else { print("\(path)\tnone"); continue }
  // keep faces at least a third the size of the biggest (the people the photo is about, not the audience)
  let main = boxes.filter { $0.width * $0.height >= biggest.width * biggest.height / 3 }
  let u = main.dropFirst().reduce(main[0]) { $0.union($1) }
  let x = u.midX
  let faceTop = 1 - u.maxY, faceMid = 1 - u.midY   // Vision measures from the bottom
  let y = (faceTop + faceMid) / 2                     // a little above the eyes, so the hair stays in
  print(String(format: "%@\t%.3f\t%.3f", path, Double(x), Double(y)))
}
