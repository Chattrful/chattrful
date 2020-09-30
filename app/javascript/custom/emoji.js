import SmileysAndPeople from '../emojis/smileys_and_people';

console.log(SmileysAndPeople)

document.addEventListener("turbolinks:load", () => {

  const emojiContainer = document.querySelector('.emojis')

  SmileysAndPeople.emojis.map(emojiData => {
    let emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.innerText = emojiData.emoji
    emoji.title = emojiData.name
    emojiContainer.appendChild(emoji);
  })

  // document.querySelector('body').appendChild(emojiContainer);
})
