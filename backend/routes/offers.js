const express = require("express");
const multer = require("multer");
const path = require("path");
const Offer = require("../models/Offer");
const auth = require("../middleware/auth");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/offers");
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

// Get all offers (Admin)
router.get("/all", auth, async (req, res) => {
    try {
        const offers = await Offer.find().sort({ order: 1 });
        res.send(offers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch offers" });
    }
});

// Get active offers (Public)
router.get("/", async (req, res) => {
    try {
        const offers = await Offer.find({ active: true }).sort({ order: 1 });
        res.send(offers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch active offers" });
    }
});

// Add an offer
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Please upload an image" });
        }

        const imageUrl = `/uploads/offers/${req.file.filename}`;
        const { title, description, link, active, order } = req.body;

        const offer = new Offer({
            title,
            imageUrl,
            description,
            link,
            active: active === "true" || active === true,
            order: order || 0,
        });

        await offer.save();
        res.status(201).send(offer);
    } catch (error) {
        res.status(500).send({ error: "Failed to add offer" });
    }
});

// Update an offer
router.put("/:id", auth, upload.single("image"), async (req, res) => {
    try {
        const { title, description, link, active, order } = req.body;
        let data = { title, description, link, active: active === "true" || active === true, order };

        if (req.file) {
            data.imageUrl = `/uploads/offers/${req.file.filename}`;
        }

        const offer = await Offer.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!offer) {
            return res.status(404).send({ error: "Offer not found" });
        }

        res.send(offer);
    } catch (error) {
        res.status(500).send({ error: "Failed to update offer" });
    }
});

// Delete an offer
router.delete("/:id", auth, async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).send({ error: "Offer not found" });
        }

        const filePath = path.join(__dirname, "..", offer.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.send({ message: "Offer deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete offer" });
    }
});

module.exports = router;
