import { format } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime'

var DateTimeHelper = (function () {
  return {
    fromUnix: function(unixTimestamp) {
      return fromUnixTime(unixTimestamp)
    },

    formatTimestamp: function(date) {
      return format(date, 'hh:mm a')
    },

    formatDate: function(date) {
      return format(date, 'MM/dd/yyyy')
    },

    formatDayOfWeek: function(date) {
      return format(date, 'EEEE')
    }
  }
})()

export default DateTimeHelper
