const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { Op } = require("sequelize");
const db = require("../config/db");
const query = require("../config/query");
const querysStrings = require("../config/querysStrings");
const { getPostById } = require("../config/querysStrings");

module.exports = {
  //get a comment by id
  getAllCommentsById: async (req, res) => {
    let conn = await db;
    let _comments = new Array();
    query(conn, querysStrings.getCommentsByPostId, [req.params.id])
      .then((comments) => {
          console.log(comments)
          comments.forEach(comment => {
            comment.avatar = req.protocol + "://" + req.get("host") + comment.avatar
              if (comments.indexOf(comment) === comments.length - 1) {
                  res.status(200).json(comments);
              }
          })
      })
      .catch((err) => {
          console.log(err)
        res.status(500);
        res.json({ err });
      });
  },

  //Add comment
  addComment: async (req, res) => {
    let conn = await db;
    query(conn, querysStrings.createComment, [
      req.body.content,
      req.body.userId,
      req.body.postId,
      req.body.commentId || 0,
    ])
      .then((results) => {
        query(conn, querysStrings.getCommentById, [results.insertId]).then(
          (comment) => {
            if (comment[0].CommentId === 0) {
              query(conn, querysStrings.addIdtoComment, [
                comment[0].id,
                comment[0].id,
              ]);
            }
            query(conn, querysStrings.getPostByIdForLocal, [req.body.postId]).then(
              (post) => {
                  console.log(post)
                query(conn, querysStrings.updatePostComments, [
                  post[0].comments + 1,
                  post[0].id,
                ]);
              }
            );
            res.status(201);
            res.json({ message: "comment add with success" });
          }
        );
      })
      .catch((err) => {
        res.status(400);
        res.json({ err });
      });
  },

  //delete comment
  deleteComment: async (req, res) => {
    let id = req.params.id;
    let conn = await db;
    console.log(id)
    query(conn, querysStrings.getCommentsById, [id, id])
      .then((comments) => {
        console.log(comments)
        let commId = comments[0].id;
        let postId = comments[0].PostId;
        let commCount = comments.length;
        comments.forEach((comment) => {
          query(conn, querysStrings.deleteCommentsById, [
            comment.id,
            comment.id,
          ]);
        });
        query(conn, querysStrings.getPostById, [postId]).then((post) => {
          console.log(post);
          query(conn, querysStrings.updatePostComments, [
            post[0].comments - commCount,
            post[0].id,
          ]);
        });
      })
      .then(() => {
        res.status(200);
        res.json({ message: "comments Supprimé avec succés" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ err: "impossible de supprimer ce comment" });
      });
  },
};
