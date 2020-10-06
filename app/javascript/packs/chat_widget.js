require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import autosize from 'autosize'
import { EmojiButton } from '@joeattardi/emoji-button'
import Rails from '@rails/ujs'
import ScrollToBottom from '../util/scroll_to_bottom'
import EmojiPicker from '../chat_widget/emoji_picker'

Rails.start()

document.addEventListener('turbolinks:load', () => {
  const emojiPicker = new EmojiPicker
  const chatboxTextarea = document.querySelector('.js-chatbox')
  const chatMessages = document.querySelector('.js-chat-messages')
  const chatboxSubmitButton = document.querySelector('.js-chatbox-submit')
  const emojiTrigger = document.querySelector('.js-emoji-trigger');

  // Chatbox Textarea
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
      if (!isMobileOrTablet() && !event.shiftKey) {
        handleSubmit()
        event.preventDefault()
      }
    }
  })

  chatboxTextarea.addEventListener('blur', event => {
    event.target.dataset.selectionStart = event.target.selectionStart
  })

  chatboxTextarea.addEventListener('focus', event => {
    if (chatMessages.scrollHeight - chatMessages.scrollTop === chatMessages.clientHeight) {
      ScrollToBottom({
        element: chatMessages,
        delay: 250
      })
    }
  })

  // Submit button
  chatboxSubmitButton.addEventListener('click', event => {
    handleSubmit()
  })

  const handleSubmit = () => {
    const content = chatboxTextarea.value.trim()

    if (content.length > 0) {
      const timestamp = Date.now()
      appendContent(content, timestamp)
      const form = document.querySelector('.js-chatbox-form')
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
    const chatMessage = document.createElement('div')
    chatMessage.className = 'chat-messages__item chat-messages__item--mine'
    chatMessage.dataset.timestamp = timestamp
    const chatMessageText = document.createElement('div')
    chatMessageText.className = 'chat-messages__item-text'
    chatMessageText.innerText = content

    chatMessage.appendChild(chatMessageText)

    document.querySelector('.js-chat-messages').appendChild(chatMessage)
  }

  // Emoji trigger
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

    chatboxTextarea.focus();

    if (shouldScrollBtm) {
      ScrollToBottom({
        element: chatMessages,
        delay: 250
      })
    }
  })

  const isMobileOrTablet = () => window.innerWidth < 992

  ScrollToBottom({
    element: chatMessages,
    delay: 250
  })
})
