const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const likeRouter = require("./routes/likes");
const commentRouter = require("./routes/comment");

require("./config/connectDB");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
