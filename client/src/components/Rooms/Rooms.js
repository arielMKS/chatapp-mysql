import React from "react";

import "./Rooms.css";

class Rooms extends React.Component {
  render() {
    return (
      <div className="Rooms">
        {this.props &&
          this.props.rooms &&
          this.props.rooms.map(room => (
            <div key={room.roomid}>
              <button onClick={() => this.props.joinChatRoom(room.roomid)}>
                {room.name}
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default Rooms;
