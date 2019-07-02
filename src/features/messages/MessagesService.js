const GET_RESPONSE_DELAY = 1000;

const MessagesService = (function() {
  const _messages = [];

  return {
    createMessage(message) {
      _messages.unshift(message);
      return message;
    },
    fetchMessages() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(_messages), GET_RESPONSE_DELAY);
      });
    }
  };
})();

export default MessagesService;
