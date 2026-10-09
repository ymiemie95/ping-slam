# Ping-SLAM project page

Research project website and supplementary video for **Ping-SLAM: Real-Time Underwater SLAM for Low-Cost Mechanical Scanning Sonar**.

Website: https://ymiemie95.github.io/ping-slam/

This repository contains the project page, not the planned SLAM source-code release.

## Preview

Run `python3 -m http.server 8000` in this directory and open http://localhost:8000/.

## Publishing

In the repository **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/ (root)**. Saving triggers the Pages deployment. Further pushes to main update the website automatically.

The `.nojekyll` file makes this a static HTML deployment; there is no build step.

## Files

- `index.html`: project content and research results
- `assets/site.css`: responsive layout
- `assets/site.js`: video chapters, figure viewer, section navigation
- `assets/supplementary.mp4`: the original supplied video (1920 × 1080, about 81 seconds)
- `assets/chapters.vtt`: chapter navigation

The video is user-initiated, with native playback controls and a direct download. Research figures open in an accessible modal and remain available as image assets.
