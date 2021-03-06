import React, { Component } from "react";

class Message extends Component {
  state = {
    id: this.props.message.id,
    subject: this.props.message.subject,
    read: this.props.message.read,
    starred: this.props.message.starred,
    labels: this.props.message.labels,
    selected: this.props.message.selected,
  };

  // distiguish between selected/not selected and read/unread
  setMessageStyle = () => {
    if (this.props.message.selected && this.props.message.read) {
      return "row message selected read";
    } else if (this.props.message.selected && !this.props.message.read) {
      return "row message selected unread";
    }
    if (this.props.message.read) {
      return "row message read";
    } else {
      return "row message unread";
    }
  };

  toggleCheckbox = () => {
    this.props.selectMessages(false, true, this.props.message.id);
  };

  onClickCheckbox = () => {
    this.toggleCheckbox();
    this.setMessageStyle();
  };

  onClickStar = () => {
    this.props.setStarred(this.state.id);
  };

  styleStarIcon = () =>
    this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o";

  render() {
    return (
      <div className="message-container">
        <div className={this.setMessageStyle()}>
          <div className="col-xs-3">
            <div className="row">
              <div className="col-xs-1">
                <input
                  onChange={this.onClickCheckbox}
                  type="checkbox"
                  checked={this.props.message.selected}
                />
              </div>
              <div className="col-xs-1">
                <i
                  onClick={this.onClickStar}
                  className={this.styleStarIcon()}
                ></i>
              </div>
              <div className="col-xs-1">
                {this.props.message.labels.map((label, i) => (
                  <div key={i} className="label">
                    {label}
                  </div>
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
