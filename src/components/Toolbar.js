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

  setSelectButtonStyle = () => {
    console.log(this.props.seedMessages.length);
    if (this.props.countSelectedMessages() === this.props.seedMessages.length) {
      return "fa fa-square fa_custom";
    } else if (this.props.countSelectedMessages() === 0) {
      return "fa fa-square-o";
    } else {
      return "fa fa-square";
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
              <i className={this.setSelectButtonStyle()}></i>
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
