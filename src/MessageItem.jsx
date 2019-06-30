import React from "react";
import "./MessageItem.css";
import SvgPadLock from "./SvgPadLock";

export default function MessageItem({ text, timestamp, isPrivate }) {
  return (
    <article className="message">
      <header className="message__infos">
        <span className="message__info">{new Date(timestamp).toLocaleString()}</span>
        {isPrivate && <SvgPadLock />}
      </header>
      <p className="message__text">{text}</p>
    </article>
  );
}
