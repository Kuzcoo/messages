import React from "react";
import ReactDOM from "react-dom";
import withService from "./utils/withService";
import MessagesService from "./features/messages/MessagesService";
import FetchMessages from "./features/messages/FetchMessages";
import MessagesView from "./features/messages/MessagesView";

import "./styles.css";

const MessagesViewContainer = withService(MessagesView, MessagesService);

function App() {
  return (
    <div className="App">
      <FetchMessages>{MessagesViewContainer}</FetchMessages>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
