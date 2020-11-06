import { format } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime'

var Timestamp = (function () {
  return {
    current: function() {
      return format(new Date(), 'hh:mm a')
    },

    fromUnix: function(unixTimestamp) {
      return format(fromUnixTime(unixTimestamp), 'hh:mm a')
    }
  }
})()

export default Timestamp
