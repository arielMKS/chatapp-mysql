const express = require("express");
const session = require("express-session");
const app = express();
const socket = require("socket.io");
// const io = socket(app);
require("dotenv").config();

const routes = require("./routes/api");
const chatService = require("./services/chat.service");

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true
//   })
// );

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes for API
app.use(routes);

// Start the API server
let server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io = socket(server);

io.on("connection", socket => {
  console.log("Socket ID", socket.id);

  // Here we listen on a new namespace called "SEND_MESSAGE"
  socket.on("SEND_MESSAGE", function(data) {
    const { userid, roomid, message } = data;
    // console.log("SEND_MESSAGE===", data);

    chatService
      .postMessage(userid, roomid, message)
      .then(results => {
        // console.log("controller", results);
        return;
      })
      .catch(err => {
        // res.status(500).send(err);
        console.log("Error on post new message");
      });

    // this emits to the active user only
    // socket.emit("RECEIVE_MESSAGE", data);

    // send an event to everyone
    io.emit("RECEIVE_MESSAGE", data);

    // sent a message to everyone except for certain socket
    // socket.broadcast.emit("hi");

    socket.on("DISCONNECT", data => {
      console.log("DISCONNECTED", data);
    });
  });
});
