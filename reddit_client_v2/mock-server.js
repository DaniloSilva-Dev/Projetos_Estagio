import express from "express";

const app = express();
const PORT = 3001;

// Mock data generator
const generateMockPost = (index) => ({
  kind: "t3",
  data: {
    id: `${Math.random().toString(36).substr(2, 9)}`,
    title: `Mock Post #${index} - ${generateRandomTitle()}`,
    author: `user_${Math.floor(Math.random() * 1000)}`,
    subreddit: "javascript",
    score: Math.floor(Math.random() * 10000),
    num_comments: Math.floor(Math.random() * 500),
    created_utc: Math.floor(Date.now() / 1000) - Math.random() * 86400,
    url: `https://reddit.com/r/javascript/comments/${Math.random().toString(36).substr(2, 9)}`,
    thumbnail: "self",
    selftext: generateRandomText(),
  },
});

const generateRandomTitle = () => {
  const titles = [
    "Tips for learning React",
    "JavaScript async/await best practices",
    "Why I switched to TypeScript",
    "Building a REST API with Node.js",
    "CSS tricks you didn't know",
    "Web performance optimization",
    "Understanding the event loop",
    "Functional programming in JS",
    "How to debug efficiently",
    "New ES2024 features explained",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const generateRandomText = () => {
  const texts = [
    "Check out my latest project...",
    "Here's a solution to a common problem...",
    "Wanted to share some knowledge I gained...",
    "Looking for feedback on this...",
    "Just discovered this amazing trick...",
    "Tutorial: How to do this properly...",
    "Share your thoughts in the comments...",
    "This changed my development workflow...",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

// Mock endpoint for subreddit data
app.get("/r/:subreddit.json", (req, res) => {
  const { subreddit } = req.params;
  const posts = Array.from({ length: 25 }, (_, i) => generateMockPost(i + 1));

  res.json({
    kind: "Listing",
    data: {
      after: null,
      before: null,
      children: posts,
      modhash: "",
    },
  });
});

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Mock Reddit API running on http://localhost:${PORT}`);
});
