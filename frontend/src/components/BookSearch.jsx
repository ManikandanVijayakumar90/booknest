import { useState } from "react";
import { searchBooks } from "../services/services";
import BookCard from "./BookCard";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a book title or author");
      setBooks([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchBooks(query, language);
      setBooks(data.books || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>BookNest</h1>
      <p>Discover your favourite next book</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search by book title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="search-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="all">All Languages</option>
          <option value="ta">Tamil</option>
          <option value="en">English</option>
        </select>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {loading && <p>Loading books...</p>}

      {!loading && books.length === 0 && !error && (
        <p>Search for a book to get started.</p>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.googleBooksId} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
