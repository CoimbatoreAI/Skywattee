const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const Career = require("./models/Career");
const Gallery = require("./models/Gallery");
const Project = require("./models/Project");

dotenv.config();

const careers = [
    { title: "Sales Person", postings: 2 },
    { title: "Service Engg", postings: 2 },
    { title: "Service & Install Technician", postings: 6 },
    { title: "Admin Office (Degree)", postings: 2 },
];

const projects = [
    {
        title: "Residential Rooftop 5kW",
        description: "Standard residential solar installation providing complete household energy.",
        category: "Residential",
        imageUrl: "/uploads/gallery/images (1).jpeg",
        order: 1
    },
    {
        title: "Commercial Office Complex 50kW",
        description: "Large scale solar installation for modern office spaces to reduce operational costs.",
        category: "Commercial",
        imageUrl: "/uploads/gallery/images (2).jpeg",
        order: 2
    },
    {
        title: "Industrial Manufacturing Unit 200kW",
        description: "Heavy duty solar power generation for industrial requirements and peak load management.",
        category: "Industrial",
        imageUrl: "/uploads/gallery/images (3).jpeg",
        order: 3
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Career.deleteMany({});
        await Gallery.deleteMany({});
        await Project.deleteMany({});

        // Seed Admin (Update or Create)
        const adminEmail = "admin@skywattee.com";
        const adminPassword = "vijay@sw2";

        let admin = await Admin.findOne({ email: adminEmail });
        if (admin) {
            admin.password = adminPassword;
            await admin.save();
            console.log("Admin updated.");
        } else {
            let oldAdmin = await Admin.findOne({ email: "admin@skywatt.com" });
            if (oldAdmin) {
                oldAdmin.email = adminEmail;
                oldAdmin.password = adminPassword;
                await oldAdmin.save();
                console.log("Old admin updated to new credentials.");
            } else {
                await Admin.create({
                    email: adminEmail,
                    password: adminPassword,
                });
                console.log("Admin created.");
            }
        }

        // Seed Careers
        await Career.insertMany(careers);
        console.log("Careers seeded.");

        // Updated gallery image path to match backend uploads
        const galleryImages = Array.from({ length: 42 }, (_, i) => ({
            title: `Solar Project ${i + 1}`,
            imageUrl: `/uploads/gallery/images (${i + 1}).jpeg`,
        }));

        // Seed Gallery
        await Gallery.insertMany(galleryImages);
        console.log("Gallery seeded.");

        // Seed Projects
        await Project.insertMany(projects);
        console.log("Projects seeded.");

        console.log("Seeding complete!");
        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedData();
