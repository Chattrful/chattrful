import { format } from 'date-fns'

var Timestamp = (function () {
  return {
    current: function() {
      return format(new Date(), 'hh:mm a')
    }
  }
})()

export default Timestamp
