const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

projectSchema.virtual("username", {
  ref: "User",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
  options: { select: 'name' },
});

projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Project", projectSchema);
