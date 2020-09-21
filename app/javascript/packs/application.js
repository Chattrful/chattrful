// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'bootstrap';
import autosize from 'autosize';

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require('metronic/components/app');
require('metronic/layout/initialize');
import { EmojiButton } from '@joeattardi/emoji-button';

$(document).ready(function() {
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
      if (!event.shiftKey) {
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

  const emojiPicker = new EmojiButton();
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
    const content = chatboxTextarea.value;

    if (content.length > 0) {
      appendContent(content);
      chatboxTextarea.value = '';
      chatboxTextarea.style.height = 'initial';
    } else {
      event.preventDefault();
    }
  }

  const insertAt = (string, substring, position) => `${string.slice(0, position)}${substring}${string.slice(position)}`;

  const appendContent = (content) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat__message chat__message--mine';

    const chatMessageText = document.createElement('div');
    chatMessageText.className = 'chat__message-text';
    chatMessageText.innerText = content;

    chatMessage.appendChild(chatMessageText);

    document.querySelector('.card-body').appendChild(chatMessage);
  }
})
