import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import BookSearch from "./components/BookSearch";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookSearch />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
