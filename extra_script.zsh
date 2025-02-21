#!/bin/zsh
echo "🚀 Running Extra Zsh Script for PlatformIO!"


cd web
npm run build
echo "✅ React App Build Complete"


cd ..
rm -rf data
cp -r web/build/* data/
echo "✅ Copied React App to data/ folder"

mkdir -p data/api
cd src
cp whoDidWhatLast.json ../data/api/whoDidWhatLast.json
cd ..
echo "✅ Copied whoDidWhatLast.json to data/api folder"

pio run --target buildfs
pio run --target uploadfs
echo "✅ LittleFS Image Built and Uploaded!"