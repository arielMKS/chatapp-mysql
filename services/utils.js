const mysql = require("mysql2");

// create the connection
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "chatdb",
//   password: "Password1",
//   multipleStatements: true // IMPORTANT!! SO SPROCS CAN PASS IN AND OUT PARAMETERS
// });
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
  multipleStatements: true // IMPORTANT!! SO SPROCS CAN PASS IN AND OUT PARAMETERS
});

module.exports = {
  // GET PASSWORD OF A PARTICULAR USER
  getPassword: function(email) {
    // let query_str = "CALL GetPassword(?, @OUTPUTPARAM); SELECT @OUTPUTPARAM";
    let query_str = "CALL GetPassword(?);";

    return con
      .promise()
      .query(query_str, [email])
      .then(([rows, fields]) => {
        return rows[0][0];
      })
      .catch(err => console.log("ERROR ariel", err));
  },

  // GET BY EMAIL
  getByEmail: function(email) {
    let query_str = "CALL GetByEmail(?, @OUTPUTPARAM); SELECT @OUTPUTPARAM";
    return con
      .promise()
      .query(query_str, [email])
      .then(([rows, fields]) => {
        return rows[1][0]["@OUTPUTPARAM"];
      })
      .catch(err => err);
  },

  //  POST
  post: function(fname, lname, email, password) {
    console.log("utils", fname, lname, email, password);
    let query_str =
      "CALL CreateUser(?,?,?,?, @OUTPUTPARAM); SELECT @OUTPUTPARAM"; //
    return con
      .promise()
      .query(query_str, [fname, lname, email, password])
      .then(([rows, fields]) => {
        console.log("utils post", rows[1][0]);
        return rows[1][0]["@OUTPUTPARAM"]; // return the new record id
      })
      .catch(err => err); // will run if any error in db
  },

  //  POST A MESSAGE
  postMessage: function(userid, roomid, message) {
    console.log("Utils data", userid, roomid, message);
    // **** TEMPORARILY BLOCKED THIS FOR NOW
    let query_str =
      "CALL InsertMessage(?,?,?, @OUTPUTPARAM); SELECT @OUTPUTPARAM";
    return con
      .promise()
      .query(query_str, [userid, roomid, message])
      .then(([rows, fields]) => {
        console.log("utils postMessage", rows[1][0]);
        return rows[1][0]["@OUTPUTPARAM"]; // return the new record id
      })
      .catch(err => err); // will run if any error in db
  },

  // GET ALL ------> done
  getAll: function() {
    // GetAllMessage
    let query_str = "CALL GetAllMessage()";
    return con
      .promise()
      .query(query_str)
      .then(([rows, fields]) => {
        return rows[0];
      })
      .catch(err => err);
  },

  // GET ALL CHAT ROOMS
  getAllRoom: function() {
    console.log("Utils.js get all chat rooms");
    let query_str = "CALL GetAllRoom()";
    return con
      .promise()
      .query(query_str)
      .then(([rows, fields]) => {
        return rows[0]; // return one record found, it's an object
      })
      .catch(err => err);
  },

  // GET BY ID
  getByRoomId: function(id) {
    // console.log("Utils.js get by room id", id);
    let query_str = "CALL GetMessageByRoom(?)";
    return con
      .promise()
      .query(query_str, [id])
      .then(([rows, fields]) => {
        return rows[0]; // return one record found, it's an object
      })
      .catch(err => err);
  },

  // DELETE BOOK
  del: function(id) {
    let query_str = "CALL DeleteBook(?)";
    return con
      .promise()
      .query(query_str, [id])
      .then(([rows, fields]) => {
        return rows;
      })
      .catch(err => err);
  },

  // UPDATE BOOK
  update: function(id, author, title, synopsis) {
    let query_str = "CALL UpdateBook(?,?,?,?)";
    return con
      .promise()
      .query(query_str, [id, author, title, synopsis])
      .then(([rows, fields]) => {
        return rows;
      })
      .catch(err => err);
  }
};
