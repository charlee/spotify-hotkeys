# Gemini Project Guidelines

## Project Overview
This project is a pure JavaScript userscript for the Spotify Web Player. Its primary goal is to extend the player's functionality with custom hotkeys without relying on external libraries or the official Spotify API.

## Engineering Mandates

- **Implementation Style**: Use "Pure JS" (Vanilla JavaScript). No external dependencies or heavy frameworks.
- **DOM Stability**: Spotify frequently updates its UI. Always prefer `data-testid` selectors over obfuscated CSS classes (e.g., `.mS_99_...`).
- **Event Simulation**: Modern Spotify uses `PointerEvent`. When simulating seeks or clicks, ensure a sequence of `pointerdown` and `pointerup` is used to trigger internal state changes correctly.
- **Context Awareness**: Always verify that the user is not currently focused on an input element (`INPUT`, `TEXTAREA`, `isContentEditable`) before triggering hotkey logic.

## Development Workflow

1. **Research**: If hotkeys stop working, check `spotify.html` (if provided) or search for recent Spotify DOM changes.
2. **Precision**: Apply surgical updates to `src/index.user.js`.
3. **Verification**: Confirm that time parsing logic handles various formats (e.g., `M:SS`, `H:MM:SS`) and ignores hidden whitespace/characters.
