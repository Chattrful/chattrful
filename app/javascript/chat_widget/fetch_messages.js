const createSpinner = () => {
  const chatMessages = document.querySelector('.js-chat-messages')
  let tempHTML = document.createElement('div')
  tempHTML.innerHTML = '<div class="chat-messages__scrolling-spinner"><div class="spinner"></div></div>'
  chatMessages.prepend(tempHTML.firstElementChild)
}

const fetchMessagesAsync = async (lastMessageId) => {
  const chatMessages = document.querySelector('.js-chat-messages')
  const url = lastMessageId ? `${chatMessages.dataset.url}?last_message_id=${lastMessageId}` : chatMessages.dataset.url

  let response = await fetch(
    url,
    {
      headers: {
        'Content-Type': 'text/javascript; charset=utf-8'
      }
    }
  )

  let text = await response.text()
  return text
}

export default function FetchMessages ({lastMessageId} = {}) {
  createSpinner()
  return fetchMessagesAsync(lastMessageId)
}
