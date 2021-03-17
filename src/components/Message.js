import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.message.id,
      subject: this.props.message.subject,
      read: this.props.message.read,
      starred: this.props.message.starred,
      labels: this.props.message.labels,
      selectedByClick: false,
      selectedByToolbar: this.props.allMessagesSelected,
    };
  }

  // distiguish between selected/not selected and read/unread
  setMessageStyle = () => {
    console.log(
      "from message.js: selectedbyclick :",
      this.state.selectedByClick
    );
    console.log(
      "from message.js: selectedbytoolbar :",
      this.state.selectedByToolbar
    );
    if (
      (this.state.selectedByClick && this.state.read) ||
      (this.props.allMessagesSelected && this.state.read)
    ) {
      return "row message selected read";
    } else if (
      (this.state.selectedByClick && !this.state.read) ||
      (this.props.allMessagesSelected && !this.state.read)
    ) {
      return "row message selected unread";
    }
    if (this.state.read) {
      return "row message read";
    } else {
      return "row message unread";
    }
  };

  toggleCheckbox = () =>
    this.setState({ selectedByClick: !this.state.selectedByClick });

  onClickCheckbox = () => {
    this.toggleCheckbox();
    console.log("selectedByClick: ", this.state.selectedByClick);
    this.setMessageStyle();
  };

  onClickStar = () => this.setState({ starred: !this.state.starred });

  render() {
    return (
      <div className="message-container">
        <div className={this.setMessageStyle()}>
          <div className="col-xs-3">
            <div className="row">
              <div className="col-xs-1">
                <input
                  onClick={this.onClickCheckbox}
                  type="checkbox"
                  checked={
                    this.state.selectedByToolbar || this.state.selectedByClick
                  }
                />
              </div>
              <div className="col-xs-1">
                <i
                  onClick={this.onClickStar}
                  className={
                    this.state.starred === false
                      ? "star fa fa-star-o"
                      : "star fa fa-star"
                  }
                ></i>
              </div>
              <div className="col-xs-1">
                {this.state.labels.map((label) => (
                  <div className="label"> {label} </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xs-9">
            <a href="#">{this.state.subject}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
