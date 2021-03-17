import React, { Component } from "react";
import Message from "./Message";

class MessagesList extends Component {
  state = { allMessagesSelected: false };

  render() {
    return (
      <div>
        {this.props.seedMessages.map((message) => (
          <div>
            <Message
              message={message}
              allMessagesSelected={this.props.allMessagesSelected}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default MessagesList;
