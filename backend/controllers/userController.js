const bcrypt = require("bcrypt");
const db = require("../config/db");
const query = require("../config/query");
const querysStrings = require("../config/querysStrings");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

module.exports = {
  /**
   * find user by id
   * @param {Integer} id
   * @param {Request} req
   * @param {Response} res
   */
  getUserById: async (req, res) => {
    const conn = await db;
    query(conn, querysStrings.findUserById, [req.params.id])
      .then((user) => {
        console.log(user);
        user[0].avatar =
          req.protocol + "://" + req.get("host") + user[0].avatar;
        res.status(200);
        res.json(user[0]);
      })
      .catch((err) => console.log(err));
  },

  /**
   * signup the user
   * @param {String} email
   * @param {String} password
   * @param {String} filename //avatar of user
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */

  signup: async (req, res) => {
    const conn = await db;

    console.log('FILE: ', req.file)
    let user = req.body.user;
    let firstName = user.firstName;
    let lastName = user.lastName;
    let email = user.email;
    let password = user.password;
    let roles = "ROLE_USER";
    let avatar =
    req.file == undefined ?  null :
      req.file.filename !== undefined
        ? `/images/${req.file.filename}`
        : null;
    query(conn, querysStrings.createUser, [
      firstName,
      lastName,
      email,
      password,
      roles,
      avatar,
    ])
      .then(() => {
        res.status(201).json({message: "user add!"})
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ err });
      });
  },
  /**
   * singin the user
   * @param {String} email
   * @param {String} password
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  signin: async (req, res, next) => {
    let email = req.body.email.toLowerCase();
    const conn = await db;
    query(conn, querysStrings.findUser, [email])
      .then((user) => {
        if (user.length === 0) {
          res.status(200);
          res.json({ err: "impossible de trouver cet utilisateur !" });
        } else {
          console.log(user);
          bcrypt.compare(
            req.body.password,
            user[0].password,
            (err, resultat) => {
              console.log(resultat);
              if (!resultat) {
                res.status(200);
                res.json({ err: "impossible de trouver cet utilisateur !" });
              } else {
                req.body.email = user[0].email;
                req.body.id = user[0].id;
                req.body.roles = user[0].roles;
                req.body.firstName = user[0].firstName;
                req.body.lastName = user[0].lastName;
                req.body.avatar =
                  req.protocol + "://" + req.get("host") + user[0].avatar;
                next();
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(403);
        res.json({ err: "impossible de trouver cet utilisateur !" });
      });
  },

  /**
   * singin the user if token valid
   * @param {Request} req
   * @param {Response} res
   * @param { Function } next
   */
  singinWithToken: async (req, res, next) => {
    let email = req.body.email.toLowerCase();
    const conn = await db;
    query(conn, querysStrings.findUser, [email])
      .then((user) => {
        req.body.email = user[0].email;
        req.body.id = user[0].id;
        req.body.roles = user[0].roles;
        req.body.firstName = user[0].firstName;
        req.body.lastName = user[0].lastName;
        req.body.avatar =
          req.protocol + "://" + req.get("host") + user[0].avatar;
        next();
      })
      .catch((e) => {
        res.status(400);
        res.json({
          error: "pool.getConnection impossible a la base de donnée" + e,
        });
      });
  },

  /**
   * edit user data and avatar
   * @param {Object || NULL } user // lastName and firstName
   * @param {String || NULL } filename // new avatar file name
   * @param {String} lastName //last avatar file name
   * @param {Request} req
   * @param {Response} res
   */
  editUserData: async (req, res) => {
    const conn = await db;
    let user = JSON.parse(req.body.user);
    let lastImage = req.body.lastImage;
    lastImage = lastImage.replace(req.protocol + "://" + req.get("host"), "");
    let id = req.params.id;

    console.log("USER UPDATE: ", user);

    let firstName = user.firstName;
    let lastName = user.lastName;
    if (req.file) {
      let avatar = `/images/avatars/${req.file.filename}`;
      query(conn, querysStrings.UpdateUserInfoWithAvatar, [
        firstName,
        lastName,
        avatar,
        id,
      ])
        .then((user) => {
          if (user) {
            unlinkAsync(path.join("../backend/", lastImage)); //suprimer l'image puis poste du serveur
            res.status(201);
            res.json({ message: "user created with success !" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.json({ err });
        });
    } else {
      query(conn, querysStrings.UpdateUserInfo, [firstName, lastName, id])
        .then((user) => {
          if (user) {
            res.status(201);
            res.json({ message: " vos donnee on etes modifies" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.json({ err });
        });
    }
  },

  /**
   * delete user from bdd
   * @param {Integer} id // user id
   * @param {Request} req
   * @param {Response} res
   */

  delete: async (req, res) => {
    let id = req.params.id;
    const conn = await db;
    query(conn, querysStrings.findUserById, [id])
      .then((user) => {
        console.log(user)
        query(conn, querysStrings.getAllPostsByUserId, [user[0].id])
          .then((posts) => {
            posts.forEach((post) => {
              query(query.deletePostById, [post.id]).catch((err) =>
                console.log(err)
              );
            });
          })
          .catch((err) => console.log("103", err));
        query(conn, querysStrings.getAllCommentsByUserId, [user[0].id])
          .then((comments) => {
            comments.forEach((comment) => {
              query(query.deleteCommentsById, [comment.id]).catch((err) =>
                console.log(err)
              );
            });
          })
          .catch((err) => console.log("109", err));
        query(conn, querysStrings.getAllLikesByUserId, [user[0].id])
          .then((likes) => {
            likes.forEach((like) => {
              query(query.deleteLikeByUserId, [like.id]).catch((err) =>
                console.log(err)
              );
            });
          })
          .catch((err) => console.log("126", err));
        query(conn, querysStrings.deleteUser, [user[0].id])
          .then(() => {
            unlinkAsync(path.join("../backend/", user[0].avatar)); //suprimer l'image puis poste du serveur
            res.status(200);
            res.json({ message: "Utilisateur Supprimé avec succés" });
          })

          .catch((err) => console.log("123", err));
      })
      .catch((err) => res.status(500).json({ err: "aucun user trouvé!" }));
  },


  getAllUsers: async (req, res) => {
    let conn = await db;
    query(conn, querysStrings.findAllUsers).then((users) => {
      users.forEach((user) => {
        user.avatar = req.protocol + "://" + req.get("host") + user.avatar;
      });
      res.status(200);
      res.json({ users });
    });
  },
};
