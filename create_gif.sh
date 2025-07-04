#!/bin/bash

# Create animated GIF of LED strip animations
echo "Creating animated GIF..."

# Create a temporary directory for frames
mkdir -p /tmp/gif_frames

# Take multiple screenshots for animation
for i in {1..10}; do
    echo "Capturing frame $i/10..."
    npx playwright-cli screenshot --viewport-size=1200x800 --wait-for-timeout=200 http://localhost:3000 /tmp/gif_frames/frame_$(printf "%02d" $i).png
    sleep 0.3
done

# Install imagemagick if needed and create GIF
if command -v convert &> /dev/null; then
    echo "Creating GIF with imagemagick..."
    convert -delay 30 -loop 0 /tmp/gif_frames/frame_*.png screenshots/light-strip-demo.gif
    echo "GIF created: screenshots/light-strip-demo.gif"
else
    echo "ImageMagick not available. GIF creation skipped."
fi

# Cleanup
rm -rf /tmp/gif_frames
echo "Done!"