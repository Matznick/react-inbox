import React, { Component } from "react";
import Message from "./Message";

class MessagesList extends Component {
  render() {
    return (
      <div>
        {this.props.seedMessages.map((message, i) => (
          <div>
            <Message key={i} message={message} />
          </div>
        ))}
      </div>
    );
  }
}
export default MessagesList;
