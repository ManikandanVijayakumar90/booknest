import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        BookNest
      </Link>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
