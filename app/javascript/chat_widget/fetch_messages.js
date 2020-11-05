import DOMHelper from 'util/dom_helper'

const createSpinner = () => {
  const chatMessages = document.querySelector('.js-chat-messages')

  DOMHelper.prepend({
    parent: chatMessages,
    html: '<div class="chat-messages__scrolling-spinner"><div class="spinner"></div></div>'
  })
}

export default function FetchMessages ({lastMessageId} = {}) {
  createSpinner()
  const chatMessages = document.querySelector('.js-chat-messages')
  const url = lastMessageId ? `${chatMessages.dataset.url}?last_message_id=${lastMessageId}` : chatMessages.dataset.url

  return fetch(
    url,
    {
      headers: {
        'Content-Type': 'text/javascript; charset=utf-8'
      }
    }
  )
}
