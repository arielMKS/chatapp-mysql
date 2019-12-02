import React from "react";

import "./ChatRoom.css";

class ChatRoom extends React.Component {
  renderMessage = () => {
    return this.props.messagesInThisRoom.map((msg, idx) => {
      return (
        <div className="container" key={idx}>
          <span className="username">{msg.email}:</span>
          <span className="message">{msg.message}</span>
        </div>
      );
    });
  };

  render() {
    // console.log("CHAT ROOM STATE", this.state);
    return (
      <div>{this.props.messagesInThisRoom[0] && this.renderMessage()}</div>
    );
  }
}

export default ChatRoom;
