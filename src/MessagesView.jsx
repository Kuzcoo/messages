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

    this.scroll = {
      lastPositionY: null
    };
  }

  componentDidMount() {
    this.scroll.lastPositionY = window.pageYOffset;
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.pageYOffset > this.scroll.lastPositionY) {
      this.setState({
        shouldReduceHeader: true
      });
    } else {
      this.setState({
        shouldReduceHeader: false
      });
    }
    this.scroll.lastPositionY = window.pageYOffset;
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
      return <h3 style={{ fontWeight: "normal" }}>Chargement des messages...</h3>;
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
          message="Publiez votre premier message en utilisant la zone de texte ci-dessus !" />
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
