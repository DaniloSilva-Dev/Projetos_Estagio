import express from "express";

const app = express();
const PORT = 3001;

// Mock data generator
const generateMockPost = (index, subreddit = "javascript") => ({
  kind: "t3",
  data: {
    id: `${Math.random().toString(36).substr(2, 9)}`,
    title: `Mock Post #${index} - ${generateRandomTitle()}`,
    author: `user_${Math.floor(Math.random() * 1000)}`,
    subreddit: subreddit,
    score: Math.floor(Math.random() * 10000),
    num_comments: Math.floor(Math.random() * 500),
    created_utc: Math.floor(Date.now() / 1000) - Math.random() * 86400,
    url: `/r/javascript/comments/${Math.random().toString(36).substr(2, 9)}.json`,
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

const generateRandomComment = () => {
  const comments = [
    "Great point! I've been thinking about this too.",
    "This is exactly what I needed to hear.",
    "Has anyone else had success with this approach?",
    "Thanks for sharing this knowledge!",
    "I totally agree with this perspective.",
    "Can you elaborate on the second point?",
    "This changed how I approach the problem.",
    "Definitely bookmarking this for later.",
    "Interesting take on this. Never thought of it that way.",
    "For those interested, here's a related resource...",
    "I've been struggling with this exact issue!",
    "This deserves way more upvotes.",
    "Awesome explanation, thanks!",
    "Does this work with TypeScript as well?",
    "Just tried this and it works perfectly!",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
};

const generateMockComment = (index, depth = 0) => ({
  kind: "t1",
  data: {
    id: `${Math.random().toString(36).substr(2, 9)}`,
    author: `user_${Math.floor(Math.random() * 1000)}`,
    body: generateRandomComment(),
    score: Math.floor(Math.random() * 5000),
    depth: depth,
    created_utc: Math.floor(Date.now() / 1000) - Math.random() * 86400,
    replies: "",
  },
});

const buildCommentTree = (parentDepth = 0, maxDepth = 3) => {
  if (parentDepth >= maxDepth) return "";

  const replyCount = Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0;
  if (replyCount === 0) return "";

  const replies = Array.from({ length: replyCount }, (_, i) =>
    generateMockComment(i, parentDepth + 1),
  );

  return {
    kind: "Listing",
    data: {
      children: replies.map((reply) => ({
        ...reply,
        data: {
          ...reply.data,
          replies: buildCommentTree(parentDepth + 1, maxDepth),
        },
      })),
    },
  };
};

// Mock endpoint for subreddit data
app.get("/r/:subreddit.json", (req, res) => {
  const { subreddit } = req.params;
  const posts = Array.from({ length: 25 }, (_, i) =>
    generateMockPost(i + 1, subreddit),
  );

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

// Mock endpoint for post comments
app.get("/r/:subreddit/comments/:postId.json", (req, res) => {
  const { subreddit, postId } = req.params;
  const commentCount = 10 + Math.floor(Math.random() * 11); // 10-20 comments
  const comments = Array.from({ length: commentCount }, (_, i) =>
    generateMockComment(i, 0),
  );

  const commentsWithReplies = comments.map((comment) => ({
    ...comment,
    data: {
      ...comment.data,
      replies: buildCommentTree(1, 3),
    },
  }));

  res.json({
    kind: "Listing",
    data: {
      after: null,
      before: null,
      children: commentsWithReplies,
      modhash: "",
    },
  });
});

app.get("/", (req, res) => {
  res.json({
    hello: "world",
    routes: ["/r/:subreddit.json", "/r/:subreddit/comments/:postId.json"],
  });
});

app.listen(PORT, () => {
  console.log(`Mock Reddit API running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`  GET /r/:subreddit.json - Get posts from a subreddit`);
  console.log(
    `  GET /r/:subreddit/comments/:postId.json - Get comments for a post`,
  );
});
