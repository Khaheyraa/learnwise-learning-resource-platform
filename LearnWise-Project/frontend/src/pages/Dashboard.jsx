import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resources");
      setResources(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const totalResources = resources.length;

  const beginnerCount = resources.filter(
    (resource) => resource.level === "Beginner"
  ).length;

  const intermediateCount = resources.filter(
    (resource) => resource.level === "Intermediate"
  ).length;

  const advancedCount = resources.filter(
    (resource) => resource.level === "Advanced"
  ).length;

  const totalReviews = resources.reduce(
    (total, resource) => total + (resource.reviews?.length || 0),
    0
  );

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const topRatedResources = [...resources]
    .filter((resource) => resource.reviews && resource.reviews.length > 0)
    .sort(
      (a, b) =>
        getAverageRating(b.reviews) - getAverageRating(a.reviews)
    )
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">
        Track LearnWise resources, levels, reviews and top-rated content.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalResources}</h2>
          <p>Total Resources</p>
        </div>

        <div className="stat-card">
          <h2>{beginnerCount}</h2>
          <p>Beginner</p>
        </div>

        <div className="stat-card">
          <h2>{intermediateCount}</h2>
          <p>Intermediate</p>
        </div>

        <div className="stat-card">
          <h2>{advancedCount}</h2>
          <p>Advanced</p>
        </div>

        <div className="stat-card">
          <h2>{totalReviews}</h2>
          <p>Total Reviews</p>
        </div>
      </div>

      <h2 className="section-title">Top Rated Resources</h2>

      <div className="resource-list">
        {topRatedResources.length === 0 ? (
          <p className="empty-text">No rated resources yet.</p>
        ) : (
          topRatedResources.map((resource) => (
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
                {getAverageRating(resource.reviews).toFixed(1)} / 5
              </p>

              <a href={resource.link} target="_blank" rel="noreferrer">
                Visit Resource
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
