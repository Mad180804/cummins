// const express = require("express");
// const Problem = require("../models/Problem");
// const router = express.Router();


// // router.post("/report", async (req, res) => {
// //     try {
// //         const { title, description, city, latitude, longitude, urgency, reportedBy } = req.body;

// //         const problem = new Problem({
// //             title, description, city, latitude, longitude, urgency, reportedBy
// //         });

// //         await problem.save();
// //         res.status(201).json({ msg: "Problem reported successfully" });
// //     } catch (err) {
// //         res.status(500).json({ msg: "Server Error" });
// //     }
// // });

// // Get Problems by City
// router.get("/:city", async (req, res) => {
//     try {
//         const problems = await Problem.find({ city: req.params.city });
//         res.json(problems);
//     } catch (err) {
//         res.status(500).json({ msg: "Server Error" });
//     }
// });

// // // Mark Problem as Solved
// // router.put("/solve/:id", async (req, res) => {
// //     try {
// //         const problem = await Problem.findById(req.params.id);
// //         if (!problem) return res.status(404).json({ msg: "Problem not found" });

// //         problem.status = "Solved";
// //         problem.resolvedAt = new Date();
// //         await problem.save();

// //         res.json({ msg: "Problem marked as solved" });
// //     } catch (err) {
// //         res.status(500).json({ msg: "Server Error" });
// //     }
// // });

// module.exports = router;



const express = require("express");
const Problem = require("../models/problemSchema");
const router = express.Router();

// Fetch problems by city
router.get("/:city", async (req, res) => {
  try {
    console.log("Inside")
    const city = req.params.city;
    const problems = await Problem.find({city});
    console.log(city)
    console.log(problems)
    res.json(problems);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
