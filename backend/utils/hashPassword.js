const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.saltRounds);

/**
 * hash the password
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  bcrypt
    .hash(req.body.user.password, saltRounds)
    .then((hash) => {
      req.body.user.password = hash;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(501);
      res.json({
        message: "problem de hash password",
      });
    });
};
