require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import autosize from 'autosize'
import { EmojiButton } from '@joeattardi/emoji-button'
import Rails from '@rails/ujs'
import ScrollToBottom from '../custom/scroll_to_bottom'
import Emoji from '../custom/emoji'

Rails.start()

document.addEventListener('turbolinks:load', () => {
  const chatboxTextarea = document.querySelector('.js-chatbox')
  const chatMessages = document.querySelector('.js-chat-messages')

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
      setTimeout(() => {
        ScrollToBottom(chatMessages)
      }, 250);
    }
  })

  const chatboxSubmitButton = document.querySelector('.js-chatbox-submit')
  chatboxSubmitButton.addEventListener('click', event => {
    handleSubmit()
  })

  const emojiTrigger = document.querySelector('.js-emoji-trigger');

  const emojis = document.querySelector('.emojis')
  emojiTrigger.addEventListener('click', event => {
    const emojiSearchInput = document.querySelector('.emojis__search-input')

    if (emojiSearchInput.value.length > 0) {
      emojiSearchInput.value = ''

      const emojiButtons = document.querySelectorAll('.emojis__button')

      for (let i = 0; i < emojiButtons.length; i++) {
        emojiButtons[i].style.display = ''
      }
    }

    let scrollBtm = false
    if (chatMessages.scrollHeight - chatMessages.scrollTop === chatMessages.clientHeight) {
      scrollBtm = true
    }

    emojis.classList.toggle('emojis--open')
    emojiTrigger.classList.toggle('btn-icon--active')
    document.querySelector('.emojis__list').scrollTop = 0;
    chatboxTextarea.focus();

    if (scrollBtm) {
      setTimeout(() => {
        ScrollToBottom(chatMessages)
      }, 250);
    }
  })

  document.addEventListener('click', event => {
    if (event.target && event.target.classList.contains('emojis__button')) {
      let content = chatboxTextarea.value;
      let emoji = event.target.innerText;
      let position = parseInt(chatboxTextarea.dataset.selectionStart);
      let newContent = insertAt(content, emoji, position);

      chatboxTextarea.value = newContent;

      chatboxTextarea.focus();
      chatboxTextarea.setSelectionRange(position + emoji.length, position + emoji.length)
    }
  });

  const handleSubmit = () => {
    const chatboxTextarea = document.querySelector('.js-chatbox')
    const content = chatboxTextarea.value.trim()

    if (content.length > 0) {
      const timestamp = Date.now()
      appendContent(content, timestamp)
      const form = document.querySelector('.js-chatbox-form')
      form.querySelector('.js-timestamp-input').value = timestamp
      Rails.fire(form, 'submit')
      chatboxTextarea.value = ''
      chatboxTextarea.style.height = 'initial'
      ScrollToBottom(chatMessages)
    } else {
      event.preventDefault()
    }

    chatboxTextarea.focus()
  }

  const insertAt = (string, substring, position) =>
    `${string.slice(0, position)}${substring}${string.slice(position)}`

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

  const isMobileOrTablet = () => window.innerWidth < 992

  ScrollToBottom(chatMessages)
})
