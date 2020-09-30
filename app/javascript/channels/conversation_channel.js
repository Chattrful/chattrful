import consumer from './consumer';
import KTCookie from '../metronic/components/cookie';

document.addEventListener("turbolinks:load", () => {
  consumer.subscriptions.create({
      channel: 'ConversationChannel',
      conversation_id: document.querySelector('[data-conversation-id]').dataset.conversationId
    }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('connected to ConversationChannel')
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('disconnected to ConversationChannel')
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data)
    }
  });
})
