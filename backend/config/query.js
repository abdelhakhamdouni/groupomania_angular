/**
 * Promise
 * @param {Connection} conn instance off bdd connection
 * @param {Query} q querry string
 * @param {Parms} params params for query
 */
module.exports = async (conn, q, params) =>
  new Promise((resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };
    conn.query(q, params, handler);
  });
