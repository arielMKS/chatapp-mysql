import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import "./ChatDashboard.css";

let socket = io("localhost:3001");
// let socket = io("https://secret-badlands-68198.herokuapp.com/");

class ChatDashboard extends React.Component {
  state = {
    messages: [],
    messagesInThisRoom: [],
    rooms: [],
    activeRoom: null,
    inputText: "",
    currentUserId: "",
    currentUserName: ""
  };

  componentDidMount = () => {
    // console.log("Chat dashboard CDM firing");
    this.loadChatRooms(); // rename to something like init()

    // IMPORTANT!! socket.on always listens for event emitter from server and runs isolated from React's CDM
    socket.on("RECEIVE_MESSAGE", data => {
      // Ariel: this code calls the function to requery new messages but this is not efficient to do for every new message
      if (this.state.activeRoom) {
        this.requeryMessages(this.state.activeRoom);
      }
    });
  };

  loadChatRooms = () => {
    // console.log("load chat rooms firing");
    API.getAllRoom()
      .then(res => {
        this.setState({
          rooms: res.data,
          currentUserId: this.props.location.state.state.userid,
          currentUserName: this.props.location.state.state.email
        });
      })
      .catch(err => {
        console.log("Error on client", err);
      });
  };

  // function to fetch all message in active room
  requeryMessages = roomid => {
    API.getMessageByRm(roomid)
      .then(res => {
        this.setState({ messagesInThisRoom: res.data });
      })
      .catch(err => console.log("Error", err));
  };

  // function to set room active and fetch messages
  joinChatRoom = roomid => {
    this.setState(
      {
        activeRoom: roomid
      },
      () => this.requeryMessages(roomid)
    );
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputText) {
      socket.emit("SEND_MESSAGE", {
        userid: this.state.currentUserId,
        roomid: this.state.activeRoom,
        message: this.state.inputText
      });
      this.setState({ inputText: "" });
    }
  };

  render() {
    console.log("Chat Dashboard STATE", this.state);

    return (
      <div className="main">
        <div className="subheading">
          <h1>Chat App</h1>
          <span>Active room: {!this.state.activeRoom && "None"}</span>
          <h3>
            {this.state.messagesInThisRoom[0] &&
              this.state.messagesInThisRoom[0].name}
          </h3>
          <span>User: {this.state.currentUserName}</span>
        </div>

        <div className="chat-container">
          <div className="rooms">
            <List className="">
              {this.state.rooms.map(room => (
                <div key={room.roomid}>
                  <button onClick={() => this.joinChatRoom(room.roomid)}>
                    {room.name}
                  </button>
                </div>
              ))}
            </List>
          </div>
          <hr></hr>
          <div className="messages">
            <List>
              <ChatRoom
                key={this.state.activeRoom}
                messagesInThisRoom={this.state.messagesInThisRoom}
              />
            </List>
          </div>
        </div>

        <div className="inputBox">
          <List>
            {this.state.activeRoom && (
              <form onSubmit={this.handleSubmit}>
                <input
                  value={this.state.inputText}
                  placeholder="Enter your message"
                  name="inputText"
                  type="text"
                  onChange={this.handleChange}
                ></input>
                <button type="submit">Send Message</button>
              </form>
            )}
          </List>
        </div>
      </div>
    );
  }
}

export default ChatDashboard;
