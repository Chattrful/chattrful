require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import autosize from 'autosize';
import { EmojiButton } from '@joeattardi/emoji-button';
import Rails from "@rails/ujs"

Rails.start()

document.addEventListener("turbolinks:load", () => {
  const chatboxTextarea = document.querySelector('.js-chatbox');
  autosize(chatboxTextarea);

  chatboxTextarea.addEventListener('keypress', event => {
    // When enter or space is pressed
    if (event.keyCode == 32 || event.keyCode == 13) {
      if (event.target.value.length < 1) {
        event.preventDefault();
        return;
      }
    }

    // When enter is pressed
    if (event.keyCode == 13) {
      // If shift is pressed, don't submit
      if (!isMobileOrTablet() && !event.shiftKey) {
        handleSubmit();
        event.preventDefault();
      }
    }
  });

  chatboxTextarea.addEventListener('blur', event => {
    event.target.dataset.selectionStart = event.target.selectionStart;
  });

  const chatboxSubmitButton = document.querySelector('.js-chatbox-submit');
  chatboxSubmitButton.addEventListener('click', event => {
    handleSubmit();
  });

  const emojiPicker = new EmojiButton({
    showPreview: false,
    emojiSize: '25px',
    emojisPerRow: 9,
    showRecents: false
  });
  const emojiTrigger = document.querySelector('.js-emoji-trigger');

  emojiPicker.on('emoji', selection => {
    const chatboxTextarea = document.querySelector('.js-chatbox');

    const content = chatboxTextarea.value;
    const emoji = selection.emoji;
    const position = parseInt(chatboxTextarea.dataset.selectionStart);

    const newContent = insertAt(content, emoji, position);

    chatboxTextarea.value = newContent;

    setTimeout(() => {
      chatboxTextarea.focus();
      chatboxTextarea.selectionEnd = position + emoji.length
    }, 250);
  });

  emojiTrigger.addEventListener('click', () => emojiPicker.togglePicker(emojiTrigger));

  const handleSubmit = () => {
    const chatboxTextarea = document.querySelector('.js-chatbox');
    const content = chatboxTextarea.value.trim();

    if (content.length > 0) {
      appendContent(content);
      Rails.fire(document.querySelector('.js-chatbox-form'), 'submit');
      chatboxTextarea.value = '';
      chatboxTextarea.style.height = 'initial';
      scrollToBottom();
    } else {
      event.preventDefault();
    }

    chatboxTextarea.focus();
  };

  const insertAt = (string, substring, position) => `${string.slice(0, position)}${substring}${string.slice(position)}`;

  const appendContent = (content) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-messages__item chat-messages__item--mine';

    const chatMessageText = document.createElement('div');
    chatMessageText.className = 'chat-messages__item-text';
    chatMessageText.innerText = content;

    chatMessage.appendChild(chatMessageText);

    document.querySelector('.js-chat-messages').appendChild(chatMessage);
  };


  const scrollToBottom = () => {
    const chatMessages = document.querySelector('.js-chat-messages');

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  const isMobileOrTablet = () => window.innerWidth < 992;

  scrollToBottom();
})
