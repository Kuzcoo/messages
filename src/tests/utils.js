export function createMessagesWithTimeStamp(numberOfMessages) {
  const messages = [];
  for (let i = 0; i < numberOfMessages; i++) {
    messages.push({
      timestamp: Date.now(),
      message: "Message " + i
    });
  }
  return messages;
}

export function fillMessage(wrapper) {
  return ({ value, isPrivate }) => {
    const textareaInstance = wrapper.find("textarea").instance();
    const checkboxInstance = wrapper.find("input[type='checkbox']").instance();
    textareaInstance.value = value;
    checkboxInstance.checked = isPrivate;
    return {
      textareaInstance,
      checkboxInstance
    };
  }
}