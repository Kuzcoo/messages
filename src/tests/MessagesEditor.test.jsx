import React from "react";
import { shallow, mount } from "enzyme";
import { fillMessage } from "./utils";
import MessageEditor from "../MessageEditor";

describe("MessagesView", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  it("it should render a form element", () => {
    const wrapper = shallow(<MessageEditor />);
    expect(wrapper.is("form")).toBe(true);
  });

  it("it should have a disabled submit button when textarea is empty", () => {
    const wrapper = shallow(<MessageEditor />);
    expect(wrapper.find("input[type='submit']").props().disabled).toBe(true);
  });

  it("it should not have a disabled submit button when textarea is filled", () => {
    const wrapper = shallow(<MessageEditor />);
    wrapper.find("textarea").simulate('change', { target: { value: "a"} });
    expect(wrapper.find("input[type='submit']").props().disabled).toBe(false);
  });

  it("it should call expected handler with expected parameters on submit", () => {
    const handleNewMessage = jest.fn();
    const wrapper = mount(<MessageEditor onNewMessage={handleNewMessage}/>);
    fillMessage(wrapper)({ value: "a", isPrivate: true });
    wrapper.find("form").simulate('submit', {
      preventDefault: () => {}
    });
    expect(handleNewMessage).toHaveBeenCalledWith({
      isPrivate: true,
      text: "a",
      timestamp: handleNewMessage.mock.calls[0][0].timestamp,
      justAdded: true
    });
  });

  it("it should empty textarea and checkbox after submit", () => {
    const handleNewMessage = jest.fn();
    const wrapper = mount(<MessageEditor onNewMessage={handleNewMessage}/>);
    const { textareaInstance, checkboxInstance } = fillMessage(wrapper)({ value: "a", isPrivate: true });
    wrapper.find("form").simulate('submit', {
      preventDefault: () => {}
    });
    expect(textareaInstance.value).toEqual("");
    expect(checkboxInstance.checked).toBe(false);
  });
});