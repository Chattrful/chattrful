import consumer from '../channels/consumer'
import ScrollToBottom from '../util/scroll_to_bottom'
import { format } from 'date-fns'

export default function ConversationChannel() {
  const chatMessages = document.querySelector('.js-chat-messages')

  const currentTimestamp = () => {
    return format(new Date(), 'hh:mm a')
  }

  return (
    consumer.subscriptions.create(
      {
        channel: 'ConversationChannel',
        conversation_id: document.querySelector('[data-conversation-id]').dataset.conversationId
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
          const identifier = document.querySelector('.js-page-data').dataset.identifier

          if (identifier != data.sender_identifier) {

            let shouldScrollBtm = false
            // https://medium.com/beamdental/scrolltop-and-other-bugs-the-never-ending-battle-against-bugs-4815e6a2b00a
            if (chatMessages.scrollHeight - Math.ceil(chatMessages.scrollTop) <= chatMessages.clientHeight) {
              shouldScrollBtm = true
            }

            const tempHTML = document.createElement('div')
            tempHTML.innerHTML = data.html
            tempHTML.querySelector('.chat-messages__item-timestamp').innerText = currentTimestamp()
            chatMessages.append(tempHTML.firstElementChild)

            if (shouldScrollBtm) {
              ScrollToBottom({element: chatMessages})
            }
          }
        }
      }
    )
  )
}
