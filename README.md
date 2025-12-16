<div align="center">

<img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/cropify/banner.svg" alt="cropify banner" />
<br>
<br>


# **˗ˏˋ cropify ´ˎ˗**
A fast, powerful image cropping & manipulation library for Node.js

[![NPM Version](https://img.shields.io/npm/v/cropify?style=flat-square&color=%232FCEFF)](https://www.npmjs.com/package/cropify)
[![NPM Downloads](https://img.shields.io/npm/dw/cropify?style=flat-square&color=%232FCEFF)](https://www.npmjs.com/package/cropify)
[![NPM License](https://img.shields.io/npm/l/cropify?style=flat-square&color=%232FCEFF)](https://github.com/kunalkandepatil/cropify/blob/main/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/kunalkandepatil/cropify?style=flat-square&color=%232FCEFF)](https://github.com/kunalkandepatil/cropify)

<br>

<img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/cropify/features.svg" alt="cropify features" />

<br>

</div>


## 📄 Documentation 
### ╰┈1️⃣ Quick Start
```bash
npm install cropify
```
```js
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

<p align="center">≪ ◦ ✦ ◦ ≫</p>

### ╰┈2️⃣ API Reference
#### Main Function `cropImage(options: CropifyOptions)`
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


<p align="center">≪ ◦ ✦ ◦ ≫</p>

## 🎧 Support Server
<a href="https://discord.gg/W8wTjESM3t"><img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/discord.svg" alt="support server" /></a>