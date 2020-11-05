import consumer from './consumer'
import Truncate from 'util/truncate'

document.addEventListener("turbolinks:load", () => {
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
        const conversationList = document.querySelector('.conversation-list__body')

        if (conversationList) {
          const activeConversation = document.querySelector('.conversation-list__item--active')
          let activeConversationId

          if (activeConversation) {
            activeConversationId = activeConversation.dataset.id
          }

          conversationList.querySelectorAll('.conversation-list__item').forEach(conversationListItem => conversationList.removeChild(conversationListItem))
          const tempHTML = document.createElement('div')
          tempHTML.innerHTML = data.html
          Array.from(tempHTML.children).forEach(node => conversationList.append(node))

          Truncate()

          if (activeConversationId) {
            const conversationListItems = document.querySelectorAll('.conversation-list__item')

            for (let i = 0; i < conversationListItems.length; i++) {
              let conversationListItem = conversationListItems[i]
              if (conversationListItem.dataset.id == activeConversationId) {
                conversationListItem.classList.add('conversation-list__item--active')
                break
              }
            }
          }
        }
      }
    }
  )
})
