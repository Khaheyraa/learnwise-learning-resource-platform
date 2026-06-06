import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">LearnWise</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/recommendations">Recommendations</Link>

        {user ? (
          <>
            <Link to="/bookmarks">My Bookmarks</Link>
            <span className="user-name">Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;