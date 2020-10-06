import SmileysAndPeople from '../emojis/smileys_and_people'
import AnimalsAndNature from '../emojis/animals_and_nature'
import FoodAndDrink from '../emojis/food_and_drink'
import Activity from '../emojis/activity'
import TravelAndPlaces from '../emojis/travel_and_places'
import Objects from '../emojis/objects'
import Symbols from '../emojis/symbols'
import Flags from '../emojis/flags'
import { debounce } from "debounce";
import fuzzysort from 'fuzzysort'

const insertAt = (string, substring, position) =>
  `${string.slice(0, position)}${substring}${string.slice(position)}`

class EmojiPicker {
  constructor() {
    this.root = document.querySelector('.emojis')
    this.list = document.querySelector('.emojis__list')
    this.searchInput = document.querySelector('.emojis__search-input')
    this.chatboxTextarea = document.querySelector('.js-chatbox')
    this.searchArray = []
    this.buttons = []
    this.categoryNames = []
    this.trigger = document.querySelector('.js-emoji-trigger')
    this.init()
  }

  init() {
    let emojisData = [
      SmileysAndPeople,
      AnimalsAndNature,
      FoodAndDrink,
      Activity,
      TravelAndPlaces,
      Objects,
      Symbols,
      Flags
    ]

    emojisData.map(emojiData => {
      let name = emojiData.name
      let emojis = emojiData.emojis

      let categoryName = document.createElement('h6')
      categoryName.className = 'emojis__category-name'
      categoryName.innerText = name

      this.list.appendChild(categoryName)

      emojis.map(emoji => {
        let button = document.createElement('button')
        let name = emoji.name
        button.className = 'emojis__button'
        button.type = 'button'
        button.innerText = emoji.emoji
        button.title = name
        button.tabIndex = '-1'
        button.addEventListener('click', this.insertEmoji.bind(this))
        this.list.appendChild(button)
        this.searchArray.push(name)
      })
    })

    this.searchInput.onkeydown = debounce(this.search.bind(this), 500)
    this.buttons = document.querySelectorAll('.emojis__button')
    this.categoryNames = document.querySelectorAll('.emojis__category-name')
  }

  insertEmoji() {
    let content = this.chatboxTextarea.value;
    let emoji = event.target.innerText;
    let position = parseInt(this.chatboxTextarea.dataset.selectionStart);
    let newContent = insertAt(content, emoji, position);

    this.chatboxTextarea.value = newContent;
    this.chatboxTextarea.focus();
    this.chatboxTextarea.setSelectionRange(position + emoji.length, position + emoji.length)
  }

  open() {
    this.root.classList.add('emojis--open')
    this.list.scrollTop = 0;

    if (this.searchInput.value.length > 0) {
      this.resetSearch()
    }
  }

  close() {
    this.root.classList.remove('emojis--open')
  }

  resetSearch() {
    this.searchInput.value = ''
    this.displayButtons(true)
    this.displayCategoryNames(true)
  }

  search() {
    let term = document.querySelector('.emojis__search-input').value

    if (term.length > 0) {
      let options = {
        threshold: -10000, // Don't return matches worse than this (higher is faster)
        limit: 100, // Don't return more results than this (lower is faster)
        allowTypo: false, // Allwos a snigle transpoes (false is faster)
        key: null, // For when targets are objects (see its example usage)
        keys: null, // For when targets are objects (see its example usage)
        scoreFn: null // For use with `keys` (see its example usage)
      }

      let results = fuzzysort.go(term, this.searchArray, options)
      let matchedNames = results.map(result => result.target)

      this.displayCategoryNames(false)

      for (let i = 0; i < this.buttons.length; i++) {
        let button = this.buttons[i]
        let title = button.title

        this.displayButton({
          button: button,
          boolean: matchedNames.includes(title)
        })
      }
    } else {
      this.displayCategoryNames(true)
      this.displayButtons(true)
    }
  }

  displayCategoryNames(boolean) {
    for (let i = 0; i < this.categoryNames.length; i++) {
      this.categoryNames[i].style.display = boolean ? '' : 'none'
    }
  }

  displayButton({button, boolean} = {}) {
    button.style.display = boolean ? '' : 'none'
  }

  displayButtons(boolean) {
    for (let i = 0; i < this.buttons.length; i++) {
      this.displayButton({
        button: this.buttons[i],
        boolean: boolean}
      )
    }
  }
}

export default EmojiPicker
