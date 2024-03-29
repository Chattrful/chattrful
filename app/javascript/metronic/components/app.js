'use strict'

import KTUtil from 'metronic/components/util'

// Component Definition
var KTApp = (function () {
  /** @type {object} colors State colors **/
  var settings = {}

  var initTooltip = function (el) {
    var theme = el.data('theme') ? 'tooltip-' + el.data('theme') : ''
    var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : ''
    var trigger = el.data('trigger') ? el.data('trigger') : 'hover'

    $(el).tooltip({
      trigger: trigger,
      template:
        '<div class="tooltip ' +
        theme +
        ' ' +
        width +
        '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
    })
  }

  var initTooltips = function () {
    // init bootstrap tooltips
    $('[data-toggle="tooltip"]').each(function () {
      initTooltip($(this))
    })
  }

  var initPopover = function (el) {
    var skin = el.data('skin') ? 'popover-' + el.data('skin') : ''
    var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover'

    el.popover({
      trigger: triggerValue,
      template:
        '\
            <div class="popover ' +
        skin +
        '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
    })
  }

  var initPopovers = function () {
    // init bootstrap popover
    $('[data-toggle="popover"]').each(function () {
      initPopover($(this))
    })
  }

  var initFileInput = function () {
    // init bootstrap popover
    $('.custom-file-input').on('change', function () {
      var fileName = $(this).val()
      $(this)
        .next('.custom-file-label')
        .addClass('selected')
        .html(fileName)
    })
  }

  var initScroll = function () {
    $('[data-perfect-scrollbar="true"]').each(function () {
      var el = $(this)

      KTUtil.scrollInit(this, {
        mobileNativeScroll: true,
        handleWindowResize: true,
        rememberPosition: el.data('remember-position') == 'true' ? true : false
      })
    })
  }

  var initAlerts = function () {
    // init bootstrap popover
    $('body').on('click', '[data-close=alert]', function () {
      $(this)
        .closest('.alert')
        .hide()
    })
  }

  var initCard = function (el, options) {
    // init card tools
    var el = $(el)
    var card = new KTCard(el[0], options)
  }

  var initCards = function () {
    // init card tools
    $('[data-card="true"]').each(function () {
      var el = $(this)
      var options = {}

      if (el.data('data-card-initialized') !== true) {
        initCard(el, options)
        el.data('data-card-initialized', true)
      }
    })
  }

  var initStickyCard = function () {
    if (typeof Sticky === 'undefined') {
      return
    }

    var sticky = new Sticky('[data-sticky="true"]')
  }

  var initAbsoluteDropdown = function (context) {
    var dropdownMenu

    if (!context) {
      return
    }

    $('body')
      .on('show.bs.dropdown', context, function (e) {
        dropdownMenu = $(e.target).find('.dropdown-menu')
        $('body').append(dropdownMenu.detach())
        dropdownMenu.css('display', 'block')
        dropdownMenu.position({
          my: 'right top',
          at: 'right bottom',
          of: $(e.relatedTarget)
        })
      })
      .on('hide.bs.dropdown', context, function (e) {
        $(e.target).append(dropdownMenu.detach())
        dropdownMenu.hide()
      })
  }

  var initAbsoluteDropdowns = function () {
    $('body').on('show.bs.dropdown', function (e) {
      // e.target is always parent (contains toggler and menu)
      var $toggler = $(e.target).find("[data-attach='body']")
      if ($toggler.length === 0) {
        return
      }
      var $dropdownMenu = $(e.target).find('.dropdown-menu')
      // save detached menu
      var $detachedDropdownMenu = $dropdownMenu.detach()
      // save reference to detached menu inside data of toggler
      $toggler.data('dropdown-menu', $detachedDropdownMenu)

      $('body').append($detachedDropdownMenu)
      $detachedDropdownMenu.css('display', 'block')
      $detachedDropdownMenu.position({
        my: 'right top',
        at: 'right bottom',
        of: $(e.relatedTarget)
      })
    })

    $('body').on('hide.bs.dropdown', function (e) {
      var $toggler = $(e.target).find("[data-attach='body']")
      if ($toggler.length === 0) {
        return
      }
      // access to reference of detached menu from data of toggler
      var $detachedDropdownMenu = $toggler.data('dropdown-menu')
      // re-append detached menu inside parent
      $(e.target).append($detachedDropdownMenu.detach())
      // hide dropdown
      $detachedDropdownMenu.hide()
    })
  }

  return {
    init: function (settingsArray) {
      if (settingsArray) {
        settings = settingsArray
      }

      KTApp.initComponents()
    },

    initComponents: function () {
      initScroll()
      initTooltips()
      initPopovers()
      initAlerts()
      initFileInput()
      initCards()
      initStickyCard()
      initAbsoluteDropdowns()
    },

    initTooltips: function () {
      initTooltips()
    },

    initTooltip: function (el) {
      initTooltip(el)
    },

    initPopovers: function () {
      initPopovers()
    },

    initPopover: function (el) {
      initPopover(el)
    },

    initCard: function (el, options) {
      initCard(el, options)
    },

    initCards: function () {
      initCards()
    },

    initSticky: function () {
      initSticky()
    },

    initAbsoluteDropdown: function (context) {
      initAbsoluteDropdown(context)
    },

    block: function (target, options) {
      var el = $(target)

      options = $.extend(
        true,
        {
          opacity: 0.05,
          overlayColor: '#000000',
          type: '',
          size: '',
          state: 'primary',
          centerX: true,
          centerY: true,
          message: '',
          shadow: true,
          width: 'auto'
        },
        options
      )

      var html
      var version = options.type ? 'spinner-' + options.type : ''
      var state = options.state ? 'spinner-' + options.state : ''
      var size = options.size ? 'spinner-' + options.size : ''
      var spinner =
        '<span class="spinner ' +
        version +
        ' ' +
        state +
        ' ' +
        size +
        '"></span'

      if (options.message && options.message.length > 0) {
        var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '')

        html =
          '<div class="' +
          classes +
          '"><span>' +
          options.message +
          '</span>' +
          spinner +
          '</div>'

        var el = document.createElement('div')

        $('body').prepend(el)
        KTUtil.addClass(el, classes)
        el.innerHTML = html
        options.width = KTUtil.actualWidth(el) + 10
        KTUtil.remove(el)

        if (target == 'body') {
          html =
            '<div class="' +
            classes +
            '" style="margin-left:-' +
            options.width / 2 +
            'px;"><span>' +
            options.message +
            '</span><span>' +
            spinner +
            '</span></div>'
        }
      } else {
        html = spinner
      }

      var params = {
        message: html,
        centerY: options.centerY,
        centerX: options.centerX,
        css: {
          top: '30%',
          left: '50%',
          border: '0',
          padding: '0',
          backgroundColor: 'none',
          width: options.width
        },
        overlayCSS: {
          backgroundColor: options.overlayColor,
          opacity: options.opacity,
          cursor: 'wait',
          zIndex: target == 'body' ? 1100 : 10
        },
        onUnblock: function () {
          if (el && el[0]) {
            KTUtil.css(el[0], 'position', '')
            KTUtil.css(el[0], 'zoom', '')
          }
        }
      }

      if (target == 'body') {
        params.css.top = '50%'
        $.blockUI(params)
      } else {
        var el = $(target)
        el.block(params)
      }
    },

    unblock: function (target) {
      if (target && target != 'body') {
        $(target).unblock()
      } else {
        $.unblockUI()
      }
    },

    blockPage: function (options) {
      return KTApp.block('body', options)
    },

    unblockPage: function () {
      return KTApp.unblock('body')
    },

    getSettings: function () {
      return settings
    }
  }
})()

// Initialize KTApp class on document ready
document.addEventListener('turbolinks:load', function () {
  window.KTAppSettings = {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400
    },
    colors: {
      theme: {
        base: {
          white: '#ffffff',
          primary: '#3699FF',
          secondary: '#E5EAEE',
          success: '#1BC5BD',
          info: '#8950FC',
          warning: '#FFA800',
          danger: '#F64E60',
          light: '#E4E6EF',
          dark: '#181C32'
        },
        light: {
          white: '#ffffff',
          primary: '#E1F0FF',
          secondary: '#EBEDF3',
          success: '#C9F7F5',
          info: '#EEE5FF',
          warning: '#FFF4DE',
          danger: '#FFE2E5',
          light: '#F3F6F9',
          dark: '#D6D6E0'
        },
        inverse: {
          white: '#ffffff',
          primary: '#ffffff',
          secondary: '#3F4254',
          success: '#ffffff',
          info: '#ffffff',
          warning: '#ffffff',
          danger: '#ffffff',
          light: '#464E5F',
          dark: '#ffffff'
        }
      },
      gray: {
        'gray-100': '#F3F6F9',
        'gray-200': '#EBEDF3',
        'gray-300': '#E4E6EF',
        'gray-400': '#D1D3E0',
        'gray-500': '#B5B5C3',
        'gray-600': '#7E8299',
        'gray-700': '#5E6278',
        'gray-800': '#3F4254',
        'gray-900': '#181C32'
      }
    },
    'font-family': 'Poppins'
  }

  KTApp.init(KTAppSettings)
})
