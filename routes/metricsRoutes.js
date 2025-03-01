// const express = require("express");
// const Problem = require("../models/problemSchema");
// const Metric = require("../models/metricsSchema");
// const router = express.Router();

// // Calculate and update metrics for a city
// router.get("/:city", async (req, res) => {
//     try {
//         const city = req.params.city;
//         const problems = await Problem.find({ status: "Unsolved" });
// console.log(problems);

//         const totalProblems = await Problem.countDocuments({ city });
//         const unresolvedProblems = await problems.countDocuments({city});
//         const highUrgency = await Problem.countDocuments({ city, urgency: "High" });

//         const solvedProblems = await Problem.find({ city, status: "Solved", resolvedAt: { $ne: null } });
//         const totalDuration = solvedProblems.reduce((sum, problem) => sum + ((problem.resolvedAt - problem.reportedAt) / (1000 * 60 * 60 * 24)), 0);
//         const averageDuration = solvedProblems.length > 0 ? (totalDuration / solvedProblems.length) : 0;

//         const metrics = await Metric.findOneAndUpdate(
//             { city },
//             { totalProblems, unresolvedProblems, highUrgency, averageDuration },
//             { upsert: true, new: true }
//         );
//         console.log(metrics)
//         res.json(metrics);
//     } catch (error) {
//         console.error("Error fetching metrics:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// module.exports = router;




const express = require("express");
const Problem = require("../models/problemSchema");
const Metric = require("../models/metricsSchema");
const router = express.Router();

// Calculate and update metrics for a city
// router.get("/:city", async (req, res) => {
//     try {
//         const city = req.params.city;

//         // Fetch problems in this city
//         const totalProblems = await Problem.countDocuments({ city });
//         const unresolvedProblems = await Problem.countDocuments({ city, status: "Unsolved" });
//         const highUrgency = await Problem.countDocuments({ city, urgency: "High" });

//         console.log("Total Problems:", totalProblems);
//         console.log("Unresolved Problems:", unresolvedProblems);
//         console.log("High Urgency:", highUrgency);

//         // Calculate average resolution duration
//         const solvedProblems = await Problem.find({ city, status: "Solved", resolvedAt: { $ne: null } });
//         const totalDuration = solvedProblems.reduce((sum, problem) => 
//             sum + ((problem.resolvedAt - problem.reportedAt) / (1000 * 60 * 60 * 24)), 0
//         );
//         const averageDuration = solvedProblems.length > 0 ? (totalDuration / solvedProblems.length) : 0;

//         // Update metrics in database
//         const metrics = await Metric.findOneAndUpdate(
//             { city },
//             { totalProblems, unresolvedProblems, highUrgency, averageDuration },
//             { upsert: true, new: true }
//         );

//         console.log("Metrics Updated:", metrics);
//         res.json(metrics);
//     } catch (error) {
//         console.error("Error fetching metrics:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// });
router.get("/:city", async (req, res) => {
    try {
        const city = req.params.city;

        // Fetch count of problems
        const totalProblems = await Problem.countDocuments({ city });
        const unsolvedProblems = await Problem.countDocuments({ city, status: "Unsolved" });
        const highUrgencyUnsolved = await Problem.countDocuments({ city, status: "Unsolved", urgency: "High" });

        // Calculate avg resolution time
        const solvedProblems = await Problem.find({ city, status: "Solved", resolvedAt: { $ne: null } });
        const totalDuration = solvedProblems.reduce((sum, problem) => 
            sum + ((problem.resolvedAt - problem.reportedAt) / (1000 * 60 * 60 * 24)), 0
        );
        const avgResolutionTime = solvedProblems.length > 0 ? (totalDuration / solvedProblems.length) : 0;

        // Update metrics in database
        const metrics = await Metric.findOneAndUpdate(
            { city },
            { totalProblems, unsolvedProblems, highUrgencyUnsolved, avgResolutionTime },
            { upsert: true, new: true }
        );

        console.log("Metrics Updated:", metrics);
        res.json(metrics);
    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
