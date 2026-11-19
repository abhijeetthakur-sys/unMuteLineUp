#!/bin/bash
# Double-click this file to get photos from the "photos" folder onto the website.
cd "$(dirname "$0")"
echo "unMute: publishing photos"
echo "-------------------------"
python3 tools/photos.py publish
echo
echo "Opening the folder so you can upload 'img' and 'data.js' to GitHub."
open .
echo
read -n 1 -s -r -p "Press any key to close this window."
