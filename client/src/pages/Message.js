import React from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

class Message extends React.Component {
  state = {
    messagesInRoom: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadAllMessages();
  }

  loadAllMessages = () => {
    API.getMessageByRm(2)
      .then(res => {
        console.log("RESULTS", res);
        // BLOCK THIS FOR NOW WHILE FIXING ROUTES
        // this.setState({ messagesInRoom: res.data, title: "", author: "", synopsis: "" });
      })
      .catch(err => {
        console.log("Error on client", err);
      });
  };

  render() {
    console.log("messagesInRoom STATE", this.state);

    if (this.state.messagesInRoom.length > 0) {
      return (
        <List>
          {this.state.messagesInRoom.map(book => (
            <ListItem key={book.bookid}>
              <div>
                <span style={{ color: "blue" }}>{book.title}</span>{" "}
                <button
                  onClick={() =>
                    this.props.history.push("/book/" + book.bookid)
                  }
                >
                  Book Details
                </button>
              </div>
            </ListItem>
          ))}
          <button onClick={() => this.props.history.push("/addbook")}>
            Add Book
          </button>
        </List>
      );
    } else {
      return (
        <List>
          <h1>Uh oh, no boooks found in database...</h1>
          <button onClick={() => this.props.history.push("/addbook")}>
            Add Book
          </button>
        </List>
      );
    }
  }
}

export default Message;
