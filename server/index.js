const express = require("express");
const bodyParser = require("body-parser"); // Parse the JSON when it comes in
const cors = require("cors");

// Initialize the app with express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");

// Any route that goes to this path will be directed to `posts`
app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  console.log("App started in production mode");

  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// On Heroku, use PORT. On localhost, use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
