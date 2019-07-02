import React from "react";
import "./MessageEditor.css";
import SvgPadLock from "../../components/icons/SvgPadLock";

export default class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
    this.checkboxRef = React.createRef();
    this.state = {
      error: null,
      isMessageEmpty: true
    };
  }

  resetErrorState() {
    this.setState({
      isMessageEmpty: true,
      error: false
    });
  }

  resetFields() {
    this.textareaRef.current.value = "";
    this.checkboxRef.current.checked = false;
  }

  handleChange = (event) => {
    const { isMessageEmpty } = this.state;
    const { value } = event.target;
    if (isMessageEmpty && value !== "") {
      this.setState({
        isMessageEmpty: false
      });
    } 
    else if (!isMessageEmpty && value === "") {
      this.setState({
        isMessageEmpty: true
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.textareaRef.current;
    const { checked } = this.checkboxRef.current;

    if (!this.validateMessage(value)) return;

    this.props.onNewMessage({
      isPrivate: checked,
      text: value,
      timestamp: Date.now(),
      justAdded: true
    });

    this.resetErrorState();
    this.resetFields();
  };

  validateMessage(text) {
    return !!text;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="message-editor">
        <label className="message-editor__label" htmlFor="new-message">Ecrire un message</label>
        <textarea
          onChange={this.handleChange}
          id="new-message"
          ref={this.textareaRef}
          className="message-editor__text"
          rows="2"
        />
        <p className="message-editor__actions">
          <input id="private" ref={this.checkboxRef} type="checkbox" />
          <label htmlFor="private" className="message-editor__visibility">
            <SvgPadLock />
            Message privé
          </label>
          <input
            disabled={this.state.isMessageEmpty}
            type="submit"
            value="Publier"
            className="button message-editor__submit"
          />
        </p>
      </form>
    );
  }
}
