export default class InfiniteScroll {
  constructor() {
    this.chatMessages = document.querySelector('.js-chat-messages')
    this.scrolling = false
    this.url = this.chatMessages.dataset.url
    this.init()
  }

  init() {
    this.chatMessages.addEventListener('scroll', async() => {
      if (!this.scrolling && this.chatMessages.scrollTop < 200 && this.chatMessages.dataset.scroll == "true" ) {
        this.scrolling = true

        let lastMessageId = this.chatMessages.dataset.lastMessageId

        $.get(`${this.url}?last_message_id=${lastMessageId}`)
          .done(() => {
            this.scrolling = false
          })
      }
    })
  }
}
