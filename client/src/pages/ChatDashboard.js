import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

import "./ChatDashboard.css";

class ChatDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesInThisRoom: [],
      rooms: [],
      activeRoom: null,
      inputText: "",
      currentUserId: "",
      currentUserName: ""
    };

    // this.socket = io("http://localhost:3001");
    this.socket = io("localhost:3001");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      console.log("RECEIVE_MESSAGE", data);
      addMessage(data);
    });

    const addMessage = data => {
      console.log("add message firing", data);
      this.joinChatRoom(data.roomid);
    };

    this.componentDidMount = () => {
      this.loadChatRooms();

      // current user id and user name are passed in from Login
      this.setState({
        currentUserId: this.props.location.state.state.userid,
        currentUserName: this.props.location.state.state.email
      });
    };

    this.loadChatRooms = () => {
      API.getAllRoom()
        .then(res => {
          this.setState({ rooms: res.data });
        })
        .catch(err => {
          console.log("Error on client", err);
        });
    };

    this.joinChatRoom = roomid => {
      API.getMessageByRm(roomid)
        .then(res => {
          console.log("Chat Room RESULTS", res);
          this.setState({ messagesInThisRoom: res.data, activeRoom: roomid });
        })
        .catch(err => console.log("Error", err));

      // this.setState({ activeRoom: roomid });
    };

    this.handleChange = e => {
      const name = e.target.name;
      this.setState({
        [name]: e.target.value
      });
    };

    this.handleSubmit = e => {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        userid: this.state.currentUserId,
        roomid: this.state.activeRoom,
        message: this.state.inputText
      });
    };
  }

  render() {
    console.log("Dashboard STATE", this.state);
    // console.log("Chat dashboard props-----", this.props.location.state.state);

    return (
      <div className="container">
        <List>
          <h1>Welcome, {this.state.currentUserName}</h1>
          <span>Join a room:</span>

          {this.state.rooms.map(room => (
            <div key={room.roomid}>
              <button onClick={() => this.joinChatRoom(room.roomid)}>
                {room.name}
              </button>
            </div>
          ))}
        </List>

        <List>
          <ChatRoom
            key={this.state.activeRoom}
            messagesInThisRoom={this.state.messagesInThisRoom}
          />
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
    );
  }
}

export default ChatDashboard;
