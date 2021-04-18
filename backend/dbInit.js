const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql = require("mysql");
require("dotenv").config();

// get config from .env
let user = process.env.user,
  password = process.env.password,
  dbname = process.env.dbname,
  host = process.env.host,
  dialect = process.env.dialect;

// connect to mysql
const connection = mysql.createConnection({ host, user, password });
// create databas
connection.connect((err) => {
  if (err) {
    console.log(err);
    return process.exit(0);
  } else {
    console.log("DATABASE: Connected to mysql");
    // create database
    connection.query(
      `CREATE DATABASE ${dbname} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      (err) => {
        if (err) {
          console.log(err);

          console.log(
            `something were wrong, uneable to create database ${dbname} please try again!`
          );
          return process.exit(0);
        } else {
          console.log("DATABASE: " + dbname + "created");
          // initialize sequilze
          const sequelize = new Sequelize(dbname, user, password, {
            dialect: dialect,
          });

          // connect sequilize to db
          sequelize.authenticate();

          const User = sequelize.define("user", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            firstName: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            lastName: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            roles: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: "ROLE_USER",
            },
            password: {
              type: DataTypes.STRING,
              allowNull: false,
            },
          });
          const Post = sequelize.define("post", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            title: {
              type: DataTypes.STRING,
              allowNull: false,
            },

            image: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            comments: {
              type: DataTypes.INTEGER,
              allowNull: true,
            },
            description: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            likes: {
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue: 0,
            },
            type: {
              type: DataTypes.STRING,
              allowNull: true,
            },
          });
          const Like = sequelize.define("like", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
          });
          const Comment = sequelize.define("comment", {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            content: {
              type: DataTypes.TEXT,
              allowNull: false,
            },
            CommentId: {
              type: DataTypes.INTEGER,
              allowNull: true,
            },
          });

          // create all relations
          User.hasMany(Post, { foreignKeyConstraint: true });
          Post.belongsTo(User, { foreignKeyConstraint: true });

          User.hasMany(Like, { foreignKeyConstraint: true });
          Like.belongsTo(User, { foreignKeyConstraint: true });

          Post.hasMany(Like, { foreignKeyConstraint: true });
          Like.belongsTo(Post, { foreignKeyConstraint: true });

          User.hasMany(Comment, { foreignKeyConstraint: true });
          Comment.belongsTo(User, { foreignKeyConstraint: true });

          Post.hasMany(Comment, { foreignKeyConstraint: true });
          Comment.belongsTo(Post, { foreignKeyConstraint: true });

          // sync all table to database
          sequelize.sync({ force: true }).then(() => {
            return process.exit(1);
          });
        }
      }
    );
  }
});
