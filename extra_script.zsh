#!/bin/zsh
echo "🚀 Running Extra Zsh Script for PlatformIO!"


cd web
npm run build
echo "✅ React App Build Complete"


cd ..
rm -rf data
mkdir data
cp -r web/build/* data/
echo "✅ Copied React App to data/ folder"


pio run --target buildfs
pio run --target uploadfs
echo "✅ LittleFS Image Built and Uploaded!"