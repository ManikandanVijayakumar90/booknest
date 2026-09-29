const axios = require("axios");

// Search books using Google Books API
const searchBooks = async (req, res) => {
  try {
    const { q, lang = "all", page = 1 } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Please provide a search query",
      });
    }

    const maxResults = 20;
    const startIndex = (Number(page) - 1) * maxResults;

    const params = {
      q,
      startIndex,
      maxResults,
      key: process.env.GOOGLE_BOOKS_API_KEY,
    };

    if (lang !== "all") {
      params.langRestrict = lang;
    }

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      { params },
    );

    const items = response.data.items || [];

    const books = items.map((item) => {
      const info = item.volumeInfo || {};
      const sale = item.saleInfo || {};

      return {
        googleBooksId: item.id,
        title: info.title || "Untitled",
        authors: info.authors || [],
        publisher: info.publisher || "Unknown",
        publishedDate: info.publishedDate || "Unknown",
        description: info.description || "No description available.",
        pageCount: info.pageCount,
        categories: info.categories || [],
        language: info.language || "Unknown",
        isbn: info.industryIdentifiers?.[0]?.identifier || "",
        thumbnail:
          info.imageLinks?.thumbnail?.replace(/^http:/, "https:") || "",
        price: sale.listPrice || null,
        buyLink: sale.buyLink || "",
      };
    });

    res.status(200).json({
      totalItems: response.data.totalItems || 0,
      books,
    });
  } catch (error) {
    console.error("Search Books Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Unable to search books",
    });
  }
};

// Get a single book by Google Books ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`,
      {
        params: {
          key: process.env.GOOGLE_BOOKS_API_KEY,
        },
      },
    );

    const item = response.data;
    const info = item.volumeInfo || {};
    const sale = item.saleInfo || {};

    res.status(200).json({
      googleBooksId: item.id,
      title: info.title || "Untitled",
      authors: info.authors || [],
      publisher: info.publisher || "Unknown",
      publishedDate: info.publishedDate || "Unknown",
      description: info.description || "No description available.",
      pageCount: info.pageCount,
      categories: info.categories || [],
      language: info.language || "Unknown",
      isbn: info.industryIdentifiers?.[0]?.identifier || "",
      thumbnail: info.imageLinks?.thumbnail?.replace(/^http:/, "https:") || "",
      price: sale.listPrice || null,
      buyLink: sale.buyLink || "",
    });
  } catch (error) {
    console.error(
      "Get Book Details Error:",
      error.response?.data || error.message,
    );

    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(500).json({
      message: "Unable to fetch book details",
    });
  }
};

module.exports = { searchBooks, getBookById };
