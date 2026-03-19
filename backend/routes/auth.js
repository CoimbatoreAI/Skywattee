const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).send({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.send({ admin: { email: admin.email, id: admin._id }, token });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

// Get self info
router.get("/me", auth, async (req, res) => {
    res.send({ email: req.admin.email, id: req.admin._id });
});

module.exports = router;
