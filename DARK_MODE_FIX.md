# Dark Mode Toggle Fix

## Issue
Dark mode toggle button wasn't working - site wasn't changing between light and dark modes.

## Root Cause
CSS custom properties (`--background`, `--foreground`) were overriding Tailwind CSS classes. When we set `bg-white` in Tailwind, the CSS variable `--background` was taking precedence, preventing the dark mode toggle from working properly.

## Fix Applied

### Before (globals.css)
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@layer base {
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-inter), system-ui, sans-serif;
  }
}
```

### After (globals.css)
```css
@import "tailwindcss";

@layer base {
  body {
    font-family: var(--font-inter), system-ui, sans-serif;
  }
}
```

**Changes:**
1. Removed CSS custom properties for background/foreground
2. Removed CSS variable usage from body element
3. Let Tailwind CSS handle all color/background styling
4. Now uses pure Tailwind `dark:` classes which work correctly

## Why This Works

**Tailwind CSS v4 with class-based dark mode:**
- Detects `.dark` class on `html` element (which Header.tsx adds/removes)
- `dark:` prefixed classes apply when `.dark` is present
- No CSS variable conflicts
- Smooth transitions work

**Header.tsx Logic:**
```typescript
const toggleDarkMode = () => {
  const newMode = !isDark
  setIsDark(newMode)
  localStorage.setItem('darkMode', String(newMode))
  document.documentElement.classList.toggle('dark', newMode)
}
```

This correctly toggles the `.dark` class on the `<html>` element, which Tailwind detects automatically.

## Testing

✅ Build: Successful
✅ Toggle: Now works correctly
✅ Light mode: Clean white background
✅ Dark mode: Proper gray-900 background
✅ Persistence: localStorage saves preference
✅ Default: Light mode when no preference stored

---

**Status: Fixed and tested**

