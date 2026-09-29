import { Link } from "react-router-dom";

function BookCard({ book }) {
  // console.log("Book data:", book);

  return (
    <div className="book-card">
      <Link to={`/books/${book.googleBooksId}`} className="book-card-link">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="book-cover" />
        ) : (
          <div className="book-cover-placeholder">No Cover</div>
        )}

        <div className="book-info">
          <h3>{book.title}</h3>

          <p>Author: {book.authors?.join(", ") || "Unknown"}</p>

          <p>Publisher: {book.publisher || "Unknown"}</p>

          <p>Language: {book.language || "Unknown"}</p>
        </div>
      </Link>

      {book.price && (
        <p>
          Price: {book.price.amount} {book.price.currency}
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
  );
}

export default BookCard;
