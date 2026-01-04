<!-- 
  Chatbot Icon Preview & Reference
  Preview the new ChatbotIcon at different sizes and color variations
-->

# Chatbot Icon Reference Guide

## Icon Design Concept

The new ChatbotIcon combines several visual elements to represent an AI-powered legal assistant:

### Visual Elements
1. **Chat Bubble** - Primary communication container
2. **Intelligence Dots** - Three strategically placed dots representing:
   - Center dot: AI processing/cognition
   - Upper right: Creative thinking/spark
   - Lower left: Connection/networking
3. **Communication Lines** - Three horizontal lines indicating message/text exchange
4. **Precision Corner** - Small bracket in top-right for accuracy/professional qualities

## Size Specifications

### Context-Based Sizing
| Context | Size | Usage |
|---------|------|-------|
| **Floating Button** | 24px | Main chat trigger in bottom-right corner |
| **Sidebar Header** | 20px | Next to "Swiss Assistant" title |
| **Message Avatar** | 16px | Inside circular avatars (blue gradient background) |
| **Loading State** | 16px | In loading indicators |

## Color Variations

### Current Implementation
All colors use `currentColor` for flexibility:

```
Icon Color: Inherited from parent text color
Bubble Fill Gradient: Opacity-based, adapts to base color
Interior Lines: Opacity 0.6-0.7 for hierarchy
```

### Applied Colors
1. **Floating Button** → `text-slate-800` (dark gray)
2. **Sidebar Header** → `text-slate-800` (dark gray)
3. **Avatar (Assistant Messages)** → `text-white` (on gradient background)
4. **Highlighted States** → `text-blue-600` (when hovered/active)

## SVG Implementation

### File Structure
```
<svg viewBox="0 0 24 24">
  <defs>
    <linearGradient id="chatGradient">
      <!-- Subtle gradient for bubble fill -->
    </linearGradient>
  </defs>
  
  <!-- Main Shapes -->
  <path> - Chat bubble outline
  <circle> - Intelligence dots (3x)
  <line> - Communication lines (3x)
  <path> - Precision bracket
</svg>
```

### Opacity Hierarchy
- **Primary Element** (bubble): opacity 0.15 fill, 1.3 stroke
- **Intelligence Dots**: opacity 0.5-0.7
- **Communication Lines**: opacity 0.5-0.6
- **Accent Elements**: opacity 0.4

## Integration Points

### Component Props

```typescript
interface ChatbotIconProps {
  className?: string    // Tailwind CSS classes
  size?: number        // SVG size in pixels (default: 24)
  animated?: boolean   // Apply pulse animation (default: false)
}
```

### Usage Examples

**Basic Icon (24px, slate-800)**
```jsx
<ChatbotIcon className="w-6 h-6 text-slate-800" size={24} />
```

**Avatar Icon (16px, white)**
```jsx
<ChatbotIcon className="w-4 h-4 text-white" size={16} />
```

**Animated Icon (24px, blue)**
```jsx
<ChatbotIcon 
  className="w-6 h-6 text-blue-600" 
  size={24}
  animated={true}
/>
```

## Accessibility

### Features
- ✅ Semantic SVG with `viewBox` for scaling
- ✅ `aria-label="AI Assistant Icon"` for screen readers
- ✅ `strokeLinecap="round"` and `strokeLinejoin="round"` for smooth appearance
- ✅ High contrast with text color inheritance

### Screen Reader Output
```
"AI Assistant Icon"
```

## Animation Options

### Current State
- Basic pulse animation available via `animated` prop
- Sparkle indicator above icon (separate `Sparkles` icon from lucide)

### Future Possibilities
- 🎬 Rotating intelligence dots
- 🎬 Breathing bubble effect
- 🎬 Text line animation (left to right typing effect)
- 🎬 Gradient color animation

## Performance Metrics

- **SVG Complexity**: Very low (1 path + 3 circles + 3 lines + 1 path)
- **Render Impact**: Minimal
- **File Size**: ~800 bytes (uncompressed SVG)
- **Bundle Impact**: Negligible (<1KB gzipped)

## Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ IE11 (with SVG support)
✅ Mobile browsers (iOS Safari, Chrome Android)

## Theming & Dark Mode

The icon automatically adapts to theme via `currentColor`:

```jsx
// Light Theme
<ChatbotIcon className="text-slate-800" />

// Dark Theme
<ChatbotIcon className="text-slate-200" />

// On Brand Color
<ChatbotIcon className="text-blue-600" />

// On White Background
<ChatbotIcon className="text-gray-900" />
```

## Files Modified

1. **Created**
   - `components/icons/ChatbotIcon.tsx` - New custom icon component

2. **Updated**
   - `components/chat/FloatingChatWidget.tsx`
     - Removed: `MessageSquareText` from imports
     - Added: `ChatbotIcon` import
     - Updated: 2 icon instances
   
   - `components/lawyer/SwissVirtualLawyer.tsx`
     - Removed: `MessageSquareText` from imports
     - Added: `ChatbotIcon` import
     - Updated: 3 icon instances (header, message avatars, loading)

## Quality Assurance

✅ TypeScript types defined
✅ Build process verified
✅ No console warnings
✅ Responsive at all sizes
✅ No external dependencies
✅ Pixel-perfect at reference sizes

---

**Created**: 2026-01-04
**Version**: 1.0
**Status**: Production Ready ✨
