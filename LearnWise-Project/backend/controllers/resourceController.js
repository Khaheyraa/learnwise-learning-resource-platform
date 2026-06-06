const Resource = require("../models/Resource");

// ADD RESOURCE
const addResource = async (req, res) => {
  try {
    const { title, description, link, category, level } = req.body;

    if (!title || !description || !link || !category || !level) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const resource = await Resource.create({
      title,
      description,
      link,
      category,
      level,
      reviews: [],
    });

    res.status(201).json({
      message: "Resource added successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL RESOURCES
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ADD REVIEW TO RESOURCE
const addReview = async (req, res) => {
  try {
    const { reviewerName, rating, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({
        message: "Please fill all review fields",
      });
    }

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    resource.reviews.push({
      reviewerName,
      rating,
      comment,
    });

    await resource.save();

    res.status(201).json({
      message: "Review added successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { addResource, getResources, addReview };