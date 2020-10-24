export default function InitVisitorAccount () {
  const chattrfulSession = localStorage.getItem('chattrful_session')
  const splittedUrl = window.location.href.split('/')
  const visitorAccountId = splittedUrl[splittedUrl.length - 1]
  const timeZoneOffset = - new Date().getTimezoneOffset() / 60

  return fetch(
    `/ajax/visitor/accounts/${visitorAccountId}?chattrful_session=${chattrfulSession}&time_zone_offset=${timeZoneOffset}`,
    { method: 'POST' }
  )
}
