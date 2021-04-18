class Post {
  constructor(
    id,
    title,
    image,
    text,
    UserId,
    likes,
    comments,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.text = text;
    this.UserId = UserId;
    this.likes = likes;
    this.comments = comments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Post;
