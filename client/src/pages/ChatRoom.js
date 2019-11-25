import React from "react";
import API from "../utils/API";

class ChatRoom extends React.Component {
  state = {
    messagesInThisRoom: []
  };
  componentDidMount = () => {
    // make api call by active room
    API.getMessageByRm(this.props.activeRoom)
      .then(res => {
        console.log("Chat Room RESULTS", res);
        this.setState({ messagesInThisRoom: res.data });
      })
      .catch(err => console.log("Error", err));
  };

  renderMessage = () => {
    return this.state.messagesInThisRoom.map((msg, idx) => {
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
          Active Chat:{" "}
          {this.state.messagesInThisRoom[0] &&
            this.state.messagesInThisRoom[0].name}
        </h1>
        {this.renderMessage()}
      </div>
    );
  }
}

export default ChatRoom;
