# Spotify Web Player Seek Shortcuts

A pure JavaScript userscript that adds intuitive keyboard shortcuts to the Spotify Web Player for a better listening experience.

## Features

- **Seek Forward**: Press the `Right Arrow` key to skip forward 10 seconds.
- **Seek Backward**: Press the `Left Arrow` key to skip backward 10 seconds.
- **Smart Input Detection**: Hotkeys are automatically disabled when you are typing in search bars, inputs, or textareas.
- **Modern Compatibility**: Uses `PointerEvent` and `MouseEvent` simulation to ensure compatibility with Spotify's React-based player logic.

## Installation

1. Install a userscript manager extension such as [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), or [Greasemonkey](https://www.greasespot.net/).
2. **Direct Install**: Click [here](https://github.com/charlee/spotify-hotkeys/raw/refs/heads/master/src/index.user.js) to install the script directly.
3. Alternatively, copy the contents of `src/index.user.js` and paste it into a new script in your manager.
4. Refresh your Spotify Web Player tab.

## Technical Details

The script targets Spotify's internal `data-testid` attributes (`progress-bar`, `playback-position`, `playback-duration`) to calculate and simulate click events on the progress bar. This bypasses the need for the Spotify API and works directly within the browser environment.
