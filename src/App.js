import "./App.css";
import { Component } from "react";
import MessagesList from "./components/MessagesList";
import Toolbar from "./components/Toolbar";
import ComposeForm from "./components/ComposeForm";

class App extends Component {
  state = {
    seedMessages: [],
    showComposeForm: "message-container hidden",
  };

  async componentDidMount() {
    this.loadMessagesFromServer();
  }

  loadMessagesFromServer = async () => {
    const response_messages = await fetch("http://localhost:8082/api/messages");
    let json_messages = await response_messages.json();
    // clean messages from selected state, as it shouldnt be persisted server-side
    let cleanedMessages = [];
    cleanedMessages = cleanedMessages.concat(json_messages);
    cleanedMessages.forEach((el) => delete el.selected);
    console.log("cleaned json_messages: ", cleanedMessages);
    this.setState({ seedMessages: cleanedMessages });
  };

  getSelectedMessageIds = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    let updatedMessages = [];
    updatedMessages = updatedMessages.concat(
      messages.filter((m) => m.selected)
    );
    const selectedIds = updatedMessages.map((el) => el.id);
    console.log("selected Ids: ", selectedIds);
    return selectedIds;
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

  setStarred = async (id) => {
    const setStarredBody = { messageIds: [id], command: "star" };
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(setStarredBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("starred response: ", response);
    await this.loadMessagesFromServer();
    this.applyCurrentSelection([id]);
  };

  markAsRead = async (param) => {
    const idsToMarkAsRead = this.getSelectedMessageIds();
    const markAsReadBody = {
      messageIds: idsToMarkAsRead,
      command: "read",
      read: param,
    };
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(markAsReadBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("markAsRead response: ", response);
    await this.loadMessagesFromServer();
    this.applyCurrentSelection(idsToMarkAsRead);
  };

  applyCurrentSelection = (ids) => {
    let currSelectedArray = [];
    currSelectedArray = currSelectedArray.concat(this.state.seedMessages);
    currSelectedArray.map((el) =>
      ids.includes(el.id) ? (el.selected = true) : (el.selected = false)
    );
    this.setState({ seedMessages: currSelectedArray });
  };

  deleteMessageOnServer = async () => {
    const idsToDelete = this.getSelectedMessageIds();
    console.log("idsToDelete from delete: ", idsToDelete);

    const deleteBody = { messageIds: idsToDelete, command: "delete" };
    console.log("deletebody: ", deleteBody);
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(deleteBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("delete response: ", response);
    await this.loadMessagesFromServer();
  };

  countUnreadMessages = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    const numberOfUnread = messages.reduce((acc, curr) => {
      return acc + (curr.read === false ? 1 : 0);
    }, 0);
    return numberOfUnread;
  };

  changeLabelOnServer = async (add, param) => {
    const idsToChangeLabel = this.getSelectedMessageIds();
    console.log("idsToAddLabel: ", idsToChangeLabel);
    let changeLabelBody = {};
    if (add) {
      changeLabelBody = {
        messageIds: idsToChangeLabel,
        command: "addLabel",
        label: param,
      };
    } else {
      changeLabelBody = {
        messageIds: idsToChangeLabel,
        command: "removeLabel",
        label: param,
      };
    }
    console.log(changeLabelBody);
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(changeLabelBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("addLabel response: ", response);
    // this.setState({ seedMessages: updatedMessages });
    await this.loadMessagesFromServer();
    this.applyCurrentSelection(idsToChangeLabel);
  };

  countSelectedMessages = () => {
    let messages = [];
    messages = messages.concat(this.state.seedMessages);
    const numberOfSelected = messages.reduce((acc, curr) => {
      return acc + (curr.selected === true ? 1 : 0);
    }, 0);
    return numberOfSelected;
  };

  toggleComposeForm = () => {
    let classNameString =
      this.state.showComposeForm === "message-container"
        ? "message-container hidden"
        : "message-container";
    this.setState({ showComposeForm: classNameString });
    return classNameString;
  };

  postNewMessage = async (messageValues) => {
    const postNewMessageBody = {
      command: "post",
      subject: messageValues.subject,
      body: messageValues.body,
    };
    console.log(postNewMessageBody);
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify(postNewMessageBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("postNewMessage response: ", response);
    await this.loadMessagesFromServer();
  };

  render() {
    return (
      <div className="App">
        <Toolbar
          selectMessages={this.selectMessages}
          markAsRead={this.markAsRead}
          deleteMessageOnServer={this.deleteMessageOnServer}
          countUnreadMessages={this.countUnreadMessages}
          changeLabelOnServer={this.changeLabelOnServer}
          countSelectedMessages={this.countSelectedMessages}
          seedMessages={this.state.seedMessages}
          toggleComposeForm={this.toggleComposeForm}
        />
        <ComposeForm
          showComposeForm={this.state.showComposeForm}
          key={this.state.showComposeForm}
          postNewMessage={this.postNewMessage}
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
