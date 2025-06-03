#!/bin/sh
cd "`dirname "$0"`"
( open http://localhost:8000/index.html || xdg-open http://localhost:8000/index.html ) &
python3 -m http.server
