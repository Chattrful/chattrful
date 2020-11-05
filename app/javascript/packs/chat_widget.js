import autosize from 'autosize'
import ScrollToBottom from '../util/scroll_to_bottom'
import EmojiPicker from '../chat_widget/emoji_picker'
import InfiniteScroll from '../chat_widget/infinite_scroll'
import FetchMessages from '../chat_widget/fetch_messages'
import ExecuteScript from '../util/execute_script'
import InitVisitorAccount from '../chat_widget/init_visitor_account'
import ConversationChannel from '../chat_widget/conversation_channel'
import Rails from '@rails/ujs'
import Breakpoints from 'util/breakpoints'

document.addEventListener('turbolinks:load', () => {
  const handleSubmit = () => {
    const content = chatboxTextarea.value.trim()

    if (content.length > 0) {
      const timestamp = Date.now()
      appendContent(content, timestamp)
      form.querySelector('.js-timestamp-input').value = timestamp
      Rails.fire(form, 'submit')
      chatboxTextarea.value = ''
      chatboxTextarea.style.height = 'initial'
      emojiPicker.close()
      emojiTrigger.classList.remove('btn-icon--active')
      ScrollToBottom({element: chatMessages})
    } else {
      event.preventDefault()
    }

    chatboxTextarea.focus()
  }

  const appendContent = (content, timestamp) => {
    const element = document.createElement('html');
    element.innerHTML = messageTemplate
    const chatMessage = element.querySelector('.chat-messages__item')
    chatMessage.dataset.timestamp = timestamp
    chatMessage.querySelector('.chat-messages__item-text').innerText = content

    chatMessages.appendChild(chatMessage)
  }

  const handleVisitorAccountData = (data) => {
    localStorage.setItem('chattrful_session', data.chattrful_session)
    pageData.dataset.identifier = data.identifier
    pageData.dataset.conversationId = data.conversation_id
    chatMessages.dataset.url = data.messages_path
    form.action = data.messages_path
  }

  let emojiPicker
  let infinieScroll
  let subscription
  let messageTemplate

  let chatboxTextarea = document.querySelector('.js-chatbox')
  let chatMessages = document.querySelector('.js-chat-messages')
  let chatboxSubmitButton = document.querySelector('.js-chatbox-submit')
  let emojiTrigger = document.querySelector('.js-emoji-trigger');
  let pageData = document.querySelector('.js-page-data')
  let form = document.querySelector('.js-chatbox-form')
  const errorSvg = "<svg xmlns='http://www.w3.org/2000/svg' class='icon-svg chat-messages__item-error-icon' \
                    viewBox='0 0 512 512'><title>Message failed to sent. Please try again.</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' \
                    fill='none' stroke-miterlimit='10' stroke-width='32'/><path d='M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z' \
                    fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z'/></svg>"

  const initChatboxTextarea = () => {
    autosize(chatboxTextarea)

    chatboxTextarea.addEventListener('keypress', event => {
      // When enter or space is pressed
      if (event.keyCode == 32 || event.keyCode == 13) {
        if (event.target.value.length < 1) {
          event.preventDefault()
          return
        }
      }

      // When enter is pressed
      if (event.keyCode == 13) {
        // If shift is pressed, don't submit
        if (!Breakpoints.isMobileOrTablet() && !event.shiftKey) {
          handleSubmit()
          event.preventDefault()
        }
      }
    })

    chatboxTextarea.addEventListener('blur', event => {
      event.target.dataset.selectionStart = event.target.selectionStart
    })

    chatboxTextarea.addEventListener('focus', event => {
      // https://medium.com/beamdental/scrolltop-and-other-bugs-the-never-ending-battle-against-bugs-4815e6a2b00a
      if (chatMessages.scrollHeight - Math.ceil(chatMessages.scrollTop) <= chatMessages.clientHeight) {
        ScrollToBottom({
          element: chatMessages,
          delay: 250
        })
      }
    })
  }

  const initEmojiTrigger = () => {
    emojiTrigger.addEventListener('click', event => {
      let shouldScrollBtm = false
      if (chatMessages.scrollHeight - chatMessages.scrollTop === chatMessages.clientHeight) {
        shouldScrollBtm = true
      }

      if (emojiTrigger.classList.contains('btn-icon--active')) {
        emojiTrigger.classList.remove('btn-icon--active')
        emojiPicker.close()
      } else {
        emojiTrigger.classList.add('btn-icon--active')
        emojiPicker.open()
      }

      if (shouldScrollBtm) {
        ScrollToBottom({
          element: chatMessages,
          delay: 250
        })
      }
    })
  }

  const initChatboxSubmit = () => {
    chatboxSubmitButton.addEventListener('click', event => {
      handleSubmit()
    })
  }

  const initForm= () => {
    form.addEventListener('ajax:error', event => {
      let timestamp = form.querySelector('.js-timestamp-input').value
      let chatMessage = document.querySelector(`[data-timestamp="${timestamp}"]`)
      chatMessage.querySelector('.spinner').remove()
      chatMessage.querySelector('.chat-messages__item-timestamp').innerHTML = errorSvg
    })
  }

  const init = async () => {
    chatMessages.querySelector('.chat-messages__scrolling-spinner').remove()

    if (pageData.dataset.identifier.length < 1) {
      const initVisitorConversationResponse = await InitVisitorAccount()
      const visitorAccountData = await initVisitorConversationResponse.json()
      handleVisitorAccountData(visitorAccountData)
    } else {
      const timeZoneOffset = - new Date().getTimezoneOffset() / 60
      const initUserTimeZoneResponse = await fetch(
        `/ajax/profile/time_zone?time_zone_offset=${timeZoneOffset}`,
        { method: 'POST' }
      )
      await initUserTimeZoneResponse.text()
    }

    initChatboxTextarea()
    initEmojiTrigger()
    initChatboxSubmit()
    initForm()

    subscription = ConversationChannel()

    const fetchMessagesResponse = await FetchMessages()
    const text = await fetchMessagesResponse.text()
    ExecuteScript({text: text})

    ScrollToBottom({
      element: chatMessages,
      delay: 100
    })

    emojiPicker = new EmojiPicker
    infinieScroll = new InfiniteScroll
  }

  if (chatMessages) {
    messageTemplate = pageData.dataset.template
    init()
  }

  $(document).on('click', '.conversation-list__item', event => {
    const id = event.currentTarget.dataset.id
    const currentPageData = document.querySelector('.js-page-data')

    if (!currentPageData || currentPageData.dataset.conversationId != id) {
      if (subscription) {
        subscription.unsubscribe()
      }

      fetch(`/conversations/${id}.js`)
        .then(response => response.json())
        .then(data => {
          document.querySelector('.js-chat-widget-container').innerHTML = data.html
          chatboxTextarea = document.querySelector('.js-chatbox')
          chatMessages = document.querySelector('.js-chat-messages')
          chatboxSubmitButton = document.querySelector('.js-chatbox-submit')
          emojiTrigger = document.querySelector('.js-emoji-trigger');
          pageData = document.querySelector('.js-page-data')
          messageTemplate = pageData.dataset.template
          form = document.querySelector('.js-chatbox-form')
          init()
        })
    }
  })
  const conversationLists = document.querySelectorAll('.conversation-list__item')
})
