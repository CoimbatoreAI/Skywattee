const express = require("express");
const Career = require("../models/Career");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all careers
router.get("/", async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.send(careers);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch careers" });
    }
});

// Add a career
router.post("/", auth, async (req, res) => {
    try {
        const { title, postings, description } = req.body;
        const career = new Career({
            title,
            postings,
            description,
        });
        await career.save();
        res.status(201).send(career);
    } catch (error) {
        res.status(500).send({ error: "Failed to add career" });
    }
});

// Update a career
router.put("/:id", auth, async (req, res) => {
    try {
        const { title, postings, description } = req.body;
        const career = await Career.findByIdAndUpdate(
            req.params.id,
            { title, postings, description },
            { new: true }
        );
        if (!career) {
            return res.status(404).send({ error: "Career not found" });
        }
        res.send(career);
    } catch (error) {
        res.status(500).send({ error: "Failed to update career" });
    }
});

// Delete a career
router.delete("/:id", auth, async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).send({ error: "Career not found" });
        }
        res.send({ message: "Career deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete career" });
    }
});

module.exports = router;
