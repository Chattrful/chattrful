document.addEventListener("turbolinks:load", function() {
  const timeZoneOffsetInput = document.querySelector('#time_zone_offset')

  if (timeZoneOffsetInput) {
    const timeZoneOffset = - new Date().getTimezoneOffset() / 60
    timeZoneOffsetInput.value = timeZoneOffset
  }
})
