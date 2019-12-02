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
      <div>
        {this.props.messagesInThisRoom[0] ? (
          this.renderMessage()
        ) : (
          <span
            style={{
              // color: "red",
              display: "flex",
              // border: "1px solid red",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Please click on a room...
          </span>
        )}
      </div>
    );
  }
}

export default ChatRoom;
