const mongoose = require("mongoose");

const MetricsSchema = new mongoose.Schema({
    city: { type: String, required: true },
    totalProblems: { type: Number, default: 0 },
    unsolvedProblems: { type: Number, default: 0 },
    highUrgencyUnsolved: { type: Number, default: 0 },
    avgResolutionTime: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Metrics", MetricsSchema);
