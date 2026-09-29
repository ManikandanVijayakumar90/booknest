import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/services";

const cleanDescription = (description = "") => {
  return description
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
};

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/books/${encodeURIComponent(id)}`);

        setBook(response.data);
      } catch (err) {
        console.error("Book Details Error:", err.response?.data || err.message);
        setError(
          err.response?.data?.message || "Unable to fetch book details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error || !book) {
    return (
      <div className="book-details">
        <p role="alert">{error || "Book not found."}</p>
        <Link to="/books">Back to Books</Link>
      </div>
    );
  }

  return (
    <div className="book-details">
      <Link to="/books" className="back-link">
        ← Back to Books
      </Link>

      <div className="book-details-content">
        {book.thumbnail && (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="details-cover"
          />
        )}

        <div className="details-info">
          <h1>{book.title}</h1>

          <p>
            <strong>Author:</strong> {book.authors?.join(", ") || "Unknown"}
          </p>

          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>

          <p>
            <strong>Published:</strong> {book.publishedDate}
          </p>

          <p>
            <strong>Pages:</strong> {book.pageCount || "Unknown"}
          </p>

          <p>
            <strong>Language:</strong> {book.language}
          </p>

          <p>
            <strong>Categories:</strong>{" "}
            {book.categories?.join(", ") || "Uncategorized"}
          </p>

          <h3>Description</h3>
          <p className="book-description" style={{ whiteSpace: "pre-line" }}>
            {cleanDescription(book.description || "No description available.")}
          </p>

          {book.price && (
            <p>
              <strong>Price:</strong> {book.price.amount} {book.price.currency}
            </p>
          )}

          {book.buyLink && (
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button"
            >
              Buy Book
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
