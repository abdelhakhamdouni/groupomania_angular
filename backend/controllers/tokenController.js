const jwt = require("jsonwebtoken");
const secretString = process.env.SECRET_STRING;

module.exports = {
  send: (req, res) => {
    jwt.sign(
      {
        email: req.body.email,
        userId: req.body.id,
      },
      secretString,
      (err, token) => {
        if (err) {
          console.log(err)
          res.status(400);
          res.json({
            error: "erreur lors de la génération du token !",
          });
        }
        else{
          res.status(200);
          res.json({
            token,
            user: {
              id: req.body.id,
              roles: req.body.roles,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              avatar: req.body.avatar,
            },
          });
        }
      }
    );
  },

  verify: (req, res, next) => {
    let token =
      req.headers.authorization.split(" ")[1] ||
      req.body.headers.authorization.split(" ")[1];
    jwt.verify(token, secretString, (err, decoded) => {
      if (!err) {
        (req.body.userId = decoded.userId), (req.body.email = decoded.email);
        next();
      } else {
        console.log(err);
        res.status(401);
        res.json({
          error:
            "depuis token verify Vous n'êtes pas authoriser à accéder à cette page !",
        });
      }
    });
  },
  verifyAndSend: (req, res) => {
    let token = req.body.token;
    jwt.verify(token, secretString, (err, decoded) => {
      if (!err) {
        res.status(200);
        res.json({ message: "login width token" });
      } else {
        res.status(401);
        res.json({
          error: "Vous n'êtes pas authoriser à accéder à cette page !",
        });
      }
    });
  },
};
