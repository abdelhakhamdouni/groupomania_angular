const connection = require("./connectDB");
const config = require("./dbConfig");

/**
 * Promise
 * @param {Connection} conn instance off bdd connection
 * @param {Query} q querry string
 * @param {Parms} params params for query
 */

module.exports = connection(config);
