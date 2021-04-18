const express = require("express");
const hashPassword = require("../utils/hashPassword");
const tokenController = require("../controllers/tokenController");
const userController = require("../controllers/userController");
const validateController = require("../controllers/validatorController");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("../utils/multerAvatar");

router.get(
  "/",
  tokenController.verify,
  userController.singinWithToken,
  tokenController.send
);
router.get("/users", tokenController.verify, userController.getAllUsers);
router.get("/:id", tokenController.verify, userController.getUserById);
router.post("/login", userController.signin, tokenController.send);
router.post(
  "/signup",
  multer,
  validateController.email,
  validateController.password,
  hashPassword,
  userController.signup
);
router.delete(
  "/:id",
  [body("email").isEmail().normalizeEmail(), body("password").trim().escape()],
  tokenController.verify,
  userController.delete
);
router.put(
  "/:id",
  tokenController.verify,
  multer,
  userController.editUserData,
  tokenController.send
);

router.post(
  "/user/check/pseudo",
  [body("pseudo").trim().escape()],
  validateController.checkPseudo
);
router.post(
  "/user/check/email",
  [body("email").trim().escape()],
  validateController.checkEmail
);

module.exports = router;
