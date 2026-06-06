import { useEffect, useState } from "react";
import axios from "axios";

function Recommendations() {
  const [resources, setResources] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const resourceResponse = await axios.get(
        "http://localhost:5000/api/resources"
      );

      setResources(resourceResponse.data);

      if (user) {
        const bookmarkResponse = await axios.get(
          `http://localhost:5000/api/users/${user.id}/bookmarks`
        );

        setBookmarks(bookmarkResponse.data);
        generateRecommendations(resourceResponse.data, bookmarkResponse.data);
      } else {
        generateRecommendations(resourceResponse.data, []);
      }
    } catch (error) {
      setMessage("Unable to load recommendations");
    }
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const generateRecommendations = (allResources, bookmarkedResources) => {
    let finalRecommendations = [];

    if (bookmarkedResources.length > 0) {
      const bookmarkedCategories = bookmarkedResources.map(
        (resource) => resource.category
      );

      finalRecommendations = allResources.filter(
        (resource) =>
          bookmarkedCategories.includes(resource.category) &&
          !bookmarkedResources.some(
            (bookmark) => bookmark._id === resource._id
          )
      );
    }

    if (finalRecommendations.length === 0) {
      finalRecommendations = [...allResources]
        .filter((resource) => resource.reviews && resource.reviews.length > 0)
        .sort(
          (a, b) =>
            getAverageRating(b.reviews) - getAverageRating(a.reviews)
        );
    }

    if (finalRecommendations.length === 0) {
      finalRecommendations = allResources.filter(
        (resource) => resource.level === "Beginner"
      );
    }

    setRecommended(finalRecommendations.slice(0, 6));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommendations-page">
      <h1>Personalized Recommendations</h1>

      <p className="recommendation-subtitle">
        Resources are suggested based on your bookmarks, categories and ratings.
      </p>

      {message && <p className="message">{message}</p>}

      {user ? (
        <p className="recommendation-note">
          Hi {user.name}, here are resources picked for you.
        </p>
      ) : (
        <p className="recommendation-note">
          Login and bookmark resources to get better personalized suggestions.
        </p>
      )}

      <div className="resource-list">
        {recommended.length === 0 ? (
          <p className="empty-text">No recommendations available yet.</p>
        ) : (
          recommended.map((resource) => (
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

export default Recommendations;