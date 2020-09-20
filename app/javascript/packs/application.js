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
import PerfectScrollbar from 'perfect-scrollbar';

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require('metronic/components/app');
require('metronic/layout/initialize');

$(document).ready(function() {
  autosize($('.js-chatbox'));

  $('.js-chatbox').on('keypress', function(event) {
    var val = $(this).val();

    if (event.keyCode == 32 || event.keyCode == 13) {
      if (val.length < 1) {
        event.preventDefault();
        return;
      }
    }

    if (event.keyCode == 13) {
      if (!event.shiftKey) {
        handleSubmit(val);
        event.preventDefault()
      }
    }
  });

  const handleSubmit = (message) => {
    console.log(message);
    $('.js-chatbox').val('');
    $('.js-chatbox').css('height', 'initial');
  }
})
