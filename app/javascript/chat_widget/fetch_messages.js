import DOMHelper from 'util/dom_helper'
import DateTimeHelper from 'util/date_time_helper'
import startOfDay from 'date-fns/startOfDay'
import add from 'date-fns/add'
import isWithinInterval from 'date-fns/isWithinInterval'
import endOfDay from 'date-fns/endOfDay'
import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'

const createSpinner = () => {
  const chatMessages = document.querySelector('.js-chat-messages')

  DOMHelper.prepend({
    parent: chatMessages,
    html: '<div class="chat-messages__scrolling-spinner"><div class="spinner"></div></div>'
  })
}

const getFormattedDate = ({timestamp, withinRangeStart, withinRangeEnd}) => {
  const formattedTimestamp = startOfDay(timestamp)

  if (isToday(formattedTimestamp)) {
    return 'Today'
  } else if (isYesterday(formattedTimestamp)) {
    return 'Yesterday'
  } else if (isWithinInterval(formattedTimestamp, { start: withinRangeStart, end: withinRangeEnd })) {
    return DateTimeHelper.formatDayOfWeek(formattedTimestamp)
  } else {
    return DateTimeHelper.formatDate(formattedTimestamp)
  }
}

const FetchMessages = (function () {
  return {
    fetch: function({lastMessageId} = {}) {
      createSpinner()
      const chatMessages = document.querySelector('.js-chat-messages')
      const url = lastMessageId ? `${chatMessages.dataset.url}?last_message_id=${lastMessageId}` : chatMessages.dataset.url

      return fetch(
        url
      )
    },

    handleResponse: function(data) {
      const today = startOfDay(new Date())
      const withinRangeStart = startOfDay(add(today, { days: -6 }))
      const withinRangeEnd = endOfDay(add(today, { days: -2 }))
      const chatMessages = document.querySelector('.js-chat-messages')
      const identifier = document.querySelector('.js-page-data').dataset.identifier

      document.querySelector('.chat-messages__scrolling-spinner').remove()

      if (data.html.trim().length > 0) {
        var tempHTML = document.createElement('div')
        tempHTML.innerHTML = data.html
        Array.from(tempHTML.children).forEach(message => {
          if (message.dataset.messageSender == identifier) {
            message.classList.add('chat-messages__item--mine')
          }
          const messageTimestamp = message.querySelector('.chat-messages__item-timestamp')
          const timestamp = DateTimeHelper.fromUnix(message.dataset.messageTimestamp)
          messageTimestamp.innerHTML = DateTimeHelper.formatTimestamp(timestamp)

          const date = getFormattedDate({
            timestamp: timestamp,
            withinRangeStart: withinRangeStart,
            withinRangeEnd: withinRangeEnd
          })

          let dateElement = document.querySelector(`[data-date="${date}"]`)

          if (!dateElement) {
            let dateHTML = `<div data-date="${date}" class="chat-messages__date"><span class="label label-inline">${date}</span></div>`
            DOMHelper.prepend({ parent: chatMessages, html: dateHTML })
            dateElement = document.querySelector(`[data-date="${date}"]`)
          }

          chatMessages.insertBefore(message, dateElement.nextSibling)
        })

        chatMessages.dataset.lastMessageId = data.last_message_id
      } else {
        chatMessages.dataset.scroll = false
      }

      if (data.previous_last_message_id) {
        if (chatMessages.scrollTop == 0) {
          document.querySelector(`[data-message-id="${data.previous_last_message_id}"]`).scrollIntoView()
        }
      } else {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  }
})()

export default FetchMessages
