import axios from "axios";

export default {
  // Gets all messages in a particualar room
  getAllRoom: function() {
    return axios.get("/api/chat/rooms");
  },
  // Login user
  login: function(userData) {
    return axios.post("/api/chat/login", userData);
  },
  // Gets all message
  getAllMessage: function() {
    return axios.get("/api/chat");
  },
  // Gets all messages in a particualar room
  getMessageByRm: function(id) {
    return axios.get("/api/chat/" + id);
  },
  // Save new user data to the database
  saveUser: function(userData) {
    return axios.post("/api/chat", userData);
  },
  // Save new message to the database
  postMessage: function(userData) {
    console.log("user data", userData);
    return axios.post("/api/chat/message", userData);
  },

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  updateBook: function(bookData) {
    return axios.put("/api/books", bookData);
  }
};
