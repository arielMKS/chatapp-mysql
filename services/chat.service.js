const mysql = require("mysql2");
const UTILS = require("./utils");

// POST LOGIN
const login = async (email, password) => {
  try {
    //  1. CHECK DB IF USER EMAIL AND HASHED PASSWORD EXISTS
    const str = await UTILS.getByEmail(email);
    console.log("service login", str);

    if (str && str.trim().length > 0) {
      // LATER: RUN BCRYPT.COMPARE() TO COMPARE HASHED PASSWORD FROM DB BEFORE CREATING A USER
      // NOW COMPARE IF PASSWORD FROM DB MATCHES PASSWORD PASSED IN
      const hashedPassword = await UTILS.getPassword(email);
      if (password === hashedPassword.password) {
        const userInfo = {
          userid: hashedPassword.userid,
          email: hashedPassword.email
        };
        // console.log("service hashedPassword", userInfo);
        return userInfo;
      } else {
        return "";
      }
    } else {
      return ""; // return null because email already exists in db
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// POST
const post = async (fname = "", lname = "", email, password) => {
  try {
    // first check if email exists in db
    const str = await UTILS.getByEmail(email); // get email if it exists in db
    if (!str.trim().length) {
      // LATER: RUN BCRYPT.COMPARE() TO COMPARE HASHED PASSWORD FROM DB BEFORE CREATING A USER
      const id = await UTILS.post(fname, lname, email, password);
      const user = { userId: id, email };
      return user;
    } else {
      // return null because email already exists in db
      return null;
    }
  } catch (err) {
    return err.message;
  }
};

// POST A MESSAGE
const postMessage = async (userid, roomid, message) => {
  try {
    // LATER: RUN BCRYPT.COMPARE() TO COMPARE HASHED PASSWORD FROM DB BEFORE CREATING A USER
    const id = await UTILS.postMessage(userid, roomid, message);
    return id;
  } catch (err) {
    return err.message;
  }
};

// GET ALL
const getAll = async () => {
  try {
    const results = await UTILS.getAll();
    return results;
  } catch (err) {
    // Ariel Note: this catches if error occurs in database and passes err.message to controller .then()
    return err.message;
  }
};

// GET ALL ROOMS
const getAllRoom = async () => {
  try {
    const results = await UTILS.getAllRoom();
    // console.log("service get all room", results);
    return results;
  } catch (err) {
    // console.log("service get all room err");
    return err.message;
  }
};

// GET BY ROOM ID
const getByRoomId = async id => {
  try {
    const results = await UTILS.getByRoomId(id);
    return results;
  } catch (err) {
    return err.message;
  }
};

// DELETE
const del = async id => {
  try {
    const results = await UTILS.del(id);
    return results;
  } catch (err) {
    return err.message;
  }
};

// UPDATE
const update = async (id, author, title, synopsis) => {
  try {
    const results = await UTILS.update(id, author, title, synopsis);
    return results;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  login,
  getAll,
  getAllRoom,
  getByRoomId,
  post,
  postMessage,
  update,
  del
};
