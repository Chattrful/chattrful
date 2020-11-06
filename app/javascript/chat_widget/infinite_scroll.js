import FetchMessages from '../chat_widget/fetch_messages'
import ExecuteScript from '../util/execute_script'

export default class InfiniteScroll {
  constructor() {
    this.chatMessages = document.querySelector('.js-chat-messages')
    this.scrolling = false
    this.init()
  }

  init() {
    this.chatMessages.addEventListener('scroll', async() => {
      if (!this.scrolling && this.chatMessages.scrollTop < 200 && this.chatMessages.dataset.scroll == "true") {
        this.scrolling = true

        const lastMessageId = parseInt(this.chatMessages.dataset.lastMessageId)
        const fetchMessagesResponse = await FetchMessages.fetch({lastMessageId: lastMessageId})
        const data = await fetchMessagesResponse.json()
        FetchMessages.handleResponse(data)

        this.scrolling = false
      }
    })
  }
}
