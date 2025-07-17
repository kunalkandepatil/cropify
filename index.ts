import { createCanvas, loadImage } from "@napi-rs/canvas"

type OutputFormat = 'png' | 'jpeg' | 'webp';
type FitMode = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
type Position = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ShapeType = 'rectangle' | 'circle' | 'polygon' | 'star' | 'custom';

interface FilterOptions {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    blur?: number;
    grayscale?: boolean;
    sepia?: boolean;
    invert?: boolean;
    hue?: number;
}

interface ShapeOptions {
    type: ShapeType;
    sides?: number;
    points?: Array<{x: number, y: number}>;
    customPath?: string;
}

interface QualityOptions {
    format?: OutputFormat;
    quality?: number;
    progressive?: boolean;
    adaptiveQuality?: boolean;
}

interface MetadataOptions {
    preserveExif?: boolean;
    autoRotate?: boolean;
    removeMetadata?: boolean;
}

interface CropifyOptions {
    imagePath: Parameters<typeof loadImage>[0];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    circle?: boolean;
    cropCenter?: boolean;
    
    fit?: FitMode;
    position?: Position;
    background?: string;
    
    shape?: ShapeOptions;
    
    filters?: FilterOptions;
    
    output?: QualityOptions;
    
    metadata?: MetadataOptions;
}

const applyFilters = (ctx: any, filters: FilterOptions) => {
    const filterString: string[] = [];
    
    if (filters.brightness !== undefined) {
        filterString.push(`brightness(${100 + filters.brightness}%)`);
    }
    if (filters.contrast !== undefined) {
        filterString.push(`contrast(${100 + filters.contrast}%)`);
    }
    if (filters.saturation !== undefined) {
        filterString.push(`saturate(${100 + filters.saturation}%)`);
    }
    if (filters.blur !== undefined && filters.blur > 0) {
        filterString.push(`blur(${filters.blur}px)`);
    }
    if (filters.grayscale) {
        filterString.push('grayscale(100%)');
    }
    if (filters.sepia) {
        filterString.push('sepia(100%)');
    }
    if (filters.invert) {
        filterString.push('invert(100%)');
    }
    if (filters.hue !== undefined) {
        filterString.push(`hue-rotate(${filters.hue}deg)`);
    }
    
    if (filterString.length > 0) {
        ctx.filter = filterString.join(' ');
    }
};

const calculateDimensions = (
    imageWidth: number, 
    imageHeight: number, 
    targetWidth: number, 
    targetHeight: number, 
    fit: FitMode = 'cover',
    position: Position = 'center'
) => {
    let scaleX = targetWidth / imageWidth;
    let scaleY = targetHeight / imageHeight;
    let scale: number;
    
    switch (fit) {
        case 'cover':
            scale = Math.max(scaleX, scaleY);
            break;
        case 'contain':
            scale = Math.min(scaleX, scaleY);
            break;
        case 'fill':
            return {
                scale: 1,
                scaledWidth: targetWidth,
                scaledHeight: targetHeight,
                offsetX: 0,
                offsetY: 0
            };
        case 'inside':
            scale = Math.min(scaleX, scaleY, 1);
            break;
        case 'outside':
            scale = Math.max(scaleX, scaleY, 1);
            break;
        default:
            scale = Math.max(scaleX, scaleY);
    }
    
    const scaledWidth = imageWidth * scale;
    const scaledHeight = imageHeight * scale;
    
    let offsetX = 0;
    let offsetY = 0;
    
    const excessWidth = scaledWidth - targetWidth;
    const excessHeight = scaledHeight - targetHeight;
    
    switch (position) {
        case 'center':
            offsetX = -excessWidth / 2;
            offsetY = -excessHeight / 2;
            break;
        case 'top':
            offsetX = -excessWidth / 2;
            offsetY = 0;
            break;
        case 'bottom':
            offsetX = -excessWidth / 2;
            offsetY = -excessHeight;
            break;
        case 'left':
            offsetX = 0;
            offsetY = -excessHeight / 2;
            break;
        case 'right':
            offsetX = -excessWidth;
            offsetY = -excessHeight / 2;
            break;
        case 'top-left':
            offsetX = 0;
            offsetY = 0;
            break;
        case 'top-right':
            offsetX = -excessWidth;
            offsetY = 0;
            break;
        case 'bottom-left':
            offsetX = 0;
            offsetY = -excessHeight;
            break;
        case 'bottom-right':
            offsetX = -excessWidth;
            offsetY = -excessHeight;
            break;
    }
    
    return {
        scale,
        scaledWidth,
        scaledHeight,
        offsetX,
        offsetY
    };
};

const createShape = (ctx: any, width: number, height: number, shape: ShapeOptions) => {
    ctx.beginPath();
    
    switch (shape.type) {
        case 'circle':
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
            break;
            
        case 'polygon':
            if (shape.sides && shape.sides >= 3) {
                const centerX = width / 2;
                const centerY = height / 2;
                const radius = Math.min(width, height) / 2;
                const angleStep = (Math.PI * 2) / shape.sides;
                
                for (let i = 0; i < shape.sides; i++) {
                    const angle = i * angleStep - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
            }
            break;
            
        case 'star':
            if (shape.sides && shape.sides >= 3) {
                const centerX = width / 2;
                const centerY = height / 2;
                const outerRadius = Math.min(width, height) / 2;
                const innerRadius = outerRadius * 0.5;
                const angleStep = Math.PI / shape.sides;
                
                for (let i = 0; i < shape.sides * 2; i++) {
                    const angle = i * angleStep - Math.PI / 2;
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
            }
            break;
            
        case 'custom':
            if (shape.points) {
                shape.points.forEach((point, index) => {
                    const x = (point.x / 100) * width;
                    const y = (point.y / 100) * height;
                    
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
            }
            break;
    }
    
    ctx.closePath();
    ctx.clip();
};

const cropImage = async (option: CropifyOptions) => {
    try {
        const image = await loadImage(option.imagePath);

        const width = option.width || image.width;
        const height = option.height || image.height;
        const x = option.x || 0;
        const y = option.y || 0;
        const fit = option.fit || 'cover';
        const position = option.position || 'center';
        const outputFormat = option.output?.format || 'png';
        const quality = option.output?.quality || 90;

        const dimensions = calculateDimensions(
            image.width, 
            image.height, 
            width, 
            height, 
            fit, 
            position
        );

        let finalX = dimensions.offsetX + x;
        let finalY = dimensions.offsetY + y;

        if (option.cropCenter) {
            finalX = (width - dimensions.scaledWidth) / 2;
            finalY = (height - dimensions.scaledHeight) / 2;
        }

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        if (option.background) {
            ctx.fillStyle = option.background;
            ctx.fillRect(0, 0, width, height);
        }

        if (option.circle || option.shape?.type === 'circle') {
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        } else if (option.shape && option.shape.type !== 'rectangle') {
            createShape(ctx, width, height, option.shape);
        } else if (option.borderRadius && option.borderRadius > 0) {
            ctx.beginPath();
            ctx.moveTo(option.borderRadius, 0);
            ctx.lineTo(width - option.borderRadius, 0);
            ctx.quadraticCurveTo(width, 0, width, option.borderRadius);
            ctx.lineTo(width, height - option.borderRadius);
            ctx.quadraticCurveTo(width, height, width - option.borderRadius, height);
            ctx.lineTo(option.borderRadius, height);
            ctx.quadraticCurveTo(0, height, 0, height - option.borderRadius);
            ctx.lineTo(0, option.borderRadius);
            ctx.quadraticCurveTo(0, 0, option.borderRadius, 0);
            ctx.closePath();
            ctx.clip();
        }

        if (option.filters) {
            applyFilters(ctx, option.filters);
        }

        if (fit === 'fill') {
            ctx.drawImage(image, finalX, finalY, width, height);
        } else {
            ctx.drawImage(image, finalX, finalY, dimensions.scaledWidth, dimensions.scaledHeight);
        }

        ctx.filter = 'none';

        switch (outputFormat) {
            case 'jpeg':
                return canvas.toBuffer("image/jpeg", quality / 100);
            case 'webp':
                return canvas.toBuffer("image/webp", quality / 100);
            case 'png':
            default:
                return canvas.toBuffer("image/png");
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
};

const cropImages = async (images: Array<CropifyOptions & { outputPath?: string }>) => {
    const results: Array<{
        success: boolean;
        buffer?: Buffer;
        outputPath?: string;
        originalPath: any;
        error?: string;
    }> = [];
    
    for (const imageOption of images) {
        try {
            const buffer = await cropImage(imageOption);
            results.push({
                success: true,
                buffer,
                outputPath: imageOption.outputPath,
                originalPath: imageOption.imagePath
            });
        } catch (error) {
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                originalPath: imageOption.imagePath
            });
        }
    }
    
    return results;
};

const generateThumbnails = async (
    imagePath: Parameters<typeof loadImage>[0],
    sizes: Array<{width: number, height: number, suffix?: string}>,
    baseOptions?: Partial<CropifyOptions>
) => {
    const results: Array<{
        success: boolean;
        buffer?: Buffer;
        width: number;
        height: number;
        suffix?: string;
        error?: string;
    }> = [];
    
    for (const size of sizes) {
        try {
            const options: CropifyOptions = {
                imagePath,
                width: size.width,
                height: size.height,
                ...baseOptions
            };
            
            const buffer = await cropImage(options);
            results.push({
                success: true,
                buffer,
                width: size.width,
                height: size.height,
                suffix: size.suffix || `${size.width}x${size.height}`
            });
        } catch (error) {
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                width: size.width,
                height: size.height
            });
        }
    }
    
    return results;
};

const presets = {
    instagram: {
        square: { width: 1080, height: 1080 },
        story: { width: 1080, height: 1920 },
        landscape: { width: 1080, height: 566 }
    },
    twitter: {
        header: { width: 1500, height: 500 },
        post: { width: 1200, height: 675 }
    },
    facebook: {
        cover: { width: 820, height: 312 },
        post: { width: 1200, height: 630 }
    },
    thumbnails: {
        small: { width: 150, height: 150 },
        medium: { width: 300, height: 300 },
        large: { width: 600, height: 600 }
    }
};

export { 
    cropImage, 
    cropImages, 
    generateThumbnails, 
    presets,
    type CropifyOptions,
    type FilterOptions,
    type ShapeOptions,
    type OutputFormat,
    type FitMode,
    type Position
}