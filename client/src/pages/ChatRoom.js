import React from "react";
import API from "../utils/API";

class ChatRoom extends React.Component {
  state = {
    messagesInThisRoom: []
  };

  componentDidMount = () => {
    // load all message in active room
  };

  renderMessage = () => {
    return this.props.messagesInThisRoom.map((msg, idx) => {
      return (
        <div key={idx}>
          {msg.email}...
          {msg.message}
        </div>
      );
    });
  };

  render() {
    console.log("CHAT ROOM STATE", this.state);
    return (
      <div>
        <h1>
          Active Room:
          {this.props.messagesInThisRoom[0] &&
            this.props.messagesInThisRoom[0].name}
        </h1>
        {this.renderMessage()}
      </div>
    );
  }
}

export default ChatRoom;
