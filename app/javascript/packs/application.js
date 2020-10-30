// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('turbolinks').start()

import 'bootstrap'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require('./chat_widget')
require('metronic/components/app')
require('metronic/layout/initialize')

document.addEventListener("DOMContentLoaded", () => {
  const $flashMessage = $(".flash-message")
  let delay

  if (parseInt($flashMessage.data('wordCount')) > 8) {
    delay = 10000
  } else {
    delay = 6000
  }

  setTimeout(() => {
    $(".flash-message").alert('close')
  }, delay);
})
