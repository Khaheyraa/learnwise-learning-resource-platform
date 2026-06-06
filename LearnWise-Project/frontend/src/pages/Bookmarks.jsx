import { useEffect, useState } from "react";
import axios from "axios";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBookmarks = async () => {
    try {
      if (!user) {
        setMessage("Please login to view bookmarks");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/users/${user.id}/bookmarks`
      );

      setBookmarks(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="bookmarks-page">
      <h1>My Bookmarks</h1>
      <p className="bookmark-subtitle">
        Your saved learning resources are shown here.
      </p>

      {message && <p className="message">{message}</p>}

      <div className="resource-list">
        {bookmarks.length === 0 ? (
          <p className="empty-text">No bookmarked resources yet.</p>
        ) : (
          bookmarks.map((resource) => (
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
                <strong>Total Reviews:</strong> {resource.reviews?.length || 0}
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

export default Bookmarks;