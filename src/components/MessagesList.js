import React, { Component } from "react";
import Message from "./Message";

class MessagesList extends Component {
  render() {
    return (
      <div>
        {this.props.seedMessages.map((message, i) => (
          <div key={i}>
            <Message
              message={message}
              selectMessages={this.props.selectMessages}
              setStarred={this.props.setStarred}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default MessagesList;
