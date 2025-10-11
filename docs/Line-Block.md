# Block Component Documentation

## Overview

The `Block` component is a reusable React component that creates beautiful diagonal line patterns with customizable styling and positioning. It's perfect for adding sophisticated design elements to your UI.

## Import

```tsx
import Block from './components/Block';
```

## Basic Usage

```tsx
// Simple block with default settings
<Block />

// Customized block
<Block 
    lineDirection="right"
    lineColor="stroke-blue-300"
    height="h-32"
/>
```

## Props Reference

### Positioning Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'absolute' \| 'relative' \| 'static'` | `'absolute'` | CSS position property |
| `top` | `string` | `'top-1/2'` | Top positioning (Tailwind classes) |
| `left` | `string` | `'left-0'` | Left positioning (Tailwind classes) |
| `right` | `string` | `'right-0'` | Right positioning (Tailwind classes) |
| `bottom` | `string` | `''` | Bottom positioning (Tailwind classes) |
| `zIndex` | `number` | `1` | Z-index for layering |

### Sizing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string` | `'h-20'` | Block height (Tailwind classes) |
| `width` | `string` | `'w-full'` | Block width (Tailwind classes) |

### Line Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lineColor` | `string` | `'stroke-orange-200'` | Color of diagonal lines (Tailwind classes) |
| `lineDirection` | `'right' \| 'left' \| 'center'` | `'center'` | Direction of diagonal lines |
| `lineCount` | `number` | `17` | Number of diagonal lines |
| `strokeWidth` | `number` | `1` | Thickness of diagonal lines |

### Border Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderColor` | `string` | `'border-orange-200'` | Border color (Tailwind classes) |
| `borderWidth` | `string` | `'border-y'` | Border width (Tailwind classes) |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'border-dashed'` | Border style |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `opacity` | `number` | `1` | Transparency (0-1) |

## Line Direction Examples

### Center Direction (Default)
```tsx
<Block lineDirection="center" />
```
Creates lines that go straight across from left to right.

### Right Direction
```tsx
<Block lineDirection="right" />
```
Creates lines that angle towards the right side.

### Left Direction
```tsx
<Block lineDirection="left" />
```
Creates lines that angle towards the left side.

## Color Examples

```tsx
// Orange theme (default)
<Block lineColor="stroke-orange-200" borderColor="border-orange-200" />

// Blue theme
<Block lineColor="stroke-blue-300" borderColor="border-blue-300" />

// Green theme
<Block lineColor="stroke-green-400" borderColor="border-green-400" />

// Purple theme
<Block lineColor="stroke-purple-300" borderColor="border-purple-300" />
```

## Size Examples

```tsx
// Small block
<Block height="h-10" width="w-1/2" />

// Large block
<Block height="h-32" width="w-full" />

// Custom sizes
<Block height="h-24" width="w-3/4" />
```

## Positioning Examples

### Absolute Positioning (Default)
```tsx
<Block 
    position="absolute"
    top="top-1/2"
    left="left-0"
    right="right-0"
    zIndex={10}
/>
```

### Static Positioning
```tsx
<Block 
    position="static"
    className="my-8"
/>
```

### Relative Positioning
```tsx
<Block 
    position="relative"
    className="mx-auto"
/>
```

## Advanced Examples

### High Density Lines
```tsx
<Block 
    lineCount={30}
    strokeWidth={0.5}
    lineColor="stroke-gray-300"
/>
```

### Custom Border Style
```tsx
<Block 
    borderStyle="border-solid"
    borderColor="border-red-400"
    borderWidth="border-2"
/>
```

### Semi-transparent Block
```tsx
<Block 
    opacity={0.5}
    lineColor="stroke-white"
    borderColor="border-white"
/>
```

### Full Customization
```tsx
<Block 
    position="absolute"
    top="top-1/4"
    left="left-1/4"
    right="right-1/4"
    height="h-16"
    width="w-1/2"
    lineDirection="right"
    lineColor="stroke-indigo-300"
    lineCount={25}
    strokeWidth={2}
    borderColor="border-indigo-400"
    borderWidth="border-x"
    borderStyle="border-dotted"
    className="rounded-lg"
    opacity={0.8}
    zIndex={5}
/>
```

## Common Use Cases

### 1. Hero Section Separator
```tsx
<Block 
    position="absolute"
    top="top-1/2"
    left="left-0"
    right="right-0"
    height="h-20"
    lineDirection="center"
    lineColor="stroke-orange-200"
    zIndex={1}
/>
```

### 2. Footer Separator
```tsx
<Block 
    position="static"
    height="h-20"
    lineDirection="center"
    lineColor="stroke-orange-200"
    className="mb-10"
/>
```

### 3. Section Dividers
```tsx
<Block 
    position="static"
    height="h-12"
    lineDirection="right"
    lineColor="stroke-blue-200"
    className="my-16"
/>
```

### 4. Background Elements
```tsx
<Block 
    position="absolute"
    top="top-0"
    left="left-0"
    right="right-0"
    height="h-32"
    lineDirection="left"
    lineColor="stroke-purple-100"
    opacity={0.3}
    zIndex={-1}
/>
```

## Technical Details

### How It Works
1. The component generates SVG patterns with diagonal lines
2. Each instance gets a unique pattern ID to prevent conflicts
3. Lines are positioned based on the `lineDirection` prop
4. The component uses Tailwind classes for styling
5. Automatic transform handling for centered positioning

### Performance
- Lightweight SVG-based implementation
- Unique IDs prevent pattern conflicts
- Efficient rendering with minimal DOM manipulation

### Browser Support
- Modern browsers with SVG support
- CSS Grid and Flexbox compatible
- Responsive design friendly

## Troubleshooting

### Common Issues

1. **Lines not showing**: Check if `lineColor` is a valid Tailwind class
2. **Positioning issues**: Verify `position`, `top`, `left`, `right` props
3. **Z-index conflicts**: Adjust `zIndex` prop for proper layering
4. **Pattern conflicts**: Each Block instance automatically gets unique IDs

### Best Practices

1. Use semantic color names that match your theme
2. Keep `lineCount` between 10-30 for optimal visual effect
3. Use `opacity` for subtle background effects
4. Combine with proper positioning for layout control

## Changelog

- **v1.0.0**: Initial release with full customization support
- All props are optional with sensible defaults
- TypeScript support with full type safety
