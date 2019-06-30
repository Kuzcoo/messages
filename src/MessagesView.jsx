import React from "react";
import shortid from "shortid";
import MessageEditor from "./MessageEditor";
import MessageItem from "./MessageItem";
import InfoMessage from "./InfoMessage";
import "./MessagesView.css";

export default class MessagesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages ? props.messages : []
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event) => {
    const { pageYOffset } = window;
    if (pageYOffset > 120 && !this.state.shouldReduceHeader) {
      this.setState({
        shouldReduceHeader: true
      });
    } else if (pageYOffset < 120 && this.state.shouldReduceHeader) {
      this.setState({
        shouldReduceHeader: false
      });
    }
  }

  createMessage = message => {
    const createdMessage = this.props.createMessage(message);
    this.setState(({ messages }) => ({
      messages: [createdMessage, ...messages]
    }));
  };

  reloadMessages = () => {
    this.props.reload();
  };

  getMessagesList() {
    const { messages } = this.state;
    const { loading, error } = this.props;

    if (loading) {
      return <h3 className="loader">Chargement des messages...</h3>;
    }

    if (error) {
      return (
        <InfoMessage message="Une erreur s'est produite lors de la récupération de vos messages.">
          <button className="button" style={{ marginTop: '1rem' }} onClick={this.reloadMessages}>
            Réssayer
          </button>
        </InfoMessage>
      );
    }

    if (messages.length === 0) {
      return (
        <InfoMessage
          message="Vous n'avez aucun message à afficher." />
      );
    }

    // extraire ??
    return messages.map(({ timestamp, ...other }) => (
      <MessageItem key={timestamp} timestamp={timestamp} {...other} />
    ));
  }

  render() {
    const messageList = this.getMessagesList();
    const { shouldReduceHeader } = this.state;

    return (
      <main>
        <header className={shouldReduceHeader ? "scrolled": null}>
          <h2 className="title">LiveMessages</h2>
          <MessageEditor
            className="app-message-editor"
            onNewMessage={this.createMessage}
          />
        </header>
        <section className="messages">
          <h3 className="messages__title">Messages publiés</h3>
          {messageList}
        </section>
      </main>
    );
  }
}
