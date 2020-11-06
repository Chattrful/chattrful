import DOMHelper from 'util/dom_helper'
import Timestamp from 'util/timestamp'

const createSpinner = () => {
  const chatMessages = document.querySelector('.js-chat-messages')

  DOMHelper.prepend({
    parent: chatMessages,
    html: '<div class="chat-messages__scrolling-spinner"><div class="spinner"></div></div>'
  })
}

const FetchMessages = (function () {
  return {
    fetch: function({lastMessageId} = {}) {
      createSpinner()
      const chatMessages = document.querySelector('.js-chat-messages')
      const url = lastMessageId ? `${chatMessages.dataset.url}?last_message_id=${lastMessageId}` : chatMessages.dataset.url

      return fetch(
        url
      )
    },

    handleResponse: function(data) {
      const chatMessages = document.querySelector('.js-chat-messages')
      const identifier = document.querySelector('.js-page-data').dataset.identifier

      document.querySelector('.chat-messages__scrolling-spinner').remove()

      if (data.html.trim().length > 0) {
        var tempHTML = document.createElement('div')
        tempHTML.innerHTML = data.html
        Array.from(tempHTML.children).forEach(message => {
          if (message.dataset.messageSender == identifier) {
            message.classList.add('chat-messages__item--mine')
          }
          const messageTimestamp = message.querySelector('[data-message-timestamp]')
          const timestamp = Timestamp.fromUnix(messageTimestamp.dataset.messageTimestamp)
          messageTimestamp.innerHTML = timestamp
          chatMessages.prepend(message)
        })

        chatMessages.dataset.lastMessageId = data.last_message_id
      } else {
        chatMessages.dataset.scroll = false
      }

      if (data.previous_last_message_id) {
        if (chatMessages.scrollTop == 0) {
          document.querySelector(`[data-message-id="${data.previous_last_message_id}"]`).scrollIntoView()
        }
      } else {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  }
})()

export default FetchMessages
