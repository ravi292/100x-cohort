const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const { Admin, Course } = require("../db");

// Admin Routes
router.post("/signup", (req, res) => {
	// Implement admin signup logic
	const username = req.body.username;
	const password = req.body.password;

	Admin.create({
		username,
		password,
	});

	res.status(201).json({ message: "Admin created successfully..." });
});

router.post("/courses", adminMiddleware, async (req, res) => {
	// Implement course creation logic
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imageLink = req.body.imageLink;

	const newCourse = await Course.create({
		title,
		description,
		price,
		imageLink,
	});

	res.status(201).json({
		message: "Course created successfully...",
		courseId: newCourse._id,
	});
});

router.get("/courses", adminMiddleware, (req, res) => {
	// Implement fetching all courses logic

	Course.find().then(function (course) {
		res.json({ courses: course });
	});
});

module.exports = router;