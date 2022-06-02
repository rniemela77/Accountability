const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();

  res.send(await posts.find({}).toArray());
});

// Add Post

// Delete Post

// Connect to the Post collection
async function loadPostsCollection() {
  const user = "rvniemela";
  const pw = "sloppyjoe";
  const str = `mongodb+srv://${user}:${pw}@accountability.kx8t8eq.mongodb.net/?retryWrites=true&w=majority`;
  const client = await mongodb.MongoClient.connect(str, {
    useNewUrlParser: true,
  });

  return client.db("accountability").collection("posts");
}

module.exports = router;
