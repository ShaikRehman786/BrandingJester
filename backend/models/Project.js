const mongoose = require("mongoose");

// Stores project details
const projectSchema = new mongoose.Schema(
  {
    // Link project to client
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    // Project preview image (VERY IMPORTANT for dashboard)
    image: {
      type: String,
      required: true, // Because UI needs thumbnail
      trim: true,
    },

    //  Project link (see project button)
    link: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
