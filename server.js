const express = require("express");
const session = require("express-session");
const app = express();
const socket = require("socket.io");
// const io = socket(app);
const routes = require("./routes/api");
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

  socket.on("SEND_MESSAGE", function(data) {
    console.log("Data test", data);
    io.emit("RECEIVE_MESSAGE", data);
  });
});
