import React from "react";
import withService from "../../utils/withService";
import MessagesService from "./MessagesService";

export class FetchMessages extends React.PureComponent {
  state = {
    error: false,
    messages: [],
    loading: true
  };

  fetchMessages() {
    this.props.fetchMessages().then(messages => {
      this.setState({
        loading: false,
        messages
      });
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  reload = () => {
    this.setState({
      loading: true,
      error: false
    });
    this.fetchMessages();
  };

  render() {
    return this.props.children({ ...this.state, reload: this.reload });
  }
}

export default withService(FetchMessages, MessagesService);
