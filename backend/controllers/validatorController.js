const db = require("../config/db");
const query = require("../config/query");
const querysStrings = require("../config/querysStrings");

const EMAIL_ERROR = "l'adresse email entrée non valide, veuillez choisir une autre!";
const PASSWORD_ERROR = "Votre mot de passe doit contenir 8 caractères au minimum, une majuscule et un caractere !"

module.exports = {
  email: (req, res, next) => {
    req.body.user = JSON.parse(req.body.user);
    let email = req.body.user.email;
    let email_regex = /([\w-\.]{5,50}@[\w\.]{2,}\.{1}[\w]+)/;
    if (email.match(email_regex)) {
      email = email.toLowerCase().trim();
      next();
    } else {
      res.status(200);
      res.json({ error: EMAIL_ERROR });
    }
  },
  /**
   * le mot de passe doit contenir entre 8 et 15 caracteres,
   * contien une majuscule, une minuscule et un symbole
   */
  password: (req, res, next) => {
    let mdp_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
    let mdp = req.body.user.password;
    if (mdp.length < 8) {
      res.status(200);
      res.json({
        error:
          PASSWORD_ERROR,
      });
    } else {
      if (!mdp.match(mdp_regex)) {
        res.status(400);
        res.json({ error: PASSWORD_ERROR });
      } else {
        next();
      }
    }
  },


  /**
   * check if pseudo existe before register a new user
   * @param {String} //pseudo
   * @param {Request} req
   * @param {Response} res
   */
  checkPseudo: (req, res) => {
    let pseudo = req.body.pseudo;
    db.query(querysStrings.findUserByPseudo, [pseudo]).then((user) => {
      if (user) {
        res.status(200);
        res.json({ error: "existe" });
      } else {
        res.status(200);
        res.json({ succes: "valide" });
      }
    });
  },
  checkEmail: async (req, res) => {
    let email = req.body.email;
    let conn = await db;
    query(conn, querysStrings.findUserByEmail, [email]).then((user) => {
      console.log(user)
      if (user.length > 0) {
        res.status(200);
        res.json({ error: EMAIL_ERROR });
      } else {
        res.status(200);
        res.json({ succes: "valide" });
      }
    });
  },

};
