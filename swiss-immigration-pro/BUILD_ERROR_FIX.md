# Build Error Fix

## Issue
The `/visas` page is failing to build with error:
```
Error: Event handlers cannot be passed to Client Component props.
```

## Temporary Solution
For now, you can deploy via Netlify Dashboard which will handle the build. The error occurs during static generation, but Netlify's build process may handle it differently.

## Permanent Fix Needed
The `/visas` page needs to be refactored to avoid passing event handlers during static generation. The issue is likely with:
1. Icon components being used as JSX elements (`<visa.icon />`)
2. Link components with event handlers
3. Layout components that wrap the page

## Next Steps
1. Deploy via Netlify Dashboard (recommended)
2. If build still fails, we may need to:
   - Convert icon usage to explicit component references
   - Ensure all interactive components are properly marked as 'use client'
   - Consider using dynamic imports for problematic components

