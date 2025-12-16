const { cropImage } = require("../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2022/09/16/23/09/mountains-7459822_960_720.jpg';

async function customShapes() {
    console.log("🔶 Custom Shapes Examples\n");

    console.log("1. Triangle shape.");
    const triangle = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'polygon',
            sides: 3
        }
    });
    fs.writeFileSync("./output/shape-triangle.png", triangle);
    console.log("✅ Saved: shape-triangle.png");

    console.log("2. Pentagon shape.");
    const pentagon = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'polygon',
            sides: 5
        }
    });
    fs.writeFileSync("./output/shape-pentagon.png", pentagon);
    console.log("✅ Saved: shape-pentagon.png");

    console.log("3. Hexagon shape.");
    const hexagon = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'polygon',
            sides: 6
        }
    });
    fs.writeFileSync("./output/shape-hexagon.png", hexagon);
    console.log("✅ Saved: shape-hexagon.png");

    console.log("4. Octagon shape.");
    const octagon = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'polygon',
            sides: 8
        }
    });
    fs.writeFileSync("./output/shape-octagon.png", octagon);
    console.log("✅ Saved: shape-octagon.png");

    console.log("5. Five-pointed star.");
    const star5 = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'star',
            sides: 5
        }
    });
    fs.writeFileSync("./output/shape-star-5.png", star5);
    console.log("✅ Saved: shape-star-5.png");

    console.log("6. Six-pointed star.");
    const star6 = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'star',
            sides: 6
        }
    });
    fs.writeFileSync("./output/shape-star-6.png", star6);
    console.log("✅ Saved: shape-star-6.png");

    console.log("7. Diamond shape (custom points).");
    const diamond = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'custom',
            points: [
                { x: 50, y: 0 },
                { x: 100, y: 50 },
                { x: 50, y: 100 },
                { x: 0, y: 50 }
            ]
        }
    });
    fs.writeFileSync("./output/shape-diamond.png", diamond);
    console.log("✅ Saved: shape-diamond.png");


    console.log("8. Arrow shape (custom points).");
    const arrow = await cropImage({
        imagePath: imageUrl,
        width: 400,
        height: 400,
        shape: {
            type: 'custom',
            points: [
                { x: 0, y: 35 },
                { x: 60, y: 35 },
                { x: 60, y: 15 },
                { x: 100, y: 50 },
                { x: 60, y: 85 },
                { x: 60, y: 65 },
                { x: 0, y: 65 }
            ]
        }
    });
    fs.writeFileSync("./output/shape-arrow.png", arrow);
    console.log("✅ Saved: shape-arrow.png");
}

customShapes()
    .then(() => {
        console.log("\n🎉 Custom shape examples completed!");
        console.log("Explore the different geometric and custom shapes created.");
    })
    .catch(error => {
        console.error("❌ Error:", error.message);
    });
