import "./App.css";
import { Component } from "react";
import MessagesList from "./components/MessagesList";
import Toolbar from "./components/Toolbar";

class App extends Component {
  state = {
    seedMessages: [
      {
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        selected: false,
        labels: ["dev", "personal"],
      },
      {
        id: 2,
        subject:
          "connecting the system won't do anything, we need to input the mobile AI panel!",
        read: false,
        starred: false,
        selected: true,
        labels: [],
      },
      {
        id: 3,
        subject:
          "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        read: false,
        starred: true,
        selected: false,
        labels: ["dev"],
      },
      {
        id: 4,
        subject: "We need to program the primary TCP hard drive!",
        read: true,
        starred: false,
        selected: true,
        labels: [],
      },
      {
        id: 5,
        subject:
          "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        read: false,
        starred: false,
        selected: false,
        labels: ["personal"],
      },
      {
        id: 6,
        subject: "We need to back up the wireless GB driver!",
        read: true,
        starred: true,
        selected: false,
        labels: [],
      },
      {
        id: 7,
        subject: "We need to index the mobile PCI bus!",
        read: true,
        starred: false,
        selected: false,
        labels: ["dev", "personal"],
      },
      {
        id: 8,
        subject:
          "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        read: true,
        starred: true,
        selected: false,
        labels: [],
      },
    ],
  };

  selectMessages = (all = false, one_only = false, id = null) => {
    if (one_only) {
      const found = this.state.seedMessages.find((m) => m.id === id);
      if (found) {
        let readMessages = [];
        readMessages = readMessages.concat(this.state.seedMessages);
        let newArray = [];
        newArray = newArray.concat(
          readMessages.map((m) =>
            m.id === found.id ? { ...m, selected: !found.selected } : m
          )
        );

        this.setState({ seedMessages: newArray });

        // // grab where we found the target item
        // const the_index = this.state.seedMessages.indexOf(found);

        // // make a new array to work on since we don't mutate state on state
        // const new_messages_array = [];
        // const final_messages = new_messages_array.concat(
        //   this.state.seedMessages
        // );

        // // construct the new object with the toggle in place
        // const new_message = { ...found, selected: !found.selected };

        // // insert the new object in the array
        // final_messages[the_index] = new_message;

        // // update the state to have the new array with the new object.
        // this.setState({ seedMessages: final_messages });
      }
      return;
    }

    let selectedMessages = [];
    selectedMessages = selectedMessages.concat(this.state.seedMessages);
    const allAreChecked = selectedMessages.every((m) => m.selected === true);
    const allAreNotChecked = selectedMessages.find((m) => m.selected === false);
    let newMessagesArray = selectedMessages.map((m) => {
      if (all && allAreChecked) {
        return { ...m, selected: false };
      } else if (all && allAreNotChecked) {
        return { ...m, selected: true };
      } else {
        return { ...m, selected: true };
      }
    });
    this.setState({ seedMessages: newMessagesArray });
  };

  setStarred = (id) => {
    let readMessages = [];
    readMessages = readMessages.concat(this.state.seedMessages);
    let newArray = [];
    const foundMessage = this.state.seedMessages.find((m) => m.id === id);
    newArray = newArray.concat(
      readMessages.map((m) =>
        m.id === foundMessage.id ? { ...m, starred: !m.starred } : m
      )
    );
    this.setState({ seedMessages: newArray });
  };

  markAsRead = (param) => {
    console.log("param ", param);
    let readMessages = [];
    readMessages = readMessages.concat(this.state.seedMessages);
    let newArray = [];
    newArray = newArray.concat(
      readMessages.map((m) => (m.selected ? { ...m, read: param } : m))
    );

    this.setState({ seedMessages: newArray });
  };

  deleteMessage = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    let newArray = [];
    newArray = newArray.concat(messages.filter((m) => !m.selected));
    console.log("newArray from delete: ", newArray);
    this.setState({ seedMessages: newArray });
  };

  countUnreadMessages = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    const numberOfUnread = messages.reduce((acc, curr) => {
      return acc + (curr.read === false ? 1 : 0);
    }, 0);
    return numberOfUnread;
  };

  addLabelToMessage = (add = true, param = "") => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    let newArray = [];
    newArray = newArray.concat(
      messages.map((m) => {
        // for adding a label
        if (add) {
          if (m.selected) {
            if (m.labels.includes(param)) {
              return m;
            } else {
              return { ...m, labels: [...m.labels, param] };
            }
          }
          // for deleting a label
        } else {
          if (m.selected) {
            if (m.labels.includes(param)) {
              return { ...m, labels: m.labels.filter((el) => !(el === param)) };
            } else {
              return m;
            }
          }
        }
        return m;
      })
    );
    console.log("newArray from addLabelToMessage: ", newArray);
    this.setState({ seedMessages: newArray });
  };

  countSelectedMessages = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    const numberOfSelected = messages.reduce((acc, curr) => {
      return acc + (curr.selected === true ? 1 : 0);
    }, 0);
    return numberOfSelected;
  };

  render() {
    return (
      <div className="App">
        <Toolbar
          selectMessages={this.selectMessages}
          markAsRead={this.markAsRead}
          deleteMessage={this.deleteMessage}
          countUnreadMessages={this.countUnreadMessages}
          addLabelToMessage={this.addLabelToMessage}
          countSelectedMessages={this.countSelectedMessages}
          seedMessages={this.state.seedMessages}
        />
        <MessagesList
          seedMessages={this.state.seedMessages}
          selectMessages={this.selectMessages}
          setStarred={this.setStarred}
          key={this.seedMessages}
        />
      </div>
    );
  }
}
export default App;
