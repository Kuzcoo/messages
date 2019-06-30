import React from "react";
import "./MessageItem.css";
import SvgPadLock from "./SvgPadLock";

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justAdded: !!props.justAdded
    }
  }

  componentDidMount() {
    if (this.state.justAdded) {
      setTimeout(() => {
        this.setState({
          justAdded: false
        });  
      }, 100);
    }
  }

  render() {
    const { text, timestamp, isPrivate } = this.props;
    const animationStyles = this.state.justAdded ? { borderColor: "orange", opacity: 0 } : null;
    return (
      <article className="message" style={animationStyles}>
        <header className="message__infos">
          <span className="message__info">{new Date(timestamp).toLocaleString()}</span>
          {isPrivate && <SvgPadLock />}
        </header>
        <p className="message__text">{text}</p>
      </article>
    );
  }
}
