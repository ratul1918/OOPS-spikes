# 🐛 Troubleshooting Guide

## Common Issues & Solutions

### ❌ Game won't start / Black screen

**Problem:** Canvas appears but game won't load

**Solutions:**
1. **Check browser console (F12)** for JavaScript errors
2. **Clear browser cache** - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
3. **Try a different browser** - Chrome recommended
4. **Check file paths** - Ensure all `src/` files are in correct location
5. **Check internet connection** - Some browsers require local server

### ❌ Game is very slow / Laggy

**Problem:** FPS drops, stuttering, or slow response

**Solutions:**
1. **Close other browser tabs** - Free up memory
2. **Disable browser extensions** - They can interfere with performance
3. **Run in fullscreen** - Can improve performance
4. **Try Chrome** - Generally best performance
5. **Reduce screen resolution** - Try smaller monitor or zoom out browser

### ❌ Controls not responding

**Problem:** Arrow keys or spacebar don't work

**Solutions:**
1. **Click on canvas first** - Make sure canvas has focus
2. **Check if controls are reversed** - You'll see a red overlay if so
3. **Try different keys** - Some keyboards have key conflicts
4. **Disable browser hotkeys** - Some browsers capture arrow keys
5. **Try gamepad** (if implemented) - Connect USB controller

### ❌ Goal won't appear / Exit not showing

**Problem:** Can't find the exit to complete level

**Solutions:**
1. **Press M** - View level map to locate goal
2. **Look in corners** - Goal can be placed anywhere
3. **Wait for goal to spawn** - Sometimes delayed
4. **Restart level** - Press F5 to refresh and try again
5. **Enable debug mode** - Shows object positions

### ❌ Spikes appear randomly / Hit detection wrong

**Problem:** Getting hit by invisible spikes or spikes acting weird

**Solutions:**
1. **This is intentional** - Hidden spikes reveal when near
2. **Watch your distance** - Spikes trigger at 40px range
3. **Use level map** - See spike patterns (M key)
4. **Move slowly** - Give yourself time to react
5. **Build up spike immunity** - Dies are part of learning!

### ❌ Game crashes after many levels

**Problem:** Lag or crash after playing long sessions

**Solutions:**
1. **Refresh page** - F5 or Cmd+R
2. **Close other apps** - Free up RAM
3. **Restart browser** - Clear memory
4. **Update browser** - Check for updates
5. **Report bug** - File issue on GitHub

### ❌ Audio not working (if implemented)

**Problem:** No sound effects or music

**Solutions:**
1. **Check volume** - System volume turned up?
2. **Check browser audio** - Browser volume slider
3. **Check permissions** - Browser may block audio
4. **Try different browser** - Audio APIs vary
5. **Refresh page** - Sometimes helps with audio init

---

## Performance Optimization

### For Slow Computers

1. **Disable animations** in `css/styles.css`:
   ```css
   .shake, .flip { animation: none; }
   ```

2. **Reduce canvas resolution** in `src/constants.js`:
   ```javascript
   CANVAS_WIDTH: 600,  // was 800
   CANVAS_HEIGHT: 450, // was 600
   ```

3. **Increase difficulty spacing** to skip levels faster

4. **Use Firefox** instead of Chrome (sometimes better for slower systems)

### For Best Performance

1. **Use Chrome or Edge** - Best canvas performance
2. **Close unnecessary tabs** - Reduce memory pressure
3. **Run fullscreen** - Better GPU utilization
4. **Disable extensions** - Reduce overhead
5. **Update drivers** - Latest GPU drivers help

---

## Mobile Troubleshooting

### Game too small on mobile

1. **Pinch to zoom** - Zoom in on canvas
2. **Rotate to landscape** - Better for gameplay
3. **Use full-screen mode** - Some browsers support this

### Touch controls not working

- Currently not implemented - mouse/keyboard only
- Planned for future update

### Mobile crashes

1. **Close other apps** - Free up memory
2. **Use landscape orientation** - Reduces screen complexity
3. **Try Safari** instead of Chrome on iOS
4. **Close tabs** - Keep memory available

---

## File Structure Issues

### Missing files error

**Error:** `Uncaught ReferenceError: GAME_CONFIG is not defined`

**Solution:** Check that ALL files are in correct locations:
```
index.html
src/
  ├── constants.js       ← Must exist
  ├── level-generator.js ← Must exist
  ├── physics.js         ← Must exist
  ├── rendering.js       ← Must exist
  └── game.js            ← Must exist
css/
  └── styles.css         ← Must exist
```

### Incorrect file paths

**Error:** 404 Not Found errors in console

**Solution:** Verify paths are relative to `index.html`:
- ✅ Correct: `<script src="src/constants.js"></script>`
- ❌ Wrong: `<script src="/src/constants.js"></script>`
- ❌ Wrong: `<script src="./src/constants.js"></script>`

### CSS not loading

**Error:** Game loads but styling looks broken

**Solution:** Check CSS file path in `index.html`:
- ✅ Correct: `<link rel="stylesheet" href="css/styles.css">`
- Path should be relative to HTML file location

---

## Browser-Specific Issues

### Chrome
- ✅ Best performance overall
- Issue: Some ad blockers interfere
- Solution: Whitelist site or disable extension

### Firefox
- ✅ Good performance
- Issue: May render slightly differently
- Solution: Use Chrome for exact appearance

### Safari (macOS/iOS)
- ✅ Generally works well
- Issue: Some animation features not supported
- Solution: Disable animations or use Chrome

### Edge
- ✅ Based on Chrome engine, similar performance
- Issue: Rarely any issues
- Solution: Update to latest version

---

## Advanced Debugging

### Check JavaScript Errors
1. Press F12 to open Developer Tools
2. Click "Console" tab
3. Look for red error messages
4. Note the error text and line number

### Check Performance
1. Press F12 → Performance tab
2. Click record button
3. Play for 10 seconds
4. Click stop
5. Look for frame rate (aim for 60 FPS)

### Check Network Issues
1. Press F12 → Network tab
2. Refresh page
3. Look for failed requests (red items)
4. Failed files usually need path fixes

### Check Canvas Issues
1. Press F12 → Console
2. Type: `canvas.getContext('2d')`
3. Should show: `CanvasRenderingContext2D {}`
4. If error, canvas initialization failed

---

## Reporting Bugs

### Before reporting, try:
1. Clear cache and refresh (Ctrl+Shift+Delete)
2. Try different browser
3. Try different computer
4. Check this guide

### When reporting, include:
- **Browser** (Chrome 120, Firefox 121, etc.)
- **OS** (Windows 10, macOS 13, etc.)
- **Error message** (exact text from console)
- **Steps to reproduce** (what you were doing)
- **Screenshot** (if possible)

### Report on GitHub:
[GitHub Issues](https://github.com/yourusername/OOPS-spikes/issues)

---

## Performance Tips for Players

### Play better with these tips:
1. **Reduce screen brightness** - See spikes better
2. **Wear headphones** - (for when audio is added)
3. **Use mouse for steady hand** - Keyboard can feel jittery
4. **Take breaks** - Eye strain from 100 levels!
5. **Stretch** - Gaming posture is important!

---

## Still having issues?

1. **Check the [README.md](Readme.md)** for general help
2. **Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** for architecture
3. **Post in GitHub Discussions** if not already answered
4. **Create GitHub Issue** with detailed information

---

**Need more help? Open an issue on GitHub!**

**Last Updated:** December 24, 2025
