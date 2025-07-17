

<div align="center">
<h1>🖼️ Cropify</h1>
<p>A powerful and feature-rich image cropping and manipulation library for Node.js, built with TypeScript and powered by <b>@napi-rs/canvas.</b></p>

<p>
    <a href="https://github.com/kunalkandepatil/cropify"><b>Github</b></a> •
    <a href="https://discord.gg/5EZW4tc6AH"><b>Support</b></a>
</p>

[![NPM Version](https://img.shields.io/npm/v/cropify?style=flat-square&color=%2300ADD3)](https://www.npmjs.com/package/cropify)
[![NPM Downloads](https://img.shields.io/npm/dw/cropify?style=flat-square&color=%2300ADD3)](https://www.npmjs.com/package/cropify)
[![NPM License](https://img.shields.io/npm/l/cropify?style=flat-square&color=%2300ADD3)](https://github.com/unburn/cropify/blob/main/LICENCE)
[![GitHub Repo stars](https://img.shields.io/github/stars/unburn/cropify?style=flat-square&color=%2300ADD3)](https://github.com/unburn/cropify)

</div>

## Features

### 🎯 Core Cropping
- **Precise cropping** with x, y, width, height coordinates
- **Automatic scaling** to fit target dimensions
- **Center cropping** for perfect alignment
- **Legacy support** for existing cropify implementations

### 📐 Advanced Scaling & Positioning
- **5 Fit modes**: `cover`, `contain`, `fill`, `inside`, `outside`
- **9 Position options**: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
- **Smart positioning** based on content and target dimensions
- **Background color** support for transparent areas

### 🎨 Image Filters & Effects
- **Brightness** adjustment (-100 to 100)
- **Contrast** control (-100 to 100)
- **Saturation** modification (-100 to 100)
- **Blur** effect (0 to 20px)
- **Grayscale** conversion
- **Sepia** tone effect
- **Color inversion**
- **Hue rotation** (0 to 360 degrees)

### 🔶 Advanced Shape Support
- **Circle** cropping
- **Polygon** shapes (3+ sides)
- **Star** shapes (customizable points)
- **Custom shapes** with point coordinates
- **Rounded rectangles** with border radius
- **SVG path** support (planned)

### 📁 Multiple Output Formats
- **PNG** (lossless)
- **JPEG** with quality control (0-100)
- **WebP** with quality control (0-100)
- **Progressive JPEG** support (planned)

### ⚡ Performance & Batch Processing
- **Batch processing** multiple images
- **Thumbnail generation** in multiple sizes
- **Memory efficient** processing
- **Error handling** with detailed feedback

### 📱 Social Media Presets
- **Instagram**: Square (1080x1080), Story (1080x1920), Landscape (1080x566)
- **Twitter**: Header (1500x500), Post (1200x675)
- **Facebook**: Cover (820x312), Post (1200x630)
- **Thumbnails**: Small (150x150), Medium (300x300), Large (600x600)

## Installation

```bash
npm install cropify
```

## Quick Start

```javascript
const { cropImage } = require('cropify');
const fs = require('fs');

// Basic cropping
const result = await cropImage({
    imagePath: 'input.jpg',
    width: 800,
    height: 600,
    cropCenter: true
});

fs.writeFileSync('output.png', result);
```

## API Reference

### Main Function

#### `cropImage(options: CropifyOptions)`

Crops and manipulates an image based on the provided options.

**Parameters:**
- `options` - Configuration object with the following properties:

#### Basic Options
```typescript
{
    imagePath: string | Buffer | URL;  // Input image path or buffer
    x?: number;                        // X coordinate (default: 0)
    y?: number;                        // Y coordinate (default: 0)
    width?: number;                    // Output width (default: original)
    height?: number;                   // Output height (default: original)
    borderRadius?: number;             // Rounded corners radius
    circle?: boolean;                  // Circular crop
    cropCenter?: boolean;              // Center the crop
}
```

#### Advanced Options
```typescript
{
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    background?: string;               // Background color (CSS color)
}
```

#### Shape Options
```typescript
{
    shape?: {
        type: 'rectangle' | 'circle' | 'polygon' | 'star' | 'custom';
        sides?: number;                // For polygon/star (3+)
        points?: Array<{x: number, y: number}>; // For custom shapes (%)
        customPath?: string;           // SVG path (planned)
    }
}
```

#### Filter Options
```typescript
{
    filters?: {
        brightness?: number;           // -100 to 100
        contrast?: number;             // -100 to 100
        saturation?: number;           // -100 to 100
        blur?: number;                 // 0 to 20
        grayscale?: boolean;           // Convert to grayscale
        sepia?: boolean;               // Apply sepia tone
        invert?: boolean;              // Invert colors
        hue?: number;                  // Hue rotation (0-360)
    }
}
```

#### Output Options
```typescript
{
    output?: {
        format?: 'png' | 'jpeg' | 'webp';
        quality?: number;              // 0-100 (JPEG/WebP only)
        progressive?: boolean;         // Progressive JPEG (planned)
        adaptiveQuality?: boolean;     // Adaptive quality (planned)
    }
}
```

### Utility Functions

#### `cropImages(images: Array<CropifyOptions & { outputPath?: string }>)`

Process multiple images in batch.

#### `generateThumbnails(imagePath, sizes, baseOptions?)`

Generate multiple thumbnail sizes from a single image.

#### `presets`

Pre-configured sizes for social media platforms and common use cases.

## Usage Examples

### Basic Cropping with Filters
```javascript
const result = await cropImage({
    imagePath: 'photo.jpg',
    width: 800,
    height: 600,
    fit: 'cover',
    position: 'center',
    filters: {
        brightness: 20,
        contrast: 15,
        saturation: -10
    },
    output: {
        format: 'jpeg',
        quality: 85
    }
});
```

### Custom Shapes
```javascript
// Hexagon
const hexagon = await cropImage({
    imagePath: 'image.jpg',
    width: 400,
    height: 400,
    shape: {
        type: 'polygon',
        sides: 6
    }
});

// Star
const star = await cropImage({
    imagePath: 'image.jpg',
    width: 400,
    height: 400,
    shape: {
        type: 'star',
        sides: 5
    }
});

// Custom diamond shape
const diamond = await cropImage({
    imagePath: 'image.jpg',
    width: 400,
    height: 400,
    shape: {
        type: 'custom',
        points: [
            { x: 50, y: 0 },   // Top
            { x: 100, y: 50 }, // Right
            { x: 50, y: 100 }, // Bottom
            { x: 0, y: 50 }    // Left
        ]
    }
});
```

### Batch Processing
```javascript
const batchResults = await cropImages([
    {
        imagePath: 'photo1.jpg',
        width: 300,
        height: 300,
        filters: { grayscale: true },
        outputPath: 'gray1.png'
    },
    {
        imagePath: 'photo2.jpg',
        width: 300,
        height: 300,
        circle: true,
        outputPath: 'circle2.png'
    }
]);

batchResults.forEach((result, index) => {
    if (result.success && result.outputPath) {
        fs.writeFileSync(result.outputPath, result.buffer);
    }
});
```

### Generate Thumbnails
```javascript
const thumbnails = await generateThumbnails(
    'large-image.jpg',
    [
        { width: 150, height: 150, suffix: 'small' },
        { width: 300, height: 300, suffix: 'medium' },
        { width: 600, height: 600, suffix: 'large' }
    ],
    {
        fit: 'cover',
        borderRadius: 10
    }
);

thumbnails.forEach(thumb => {
    if (thumb.success) {
        fs.writeFileSync(`thumb-${thumb.suffix}.png`, thumb.buffer);
    }
});
```

### Social Media Presets
```javascript
// Instagram square post
const instagramPost = await cropImage({
    imagePath: 'photo.jpg',
    ...presets.instagram.square,
    fit: 'cover',
    filters: {
        brightness: 10,
        saturation: 20
    },
    output: {
        format: 'jpeg',
        quality: 90
    }
});

// Twitter header
const twitterHeader = await cropImage({
    imagePath: 'header.jpg',
    ...presets.twitter.header,
    fit: 'cover',
    position: 'center'
});
```

### Advanced Effects
```javascript
const artisticImage = await cropImage({
    imagePath: 'portrait.jpg',
    width: 800,
    height: 800,
    fit: 'cover',
    shape: {
        type: 'polygon',
        sides: 8  // Octagon
    },
    filters: {
        brightness: 15,
        contrast: 10,
        saturation: 25,
        hue: 30
    },
    background: '#2c3e50',
    output: {
        format: 'webp',
        quality: 90
    }
});
```

## Fit Modes Explained

- **`cover`**: Scale image to cover entire area (may crop)
- **`contain`**: Scale image to fit entirely within area (may have empty space)
- **`fill`**: Stretch image to fill exact dimensions (may distort)
- **`inside`**: Like contain, but never upscale
- **`outside`**: Like cover, but never downscale

## Position Options

Control where the image is positioned within the target area:
- **`center`**: Center the image
- **`top`**, **`bottom`**, **`left`**, **`right`**: Align to edges
- **`top-left`**, **`top-right`**, **`bottom-left`**, **`bottom-right`**: Corner alignment

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { cropImage, CropifyOptions, FilterOptions } from 'cropify';

const options: CropifyOptions = {
    imagePath: 'image.jpg',
    width: 800,
    height: 600,
    filters: {
        brightness: 20
    }
};
```

## Requirements

- Node.js 16+
- `@napi-rs/canvas` for high-performance canvas operations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.