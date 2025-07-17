const { cropImage } = require("../../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2023/03/21/20/01/otter-7868090_960_720.jpg';

async function advancedScaling() {
    console.log("📐 Advanced Scaling & Positioning Examples\n");

    console.log("1. Cover mode - fills entire area, may crop.");
    const coverMode = await cropImage({
        imagePath: imageUrl,
        width: 800,
        height: 600,
        fit: 'cover',
        position: 'center'
    });
    fs.writeFileSync("./output/scaling-cover.png", coverMode);
    console.log("✅ Saved: scaling-cover.png");

    console.log("2. Contain mode - fits entirely within area.");
    const containMode = await cropImage({
        imagePath: imageUrl,
        width: 800,
        height: 600,
        fit: 'contain',
        position: 'center',
        background: '#f0f0f0'
    });
    fs.writeFileSync("./output/scaling-contain.png", containMode);
    console.log("✅ Saved: scaling-contain.png");

    console.log("3. Fill mode - stretches to exact dimensions.");
    const fillMode = await cropImage({
        imagePath: imageUrl,
        width: 800,
        height: 400,
        fit: 'fill'
    });
    fs.writeFileSync("./output/scaling-fill.png", fillMode);
    console.log("✅ Saved: scaling-fill.png");

    console.log("4. Top-left positioning...");
    const topLeft = await cropImage({
        imagePath: imageUrl,
        width: 600,
        height: 400,
        fit: 'cover',
        position: 'top-left'
    });
    fs.writeFileSync("./output/position-top-left.png", topLeft);
    console.log("✅ Saved: position-top-left.png");

    console.log("5. Bottom-right positioning.");
    const bottomRight = await cropImage({
        imagePath: imageUrl,
        width: 600,
        height: 400,
        fit: 'cover',
        position: 'bottom-right'
    });
    fs.writeFileSync("./output/position-bottom-right.png", bottomRight);
    console.log("✅ Saved: position-bottom-right.png");

    console.log("6. Inside mode - never upscale.");
    const insideMode = await cropImage({
        imagePath: imageUrl,
        width: 2000,
        height: 1500,
        fit: 'inside',
        background: '#e8e8e8'
    });
    fs.writeFileSync("./output/scaling-inside.png", insideMode);
    console.log("✅ Saved: scaling-inside.png");
}

advancedScaling()
    .then(() => {
        console.log("\n🎉 Advanced scaling examples completed!");
        console.log("Check the generated files to see the differences between fit modes and positions.");
    })
    .catch(error => {
        console.error("❌ Error:", error.message);
    });
