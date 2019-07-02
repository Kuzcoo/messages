import React from "react";
import "./InfoMessage.css";

export default function InfoMessage({ message, children }) {
  return (
    <article className="info-message">
      <p className="info-message__text">
        {message}
      </p>
      {children}
    </article>
  );
}
