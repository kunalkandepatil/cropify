const { cropImage } = require("../../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2025/07/10/01/55/gerbera-9705677_960_720.png';

async function imageFilters() {
    console.log("🎨 Image Filters & Effects Examples\n");

    console.log("1. Brightness adjustment.");
    const brightness = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            brightness: 30
        }
    });
    fs.writeFileSync("./output/filter-brightness.png", brightness);
    console.log("✅ Saved: filter-brightness.png");

    console.log("2. Contrast enhancement.");
    const contrast = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            contrast: 25
        }
    });
    fs.writeFileSync("./output/filter-contrast.png", contrast);
    console.log("✅ Saved: filter-contrast.png");

    console.log("3. Saturation boost.");
    const saturation = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            saturation: 40
        }
    });
    fs.writeFileSync("./output/filter-saturation.png", saturation);
    console.log("✅ Saved: filter-saturation.png");

    console.log("4. Blur effect.");
    const blur = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            blur: 5
        }
    });
    fs.writeFileSync("./output/filter-blur.png", blur);
    console.log("✅ Saved: filter-blur.png");

    console.log("5. Grayscale conversion.");
    const grayscale = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            grayscale: true
        }
    });
    fs.writeFileSync("./output/filter-grayscale.png", grayscale);
    console.log("✅ Saved: filter-grayscale.png");

    console.log("6. Sepia tone effect.");
    const sepia = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            sepia: true
        }
    });
    fs.writeFileSync("./output/filter-sepia.png", sepia);
    console.log("✅ Saved: filter-sepia.png");

    console.log("7. Color inversion.");
    const invert = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            invert: true
        }
    });
    fs.writeFileSync("./output/filter-invert.png", invert);
    console.log("✅ Saved: filter-invert.png");

    console.log("8. Hue rotation.");
    const hueRotate = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            hue: 180
        }
    });
    fs.writeFileSync("./output/filter-hue-rotate.png", hueRotate);
    console.log("✅ Saved: filter-hue-rotate.png");

    console.log("9. Combined filters for artistic effect.");
    const combined = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        cropCenter: true,
        filters: {
            brightness: 20,
            contrast: 15,
            saturation: -20,
            blur: 1
        }
    });
    fs.writeFileSync("./output/filter-combined.png", combined);
    console.log("✅ Saved: filter-combined.png");
}

imageFilters()
    .then(() => {
        console.log("\n🎉 Image filter examples completed!");
        console.log("Compare the different filter effects in the generated images.");
    })
    .catch(error => {
        console.error("❌ Error:", error.message);
    });
