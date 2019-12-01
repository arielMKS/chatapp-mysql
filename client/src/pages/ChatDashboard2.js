import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

class ChatDashboard extends React.Component {
  state = {
    messagesInThisRoom: [],
    rooms: [],
    activeRoom: null,
    inputText: "",
    currentUserId: "",
    currentUserName: ""
  };

  socket = io("http://localhost:3001");

  componentDidMount() {
    this.loadChatRooms();

    // current user id and user name are passed in from Login
    this.setState({
      currentUserId: this.props.location.state.state.userid,
      currentUserName: this.props.location.state.state.email
    });
  }

  loadChatRooms = () => {
    API.getAllRoom()
      .then(res => {
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log("Error on client", err);
      });
  };

  joinChatRoom = roomid => {
    API.getMessageByRm(roomid)
      .then(res => {
        console.log("Chat Room RESULTS", res);
        this.setState({ messagesInThisRoom: res.data });
      })
      .catch(err => console.log("Error", err));

    this.setState({ activeRoom: roomid });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  addMessage(data) {
    console.log("from add message", data);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.socket.emit("SEND_MESSAGE", {
      userid: this.state.currentUserId,
      roomid: this.state.activeRoom,
      message: this.state.inputText
    });

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      console.log("RECEIVE_MESSAGE", data);
      // I NEED TO DO SET STATE HERE
      // I CANT DO GRAB THE STATE HERE
      // const newMessage = {};
      //let temp = this.state.messagesInThisRoom;
      // this.addMessage(data);
    });
  };

  render() {
    console.log("Dashboard STATE", this.state);
    // console.log("Chat dashboard props-----", this.props.location.state.state);

    return (
      <List>
        <h1>Join a chat room: {this.state.currentUserName}</h1>
        {this.state.rooms.map(room => (
          <div key={room.roomid}>
            <button onClick={() => this.joinChatRoom(room.roomid)}>
              {room.name}
            </button>
          </div>
        ))}

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
    );
  }
}

export default ChatDashboard;
