const { cropImage } = require("../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2023/03/22/07/52/lizard-7868932_960_720.jpg';

async function basicCropping() {
    console.log("🎯 Basic Cropping Examples\n");

    console.log("1. Basic crop with center alignment.");
    const basicCrop = await cropImage({
        imagePath: imageUrl,
        width: 800,
        height: 600,
        cropCenter: true
    });
    fs.writeFileSync("./output/basic-crop.png", basicCrop);
    console.log("✅ Saved: basic-crop.png");

    console.log("2. Crop with specific coordinates.");
    const coordinateCrop = await cropImage({
        imagePath: imageUrl,
        x: 100,
        y: 50,
        width: 500,
        height: 400
    });
    fs.writeFileSync("./output/coordinate-crop.png", coordinateCrop);
    console.log("✅ Saved: coordinate-crop.png");

    console.log("3. Crop with rounded corners.");
    const roundedCrop = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        borderRadius: 50,
        cropCenter: true
    });
    fs.writeFileSync("./output/rounded-crop.png", roundedCrop);
    console.log("✅ Saved: rounded-crop.png");

    console.log("4. Circle crop...");
    const circleCrop = await cropImage({
        imagePath: imageUrl,
        width: 300,
        height: 300,
        circle: true,
        cropCenter: true
    });
    fs.writeFileSync("./output/circle-crop.png", circleCrop);
    console.log("✅ Saved: circle-crop.png");
}

basicCropping()
    .then(() => {
        console.log("\n🎉 Basic cropping examples completed!");
        console.log("Check the generated files in the ./output directory.");
    })
    .catch(error => {
        console.error("❌ Error:", error.message);
    });
