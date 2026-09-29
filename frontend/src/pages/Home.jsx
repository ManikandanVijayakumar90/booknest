import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to BookNest</h1>
        <p>
          Discover your next favourite book. Explore Tamil and English books and
          find your next great read.
        </p>
        <Link to="/books" className="explore-btn">
          Explore Books
        </Link>
      </section>
    </div>
  );
}

export default Home;
