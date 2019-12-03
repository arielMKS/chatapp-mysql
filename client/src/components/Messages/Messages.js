import React from "react";

import "./Messages.css";

class Messages extends React.Component {
  renderMessage = () => {
    return this.props.messagesInThisRoom.map((msg, idx) => {
      // add background color to highlight the user
      if (msg.email != this.props.currentUserName) {
        return (
          <div className="message-container" key={msg.messageid}>
            <span className="username">{msg.email}:</span>
            <span className="message">{msg.message}</span>
          </div>
        );
      } else {
        return (
          <div className="message-container" key={idx}>
            <span
              className="username"
              style={{
                backgroundColor: "rgb(73, 205, 209)",
                marginLeft: "5px"
              }}
            >
              {msg.email}:
            </span>
            <span className="message">{msg.message}</span>
          </div>
        );
      }
    });
  };

  render() {
    // console.log("CHAT ROOM PROPS", this.props);
    return (
      <div className="Messages">
        {this.props.messagesInThisRoom[0] ? (
          this.renderMessage()
        ) : (
          <span>Please click on an active room...</span>
        )}
      </div>
    );
  }
}

export default Messages;
