const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");
const fs = require("fs");

const router = express.Router();

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/gallery");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Get all gallery images
router.get("/", async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.send(images);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch gallery images" });
    }
});

// Add a gallery image
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Please upload an image" });
        }

        const imageUrl = `/uploads/gallery/${req.file.filename}`;
        const galleryItem = new Gallery({
            title: req.body.title || "Solar Project",
            imageUrl,
        });

        await galleryItem.save();
        res.status(201).send(galleryItem);
    } catch (error) {
        res.status(500).send({ error: "Failed to add image" });
    }
});

// Delete a gallery image
router.delete("/:id", auth, async (req, res) => {
    try {
        const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
        if (!galleryItem) {
            return res.status(404).send({ error: "Image not found" });
        }

        // Optionally delete the file from the system
        const filePath = path.join(__dirname, "..", galleryItem.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.send({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete image" });
    }
});

module.exports = router;
