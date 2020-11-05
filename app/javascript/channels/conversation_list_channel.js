import consumer from './consumer'
import Truncate from 'util/truncate'
import Timestamp from 'util/timestamp'

document.addEventListener("turbolinks:load", () => {
  const conversationList = document.querySelector('.conversation-list__body')

  if (conversationList) {
    consumer.subscriptions.create({
      channel: 'ConversationListChannel'
      },
      {
        connected () {
          // Called when the subscription is ready for use on the server
          console.log('connected to ConversationListChannel')
        },

        disconnected () {
          // Called when the subscription has been terminated by the server
          console.log('disconnected to ConversationListChannel')
        },

        received (data) {
          const tempHTML = document.createElement('div')
          tempHTML.innerHTML = data.html
          tempHTML.querySelector('.conversation-list__item-timestamp').innerText = Timestamp.current()
          const newConversationListItem = tempHTML.querySelector('.conversation-list__item')

          let existingConversationListItem = conversationList.querySelector(`.conversation-list__item[data-id="${newConversationListItem.dataset.id}"]`)

          if (existingConversationListItem) {
            if (existingConversationListItem.classList.contains('conversation-list__item--active')) {
              newConversationListItem.classList.add('conversation-list__item--active')
            }

            conversationList.removeChild(existingConversationListItem)
          }

          conversationList.prepend(tempHTML.firstElementChild)

          Truncate()
        }
      }
    )
  }
})
