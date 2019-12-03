import React from "react";
import API from "../utils/API";
import { List } from "../components/List";

import io from "socket.io-client";
import Messages from "../components/Messages/Messages";
import "./ChatDashboard.css";
import Rooms from "../components/Rooms/Rooms";

// let socket = io("localhost:3001");
let socket = io("https://secret-badlands-68198.herokuapp.com/");

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
        console.log("Chat dashboard msg", res.data);
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
          <span>Active room:</span>{" "}
          {!this.state.messagesInThisRoom[0] ? (
            <h3>None</h3>
          ) : (
            <h3>
              {this.state.messagesInThisRoom[0] &&
                this.state.messagesInThisRoom[0].name}
            </h3>
          )}
          {", "}
          <span>
            User: <h3>{this.state.currentUserName}</h3>
          </span>
        </div>

        <div className="chat-container">
          <div className="rooms">
            <List>
              <Rooms
                socket={socket}
                rooms={this.state.rooms}
                joinChatRoom={this.joinChatRoom}
              />
            </List>
          </div>
          <hr></hr>
          <div className="messages">
            <List>
              <Messages
                // key={this.state.activeRoom}
                currentUserName={this.state.currentUserName}
                messagesInThisRoom={this.state.messagesInThisRoom || []}
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
