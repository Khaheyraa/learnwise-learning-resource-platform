const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);