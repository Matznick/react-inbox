import React, { Component } from "react";

class Toolbar extends Component {
  handleSelection = (e) => {
    if (e.target.getAttribute("name") === "addLabelBtn") {
      this.props.addLabelToMessage(true, e.target.value);
      e.target.selectedIndex = 0;
    } else {
      console.log("reached delete in toolvbar");
      this.props.addLabelToMessage(false, e.target.value);
      e.target.selectedIndex = 0;
    }
  };

  render() {
    return (
      <div>
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">
                {this.props.countUnreadMessages()}
              </span>
              unread messages
            </p>

            <button
              onClick={this.props.selectMessages.bind(true)}
              className="btn btn-default"
            >
              <i
                className={
                  this.props.allMessagesSelected
                    ? "fa fa-square"
                    : "fa fa-square-o"
                }
              ></i>
            </button>

            <button
              onClick={this.props.markAsRead.bind(this, true)}
              className="btn btn-default"
            >
              Mark As Read
            </button>

            <button
              onClick={this.props.markAsRead.bind(this, false)}
              className="btn btn-default"
            >
              Mark As Unread
            </button>

            <select
              className="form-control label-select"
              //disabled="disabled"
              onChange={this.handleSelection}
              name="addLabelBtn"
            >
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select
              className="form-control label-select"
              //disabled="disabled"
              onChange={this.handleSelection}
              name="deleteLabelBtn"
            >
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button
              onClick={this.props.deleteMessage}
              className="btn btn-default"
              //disabled="disabled"
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
