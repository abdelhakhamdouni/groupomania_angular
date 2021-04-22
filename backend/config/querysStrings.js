module.exports = {
    //strings for user handler querys
    createUser: "INSERT INTO users (firstName, lastName, email, password,roles, avatar,createdAt) VALUE(?,?,?,?,?,?,now())",
    findUser: "SELECT * FROM users WHERE email = ?",
    findAllUsers: "SELECT * FROM users",
    findUserByPseudo : "SELET * FROM users WHERE pseudo = ?",
    findUserById: "SELECT * FROM users WHERE id = ?",
    findUserByEmail: "SELECT * FROM users WHERE email = ?", 
    deleteUser: "DELETE FROM users WHERE id = ?",
    UpdateUserInfoWithAvatar: "UPDATE users SET firstName = ?, lastName = ?, avatar= ?  WHERE id = ?",
    UpdateUserInfo: "UPDATE users SET firstName = ?, lastName = ? WHERE id = ?",
    
    //strings for post querys
    createPost: "INSERT INTO posts(title, image, description, type, UserId, createdAt,updatedAt,userPseudo) VALUE(?,?,?,?,?,now(),now(),?)",
    getPosts : `SELECT posts.*, users.avatar FROM posts,users WHERE posts.UserId = users.id ORDER BY posts.id DESC`,
    getLastsPostsByUserId : "SELECT id, image, description FROM posts ORDER BY createdAt DESC LIMIT 5",
    getAllPostsWithUserId: "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND users.id = ?",
    getCountAllPostsByUserId : "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND users.id = ?",
    getPostById : "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND posts.id = ?",
    getPostByIdForLocal : "SELECT * from posts WHERE  posts.id = ?",
    updatePostLikes: "UPDATE posts SET likes = ?,updatedAt = now() WHERE id = ?",
    updatePostComments : "UPDATE posts SET comments = ?,updatedAt = now() WHERE id = ?",
    deletePostById: "DELETE FROM posts WHERE id = ?",

    //strigns for comments querys
    createComment: "INSERT INTO comments(content, createdAt,updatedAt, UserId, PostId, CommentId) VALUE(?,now(),now(),?,?,?)",
    deleteComment: "DELETE FROM comments WHERE UserId = ? OR PostId = ?",
    getCommentById : "SELECT * FROM comments WHERE id = ?",
    getCommentsById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    getCommentsByPostId : "SELECT comments.*, users.avatar, users.id, users.firstName, users.lastName FROM comments, users WHERE comments.PostId = ? AND users.id = comments.UserId ORDER BY CommentId",
    getAllCommentsByUserId: "SELECT * FROM comments WHERE UserId = ?",
    getCommentsById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    addIdtoComment: "UPDATE comments SET CommentId = ? WHERE id = ?",
    deleteCommentsByPostId: "DELETE FROM comments WHERE PostId = ?",
    deleteCommentsById: "DELETE FROM comments WHERE id = ?",

    //strigns for likes querys
    createLike: "INSERT INTO likes(createdAt,updatedAt, UserId, PostId) VALUE(now(),now(),?,?)",
    deleteLike: "DELETE FROM likes WHERE UserId = ? AND PostId = ?",
    deleteLikeById: "DELETE FROM likes WHERE UserId = ? AND PostId = ?",
    getLikesByPostId : "SELECT * FROM likes WHERE PostId = ?",
    getAllLikesByPostId: "SELECT * FROM likes WHERE PostId = ?",
    getAllLikesByUserId: "SELECT * FROM likes WHERE UserId = ?",
    deleteLikeByUserId: "DELETE FROM likes WHERE UserId = ?",
}
