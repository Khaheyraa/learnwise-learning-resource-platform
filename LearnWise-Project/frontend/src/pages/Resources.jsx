import { useEffect, useState } from "react";
import axios from "axios";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    level: "Beginner",
  });

  const [reviewData, setReviewData] = useState({});

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resources");
      setResources(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Unable to load resources");
    }
  };

  const fetchBookmarks = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `http://localhost:5000/api/users/${user.id}/bookmarks`
      );

      setBookmarks(response.data.map((resource) => resource._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
    fetchBookmarks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewChange = (resourceId, e) => {
    setReviewData({
      ...reviewData,
      [resourceId]: {
        ...reviewData[resourceId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddResource = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resources/add",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        title: "",
        description: "",
        link: "",
        category: "",
        level: "Beginner",
      });

      fetchResources();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddReview = async (resourceId) => {
    try {
      const currentReview = reviewData[resourceId];

      const reviewPayload = {
        reviewerName: user?.name || "Anonymous",
        rating: Number(currentReview?.rating),
        comment: currentReview?.comment,
      };

      const response = await axios.post(
        `http://localhost:5000/api/resources/${resourceId}/reviews`,
        reviewPayload
      );

      setMessage(response.data.message);

      setReviewData({
        ...reviewData,
        [resourceId]: {
          rating: "",
          comment: "",
        },
      });

      fetchResources();
    } catch (error) {
      setMessage(error.response?.data?.message || "Review not added");
    }
  };

  const handleBookmark = async (resourceId) => {
    try {
      if (!user) {
        setMessage("Please login to bookmark resources");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/users/bookmark", {
        userId: user.id,
        resourceId,
      });

      setMessage(response.data.message);
      fetchBookmarks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Bookmark failed");
    }
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No ratings yet";

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;

    return `${average.toFixed(1)} / 5`;
  };

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.category.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText);

    const matchesLevel =
      levelFilter === "All" || resource.level === levelFilter;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="resources-page">
      <section className="resource-hero">
        <h1>Learning Resources</h1>
        <p>
          Add, discover, review, bookmark and filter trusted learning resources.
        </p>
      </section>

      <div className="resource-layout">
        <div className="resource-form-card">
          <h2>Add Resource</h2>

          <form onSubmit={handleAddResource}>
            <input
              type="text"
              name="title"
              placeholder="Resource title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Resource description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="link"
              placeholder="Resource link"
              value={formData.link}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category e.g. Web Development"
              value={formData.category}
              onChange={handleChange}
            />

            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button type="submit">Add Resource</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>

        <div className="resources-content">
          <div className="filter-box">
            <input
              type="text"
              placeholder="Search by title, category or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <h2 className="section-title">All Learning Resources</h2>

          <div className="resource-list">
            {filteredResources.length === 0 ? (
              <p className="empty-text">No matching resources found.</p>
            ) : (
              filteredResources.map((resource) => (
                <div className="resource-card" key={resource._id}>
                  <div className="card-top">
                    <h3>{resource.title}</h3>
                    <span>{resource.level}</span>
                  </div>

                  <p>{resource.description}</p>

                  <p>
                    <strong>Category:</strong> {resource.category}
                  </p>

                  <p>
                    <strong>Average Rating:</strong>{" "}
                    {getAverageRating(resource.reviews)}
                  </p>

                  <p>
                    <strong>Total Reviews:</strong>{" "}
                    {resource.reviews?.length || 0}
                  </p>

                  <div className="card-actions">
                    <a href={resource.link} target="_blank" rel="noreferrer">
                      Visit Resource
                    </a>

                    <button onClick={() => handleBookmark(resource._id)}>
                      {bookmarks.includes(resource._id)
                        ? "Bookmarked"
                        : "Bookmark"}
                    </button>
                  </div>

                  <div className="review-section">
                    <h4>Add Review</h4>

                    <select
                      name="rating"
                      value={reviewData[resource._id]?.rating || ""}
                      onChange={(e) => handleReviewChange(resource._id, e)}
                    >
                      <option value="">Select Rating</option>
                      <option value="1">⭐ 1</option>
                      <option value="2">⭐⭐ 2</option>
                      <option value="3">⭐⭐⭐ 3</option>
                      <option value="4">⭐⭐⭐⭐ 4</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5</option>
                    </select>

                    <textarea
                      name="comment"
                      placeholder="Write your review..."
                      value={reviewData[resource._id]?.comment || ""}
                      onChange={(e) => handleReviewChange(resource._id, e)}
                    ></textarea>

                    <button onClick={() => handleAddReview(resource._id)}>
                      Submit Review
                    </button>
                  </div>

                  <div className="reviews-list">
                    <h4>Reviews</h4>

                    {resource.reviews && resource.reviews.length > 0 ? (
                      resource.reviews.map((review) => (
                        <div className="single-review" key={review._id}>
                          <p>
                            <strong>{review.reviewerName}</strong> — ⭐{" "}
                            {review.rating}/5
                          </p>
                          <p>{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;