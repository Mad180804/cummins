// const mongoose = require("mongoose");

// const ProblemSchema = new mongoose.Schema({
//     title: { type: String, enum: ["Zebra", "Garbage"],required: true },
//     city: { type: String, required: true },
//     latitude: { type: Number, required: true },
//     longitude: { type: Number, required: true },
//     reportedAt: { type: Date, default: Date.now },
//     resolvedAt: { type: Date, default: null },
//     status: { type: String, enum: ["Unsolved", "Solved"], default: "Unsolved" },
//     urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
// }, { timestamps: true });

// ProblemSchema.virtual("duration").get(function () {
//     return this.resolvedAt ? (this.resolvedAt - this.reportedAt) / (1000 * 60 * 60 * 24) : null;
// });

// module.exports = mongoose.model("Problem", ProblemSchema);




const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
    title: { type: String, enum: ["Zebra", "Garbage"], required: true },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    reportedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date, default: null },
    status: { type: String, enum: ["Unsolved", "Solved"], default: "Unsolved" },
    urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
}, { timestamps: true });

// Virtual field to calculate duration if solved
ProblemSchema.virtual("duration").get(function () {
    return this.resolvedAt ? (this.resolvedAt - this.reportedAt) / (1000 * 60 * 60 * 24) : null;
});

module.exports = mongoose.model("Problem", ProblemSchema, "Problems"); 