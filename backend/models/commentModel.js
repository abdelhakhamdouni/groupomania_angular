class Comment {
  constructor(id, PostId, UserId, text) {
    this.id = id || null;
    this.PostId = PostId;
    this.UserId = UserId;
    this.text = text;
  }
}

module.exports = Comment;
