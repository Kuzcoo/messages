import React from "react";
import ReactDOM from "react-dom";
import withService from "./withService";
import MessagesService from "./MessagesService";
import FetchMessages from "./FetchMessages";
import MessagesView from "./MessagesView";

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
