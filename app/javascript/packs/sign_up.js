document.addEventListener("DOMContentLoaded", () => {
  const timeZoneOffset = - new Date().getTimezoneOffset() / 60
  document.querySelector('#time_zone_offset').value = timeZoneOffset
});
