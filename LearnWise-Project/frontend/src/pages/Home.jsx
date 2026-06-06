import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>LearnWise</h1>

          <h2>Personalized Learning Resource Review Platform</h2>

          <p>
            Discover, add, review, bookmark and get personalized recommendations
            for trusted learning resources like courses, books, tutorials and
            documentation.
          </p>

          <div className="hero-buttons">
            <Link to="/resources">
              <button>Explore Resources</button>
            </Link>

            <Link to="/recommendations">
              <button className="secondary-btn">Get Recommendations</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why LearnWise?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Add Resources</h3>
            <p>
              Users can add useful courses, tutorials, books and learning links.
            </p>
          </div>

          <div className="feature-card">
            <h3>⭐ Review & Rating</h3>
            <p>
              Learners can rate resources and write reviews to help others.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔍 Search & Filter</h3>
            <p>
              Find resources easily by category, title, description and skill
              level.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔖 Bookmarks</h3>
            <p>
              Save your favorite learning resources and access them anytime.
            </p>
          </div>

          <div className="feature-card">
            <h3>🎯 Recommendations</h3>
            <p>
              Get personalized suggestions based on bookmarks, ratings and
              categories.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Dashboard</h3>
            <p>
              View useful statistics like total resources, levels and top-rated
              content.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;