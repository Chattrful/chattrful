import Breakpoints from 'util/breakpoints'
import Truncate from 'util/truncate'

document.addEventListener("turbolinks:load", () => {
  const mobileConversationChatWidget = document.querySelector('.mobile-conversation-chat-widget')

  $(document).on('click', '.conversation-list__item', event => {
    document.querySelectorAll('.conversation-list__item--active').forEach(conversationList => {
      conversationList.classList.remove('conversation-list__item--active');
    })

    event.currentTarget.classList.add('conversation-list__item--active')

    if (Breakpoints.isMobileOrTablet()) {
      mobileConversationChatWidget.classList.add('offcanvas-mobile-on')
    }
  })

  if (Breakpoints.isMobileOrTablet()) {
    $(document).on('click', '.js-mobile-close-chat-widget', () => {
      document.querySelectorAll('.conversation-list__item--active').forEach(conversationList => {
        conversationList.classList.remove('conversation-list__item--active');
      })

      mobileConversationChatWidget.classList.remove('offcanvas-mobile-on')
      mobileConversationChatWidget.innerHTML = ''
    })
  }

  Truncate()
})
