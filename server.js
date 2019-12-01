const express = require("express");
const session = require("express-session");
const app = express();
const socket = require("socket.io");
// const io = socket(app);
const routes = require("./routes/api");
const chatService = require("./services/chat.service");

const PORT = process.env.PORT || 3001;

// io.on("connection", socket => {
//   console.log("Test socket", socket.id);
// });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this will give me access to an object via req.session I can attach "isLoggedIn" property that looks like this...
// Session { cookie:{...}, isLoggedIn:true }
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

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
  //Here we listen on a new namespace called "SEND_MESSAGE"
  socket.on("SEND_MESSAGE", function(data) {
    const { userid, roomid, message } = data;
    console.log("SEND_MESSAGE===", data);

    chatService
      .postMessage(userid, roomid, message)
      .then(results => {
        console.log("controller 1", results);
        return;
      })
      .catch(err => {
        // res.status(500).send(err);
      });

    // this emits to the active user only
    // good: The open browser gets updated and other rooms are not affected at all
    // bad: The current browser is the only one updated not the other tabs
    //    ... also, console log appears only in that browser
    // socket.emit("RECEIVE_MESSAGE", data);

    // this emits to all connected users
    // good: All browsers are correctly updated!
    // bad: The other rooms get changed
    io.emit("RECEIVE_MESSAGE", data);
  });
});
