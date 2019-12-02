import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import "./ChatDashboard.css";

let socket = io("localhost:3001");

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
      console.log("RECEIVE_MESSAGE", data);
      // this.addMessage(data);

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

  requeryMessages = roomid => {
    // console.log("Requerying messages");
    API.getMessageByRm(roomid)
      .then(res => {
        this.setState({ messagesInThisRoom: res.data });
      })
      .catch(err => console.log("Error", err));
  };

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
    // console.log("Chat dashboard props-----", this.props.location.state.state);

    return (
      <div className="main">
        <div className="subheading">
          <h1>Chat App</h1>
          <span>active room: </span>
          <h3>
            {this.state.messagesInThisRoom[0] &&
              this.state.messagesInThisRoom[0].name}
          </h3>
          <h4>User: {this.state.currentUserName}</h4>
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
