import React from "react";
import { shallow } from "enzyme";
import { createMessagesWithTimeStamp } from "./utils";
import MessagesView from "../features/messages/MessagesView";

describe("MessagesView", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  it('should render a loader', () => {
    const wrapper = shallow(<MessagesView loading={true} />);
    expect(wrapper.find(".loader").length).toBe(1);
  });

  it('should render an error message', () => {
    const wrapper = shallow(<MessagesView loading={false} error={true} />);
    const infoMessage = wrapper.find("InfoMessage");
    expect(infoMessage.length).toBe(1);
    expect(infoMessage.props().message).toEqual("Une erreur s'est produite lors de la récupération de vos messages.");
  });

  it('should render an info message', () => {
    const wrapper = shallow(<MessagesView loading={false} messages={[]} />);
    const infoMessage = wrapper.find("InfoMessage");
    expect(infoMessage.length).toBe(1);
    expect(infoMessage.props().message).toEqual("Vous n'avez aucun message à afficher.");
  });

  it('should render a list of messages', () => {
    const wrapper = shallow(<MessagesView loading={false} messages={createMessagesWithTimeStamp(3)} />);
    const messageItems = wrapper.find("MessageItem");
    expect(messageItems.length).toBe(3);
  });
});