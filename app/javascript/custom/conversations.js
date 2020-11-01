document.addEventListener("turbolinks:load", () => {
  const conversationLists = document.querySelectorAll('.conversation-list__item')

  conversationLists.forEach(conversationList => {
    conversationList.addEventListener('click', event => {
      document.querySelectorAll('.conversation-list__item').forEach(conversationList => {
        conversationList.classList.remove('conversation-list__item--active');
      })

      event.currentTarget.classList.add('conversation-list__item--active')
    })
  });
})
