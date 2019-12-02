const router = require("express").Router();

const chatService = require("../services/chat.service");

module.exports = {
  // POST LOGIN
  login: function(req, res) {
    const { email, password } = req.body;
    console.log("controller login hit", req.session);

    chatService
      .login(email, password)
      .then(results => {
        if (!results) {
          res.status(500).json({ success: false });
        } else {
          // req.session.isLoggedIn = true; // IMPORTANT!! The user is logged in
          // req.session.user = results;
          res.status(200).json({ isLoggedIn: true, user: results }); // return userid, user email
        }
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  },

  // GET ALL
  getAll: function(req, res) {
    chatService
      .getAll()
      .then(results => {
        console.log("controeller get all", results);
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  // GET ALL ROOMS
  getAllRoom: function(req, res) {
    console.log("Controller get all room", req.session);
    // console.log("controller get all rooms");
    // const { id } = req.params;
    chatService
      .getAllRoom()
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // GET BY ROOM ID
  getByRoomId: function(req, res) {
    const { id } = req.params;
    chatService
      .getByRoomId(id)
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // POST A NEW USER
  post: function(req, res) {
    const { fname, lname, email, password } = req.body;
    chatService
      .post(fname, lname, email, password)
      .then(results => {
        console.log("controller", results);
        if (results instanceof Error) {
          res.status(500).json(results);
        }
        // CHECK LENGTH OF "RESULTS" IF USER WAS CREATED OR NOT
        if (results) {
          // res.status(201).json(results); // return new record id if successful
          res.status(201).json(results); // return success true
        } else {
          res.status(500).json({ success: false });
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // POST A MESSAGE
  postMessage: function(req, res) {
    const { userid, roomid, message } = req.body;
    console.log("controller data", userid, roomid, message);
    chatService
      .postMessage(userid, roomid, message)
      .then(results => {
        console.log("controller 11", results);
        if (results instanceof Error) {
          res.status(500).json(results);
        }
        // CHECK LENGTH OF "RESULTS" IF USER WAS CREATED OR NOT
        if (results) {
          // res.status(201).json(results); // return new record id if successful
          res.status(201).json(results); // return success true
        } else {
          res.status(500).json({ success: false });
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // DELETE
  del: function(req, res) {
    const { id } = req.params;
    chatService
      .del(id)
      .then(results => {
        res.status(201).json(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // UPDATE
  update: function(req, res) {
    const { bookid, author, title, synopsis } = req.body;
    chatService
      .update(bookid, author, title, synopsis)
      .then(results => {
        res.status(201).json(results);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
