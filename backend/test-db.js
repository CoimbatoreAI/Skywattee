const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Gallery = require("./models/Gallery");

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const images = await Gallery.find().limit(5);
        console.log("Found images:", images.map(img => img.imageUrl));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

test();
