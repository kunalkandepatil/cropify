const { cropImage, presets } = require("../../dist/index");
const fs = require("fs");

const imageUrl = 'https://cdn.pixabay.com/photo/2023/02/11/14/46/ai-generated-7783062_960_720.jpg';

async function socialMediaPresets() {
    console.log("📱 Social Media Presets Examples\n");

    console.log("📸 Instagram presets.");

    console.log("1. Instagram square post (1080x1080).");
    const instagramSquare = await cropImage({
        imagePath: imageUrl,
        ...presets.instagram.square,
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 15,
            saturation: 25,
            contrast: 10
        },
        output: {
            format: 'png',
            quality: 90
        }
    });
    fs.writeFileSync("./output/social-instagram-square.png", instagramSquare);
    console.log("✅ Saved: social-instagram-square.png");

    console.log("2. Instagram story (1080x1920).");
    const instagramStory = await cropImage({
        imagePath: imageUrl,
        ...presets.instagram.story,
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 10,
            saturation: 20
        },
        output: {
            format: 'png',
            quality: 85
        }
    });
    fs.writeFileSync("./output/social-instagram-story.png", instagramStory);
    console.log("✅ Saved: social-instagram-story.png");

    console.log("3. Instagram landscape (1080x566).");
    const instagramLandscape = await cropImage({
        imagePath: imageUrl,
        ...presets.instagram.landscape,
        fit: 'cover',
        position: 'center',
        output: {
            format: 'png',
            quality: 88
        }
    });
    fs.writeFileSync("./output/social-instagram-landscape.png", instagramLandscape);
    console.log("✅ Saved: social-instagram-landscape.png");

    console.log("\n🐦 Twitter presets...");

    console.log("4. Twitter header (1500x500).");
    const twitterHeader = await cropImage({
        imagePath: imageUrl,
        ...presets.twitter.header,
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 5,
            contrast: 15
        },
        output: {
            format: 'png',
            quality: 85
        }
    });
    fs.writeFileSync("./output/social-twitter-header.png", twitterHeader);
    console.log("✅ Saved: social-twitter-header.png");

    console.log("5. Twitter post (1200x675).");
    const twitterPost = await cropImage({
        imagePath: imageUrl,
        ...presets.twitter.post,
        fit: 'cover',
        position: 'center',
        output: {
            format: 'png',
            quality: 82
        }
    });
    fs.writeFileSync("./output/social-twitter-post.png", twitterPost);
    console.log("✅ Saved: social-twitter-post.png");

    console.log("\n👥 Facebook presets.");

    console.log("6. Facebook cover (820x312).");
    const facebookCover = await cropImage({
        imagePath: imageUrl,
        ...presets.facebook.cover,
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 8,
            saturation: 15
        },
        output: {
            format: 'png',
            quality: 85
        }
    });
    fs.writeFileSync("./output/social-facebook-cover.png", facebookCover);
    console.log("✅ Saved: social-facebook-cover.png");

    console.log("7. Facebook post (1200x630).");
    const facebookPost = await cropImage({
        imagePath: imageUrl,
        ...presets.facebook.post,
        fit: 'cover',
        position: 'center',
        output: {
            format: 'png',
            quality: 85
        }
    });
    fs.writeFileSync("./output/social-facebook-post.png", facebookPost);
    console.log("✅ Saved: social-facebook-post.png");

    console.log("\n🖼️ Thumbnail presets.");

    console.log("8. Small thumbnail (150x150).");
    const thumbSmall = await cropImage({
        imagePath: imageUrl,
        ...presets.thumbnails.small,
        fit: 'cover',
        circle: true
    });
    fs.writeFileSync("./output/social-thumb-small.png", thumbSmall);
    console.log("✅ Saved: social-thumb-small.png");

    console.log("9. Medium thumbnail (300x300).");
    const thumbMedium = await cropImage({
        imagePath: imageUrl,
        ...presets.thumbnails.medium,
        fit: 'cover',
        borderRadius: 30
    });
    fs.writeFileSync("social-thumb-medium.png", thumbMedium);
    console.log("✅ Saved: social-thumb-medium.png");

    console.log("10. Large thumbnail (600x600).");
    const thumbLarge = await cropImage({
        imagePath: imageUrl,
        ...presets.thumbnails.large,
        fit: 'cover',
        shape: {
            type: 'polygon',
            sides: 6
        }
    });
    fs.writeFileSync("./output/social-thumb-large.png", thumbLarge);
    console.log("✅ Saved: social-thumb-large.png");
}

async function customSocialMedia() {
    console.log("\n🎨 Custom Social Media Variations\n");

    console.log("1. Creative Instagram square with effects.");
    const creativeInsta = await cropImage({
        imagePath: imageUrl,
        ...presets.instagram.square,
        fit: 'cover',
        shape: {
            type: 'star',
            sides: 8
        },
        filters: {
            hue: 30,
            saturation: 40,
            brightness: 15
        },
        background: '#f8f9fa',
        output: {
            format: 'png'
        }
    });
    fs.writeFileSync("./output/social-creative-instagram.png", creativeInsta);
    console.log("✅ Saved: social-creative-instagram.png");

    console.log("2. Vintage Twitter header.");
    const vintageTwitter = await cropImage({
        imagePath: imageUrl,
        ...presets.twitter.header,
        fit: 'cover',
        filters: {
            sepia: true,
            brightness: -5,
            contrast: 20
        },
        output: {
            format: 'png',
            quality: 85
        }
    });
    fs.writeFileSync("./output/social-vintage-twitter.png", vintageTwitter);
    console.log("✅ Saved: social-vintage-twitter.png");

    console.log("3. Modern Facebook cover with gradient effect.");
    const modernFacebook = await cropImage({
        imagePath: imageUrl,
        ...presets.facebook.cover,
        fit: 'cover',
        filters: {
            brightness: 25,
            contrast: 30,
            saturation: 35
        },
        output: {
            format: 'png',
            quality: 90
        }
    });
    fs.writeFileSync("./output/social-modern-facebook.png", modernFacebook);
    console.log("✅ Saved: social-modern-facebook.png");

    console.log("4. Professional style (custom dimensions).");
    const professional = await cropImage({
        imagePath: imageUrl,
        width: 1200,
        height: 627,
        fit: 'cover',
        position: 'center',
        filters: {
            brightness: 10,
            contrast: 20,
            saturation: -10
        },
        output: {
            format: 'png',
            quality: 90
        }
    });
    fs.writeFileSync("./output/social-professional.png", professional);
    console.log("✅ Saved: social-professional.png");
}

async function runSocialMediaExamples() {
    try {
        await socialMediaPresets();
        await customSocialMedia();

        console.log("\n🎉 Social media preset examples completed!");
        console.log("All social media formats have been generated with optimal settings.");
        console.log("\nGenerated files:");
        console.log("📸 Instagram: square, story, landscape");
        console.log("🐦 Twitter: header, post, vintage header");
        console.log("👥 Facebook: cover, post, modern cover");
        console.log("🖼️ Thumbnails: small (circle), medium (rounded), large (hexagon)");
        console.log("💼 Professional: LinkedIn-style image");
        console.log("🎨 Creative: Star-shaped Instagram post");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

runSocialMediaExamples();