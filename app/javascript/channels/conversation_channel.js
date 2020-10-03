import consumer from './consumer'
import KTCookie from '../metronic/components/cookie'
import ScrollToBottom from '../custom/scroll_to_bottom'

document.addEventListener('turbolinks:load', () => {
  consumer.subscriptions.create(
    {
      channel: 'ConversationChannel',
      conversation_id: document.querySelector('[data-conversation-id]').dataset
        .conversationId
    },
    {
      connected () {
        // Called when the subscription is ready for use on the server
        console.log('connected to ConversationChannel')
      },

      disconnected () {
        // Called when the subscription has been terminated by the server
        console.log('disconnected to ConversationChannel')
      },

      received (data) {
        const appendedMessage = document.querySelector(
          `[data-message-id="${data.message_id}"]`
        )

        if (!appendedMessage) {
          const tempHTML = document.createElement('div')
          tempHTML.innerHTML = data.html
          const message = tempHTML.firstChild
          const chatMessages = document.querySelector('.js-chat-messages')
          chatMessages.append(message)
          ScrollToBottom(chatMessages)
        }
      }
    }
  )
})
