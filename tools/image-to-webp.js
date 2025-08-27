// convert-images.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.resolve("./static/img/partners/src");
const outputDir = path.resolve("./static/img/partners");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Supported extensions (now includes .avif)
const exts = [".jpg", ".jpeg", ".png", ".svg", ".avif"];

fs.readdirSync(inputDir).forEach(async (file) => {
    const ext = path.extname(file).toLowerCase();

    if (exts.includes(ext)) {
        const inputPath = path.join(inputDir, file);
        const baseName = path.basename(file, ext);

        const webpPath = path.join(outputDir, baseName + ".webp");
        const avifPath = path.join(outputDir, baseName + ".avif");

        try {
            // Convert to WebP
            await sharp(inputPath)
                .webp({ quality: 100, lossless: true })
                .toFile(webpPath);

            console.log(`✅ Converted: ${file} → ${baseName}.webp`);

            // Convert to AVIF
            await sharp(inputPath)
                .avif({ quality: 100, lossless: true })
                .toFile(avifPath);

            console.log(`✅ Converted: ${file} → ${baseName}.avif`);
        } catch (err) {
            console.error(`❌ Error converting ${file}:`, err);
        }
    }
});
