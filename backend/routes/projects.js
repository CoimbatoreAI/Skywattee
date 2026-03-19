const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const fs = require("fs");

const router = express.Router();

// Multer Storage for Projects
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/projects");
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

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.send(projects);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch projects" });
    }
});

// Admin: Add Project
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Please upload an image" });
        }

        const project = new Project({
            ...req.body,
            imageUrl: `/uploads/projects/${req.file.filename}`,
        });

        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(500).send({ error: "Failed to create project" });
    }
});

// Admin: Update Project
router.put("/:id", auth, upload.single("image"), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = `/uploads/projects/${req.file.filename}`;
        }

        const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!project) return res.status(404).send({ error: "Project not found" });

        res.send(project);
    } catch (error) {
        res.status(500).send({ error: "Failed to update project" });
    }
});

// Admin: Delete Project
router.delete("/:id", auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).send({ error: "Project not found" });

        const filePath = path.join(__dirname, "..", project.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.send({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete project" });
    }
});

module.exports = router;
