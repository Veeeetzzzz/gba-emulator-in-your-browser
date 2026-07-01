# GBA Emulator In Browser

This is a static browser app. It does not require Node.js, npm, a build step, or a local server.

Open `index.html` in a browser and load one or more legally backed up `.gba` ROMs using the file picker or drag-and-drop area.

## Files

- `index.html` - page markup and script/style references.
- `styles.css` - app styling.
- `gba-core.js` - vendored browser bundle for the GBA emulator core.
- `app.js` - UI, ROM loading, controls, and emulator wiring.
