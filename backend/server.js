const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookNest API" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is runnion on ${PORT}`);
  });
};

startServer();
