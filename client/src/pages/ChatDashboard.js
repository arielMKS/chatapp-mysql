import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

class ChatDashboard extends React.Component {
  state = {
    rooms: [],
    activeRoom: null
  };

  socket = io("http://localhost:3001");

  componentDidMount() {
    this.loadAllMessages();
  }

  sendMessage = ev => {
    console.log("SOCKET", this.socket);
    // ev.preventDefault();
    this.socket.emit("SEND_MESSAGE", {
      author: "Author 1",
      message: "Message 1"
    });

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      console.log("RECEIVE_MESSAGE", data);
    });
    // this.setState({message: ''});
  };

  loadAllMessages = () => {
    API.getAllRoom()
      .then(res => {
        console.log("RESULTS", res);
        // BLOCK THIS FOR NOW WHILE FIXING ROUTES
        this.setState({ rooms: res.data });
      })
      .catch(err => {
        console.log("Error on client", err);
      });
  };

  joinRoom = roomid => {
    this.setState({ activeRoom: roomid });
  };

  render() {
    console.log("messagesInRoom STATE", this.state);

    return (
      <List>
        <h1>Join a chat room</h1>
        {this.state.rooms.map(room => (
          <div key={room.roomid}>
            {/* I CAN ALSO USE "ROUTING" TO LOAD <Chatroom/>  */}
            <button onClick={() => this.joinRoom(room.roomid)}>
              {room.name}
            </button>
          </div>
        ))}
        {this.state.activeRoom && (
          <ChatRoom
            key={this.state.activeRoom}
            activeRoom={this.state.activeRoom}
          />
        )}
        {/* <button onClick={this.sendMessage}>Send message</button> */}
      </List>
    );
  }
}

export default ChatDashboard;
