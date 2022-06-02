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

// On Heroku, use PORT. On localhost, use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
