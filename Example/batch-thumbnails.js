const { cropImages, generateThumbnails } = require("../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2022/09/04/10/25/owl-7431340_960_720.jpg';

async function batchProcessing() {
    console.log("⚡ Batch Processing Examples\n");
    
    console.log("1. Batch processing with different effects.");
    const batchOptions = [
        {
            imagePath: imageUrl,
            width: 300,
            height: 300,
            filters: { grayscale: true },
            outputPath: "./output/batch-grayscale.png"
        },
        {
            imagePath: imageUrl,
            width: 300,
            height: 300,
            filters: { sepia: true },
            outputPath: "./output/batch-sepia.png"
        },
        {
            imagePath: imageUrl,
            width: 300,
            height: 300,
            circle: true,
            outputPath: "./output/batch-circle.png"
        },
        {
            imagePath: imageUrl,
            width: 300,
            height: 300,
            shape: { type: 'polygon', sides: 6 },
            outputPath: "./output/batch-hexagon.png"
        },
        {
            imagePath: imageUrl,
            width: 300,
            height: 300,
            filters: { 
                brightness: 30,
                contrast: 20,
                saturation: 40 
            },
            outputPath: "./output/batch-enhanced.png"
        }
    ];
    
    const batchResults = await cropImages(batchOptions);
    
    batchResults.forEach((result, index) => {
        if (result.success && result.buffer && result.outputPath) {
            fs.writeFileSync(result.outputPath, result.buffer);
            console.log(`✅ Batch image ${index + 1} saved: ${result.outputPath}`);
        } else {
            console.log(`✗ Batch image ${index + 1} failed: ${result.error}`);
        }
    });
    
    console.log(`\nBatch processing completed: ${batchResults.filter(r => r.success).length}/${batchResults.length} successful`);
}

async function thumbnailGeneration() {
    console.log("\n📱 Thumbnail Generation Examples\n");
    
    console.log("1. Standard thumbnail sizes.");
    const standardSizes = [
        { width: 100, height: 100, suffix: 'tiny' },
        { width: 200, height: 200, suffix: 'small' },
        { width: 400, height: 400, suffix: 'medium' },
        { width: 800, height: 800, suffix: 'large' }
    ];
    
    const standardThumbs = await generateThumbnails(imageUrl, standardSizes, {
        fit: 'cover',
        position: 'center'
    });
    
    standardThumbs.forEach((result) => {
        if (result.success && result.buffer) {
            const filename = `./output/thumb-standard-${result.suffix}.png`;
            fs.writeFileSync(filename, result.buffer);
            console.log(`✅ Standard thumbnail saved: ${filename} (${result.width}x${result.height})`);
        } else {
            console.log(`✗ Standard thumbnail failed: ${result.error}`);
        }
    });
    
    console.log("\n2. Rounded corner thumbnails.");
    const roundedThumbs = await generateThumbnails(imageUrl, standardSizes, {
        fit: 'cover',
        borderRadius: 20,
        background: '#f8f9fa'
    });
    
    roundedThumbs.forEach((result) => {
        if (result.success && result.buffer) {
            const filename = `./output/thumb-rounded-${result.suffix}.png`;
            fs.writeFileSync(filename, result.buffer);
            console.log(`✅ Rounded thumbnail saved: ${filename} (${result.width}x${result.height})`);
        }
    });
    
    console.log("\n3. Circular thumbnails.");
    const circularThumbs = await generateThumbnails(imageUrl, standardSizes, {
        circle: true,
        background: '#ffffff'
    });
    
    circularThumbs.forEach((result) => {
        if (result.success && result.buffer) {
            const filename = `./output/thumb-circle-${result.suffix}.png`;
            fs.writeFileSync(filename, result.buffer);
            console.log(`✅ Circular thumbnail saved: ${filename} (${result.width}x${result.height})`);
        }
    });
    
    console.log("\n4. Different aspect ratio thumbnails.");
    const aspectRatioSizes = [
        { width: 400, height: 300, suffix: '4-3' }, 
        { width: 400, height: 225, suffix: '16-9' },
        { width: 300, height: 400, suffix: '3-4' }, 
        { width: 400, height: 400, suffix: '1-1' }  
    ];
    
    const aspectThumbs = await generateThumbnails(imageUrl, aspectRatioSizes, {
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 10,
            saturation: 15
        }
    });
    
    aspectThumbs.forEach((result) => {
        if (result.success && result.buffer) {
            const filename = `./output/thumb-aspect-${result.suffix}.png`;
            fs.writeFileSync(filename, result.buffer);
            console.log(`✅ Aspect ratio thumbnail saved: ${filename} (${result.width}x${result.height})`);
        }
    });
    
    console.log("\n5. Enhanced thumbnails with effects.");
    const enhancedThumbs = await generateThumbnails(imageUrl, [
        { width: 300, height: 300, suffix: 'vintage' },
        { width: 300, height: 300, suffix: 'modern' },
        { width: 300, height: 300, suffix: 'artistic' }
    ], {
        fit: 'cover'
    });
    
    if (enhancedThumbs[0]?.success && enhancedThumbs[0].buffer) {
        const vintage = await generateThumbnails(imageUrl, [{ width: 300, height: 300, suffix: 'vintage' }], {
            fit: 'cover',
            filters: { sepia: true, brightness: -10, contrast: 15 }
        });
        if (vintage[0]?.success) {
            fs.writeFileSync("./output/thumb-enhanced-vintage.png", vintage[0].buffer);
            console.log("✅ Enhanced vintage thumbnail saved");
        }
    }
    
    if (enhancedThumbs[1]?.success && enhancedThumbs[1].buffer) {
        const modern = await generateThumbnails(imageUrl, [{ width: 300, height: 300, suffix: 'modern' }], {
            fit: 'cover',
            filters: { brightness: 20, contrast: 25, saturation: 30 }
        });
        if (modern[0]?.success) {
            fs.writeFileSync("./output/thumb-enhanced-modern.png", modern[0].buffer);
            console.log("✅ Enhanced modern thumbnail saved");
        }
    }
    
    if (enhancedThumbs[2]?.success && enhancedThumbs[2].buffer) {
        const artistic = await generateThumbnails(imageUrl, [{ width: 300, height: 300, suffix: 'artistic' }], {
            fit: 'cover',
            shape: { type: 'polygon', sides: 8 },
            filters: { hue: 45, saturation: 50 }
        });
        if (artistic[0]?.success) {
            fs.writeFileSync("./output/thumb-enhanced-artistic.png", artistic[0].buffer);
            console.log("✅ Enhanced artistic thumbnail saved");
        }
    }
}

async function runBatchExamples() {
    try {
        await batchProcessing();
        await thumbnailGeneration();
        
        console.log("\n🎉 Batch processing and thumbnail examples completed!");
        console.log("Check all the generated batch and thumbnail files.");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

runBatchExamples();