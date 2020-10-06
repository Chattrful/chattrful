import SmileysAndPeople from '../emojis/smileys_and_people'
import AnimalsAndNature from '../emojis/animals_and_nature'
import FoodAndDrink from '../emojis/food_and_drink'
import Activity from '../emojis/activity'
import TravelAndPlaces from '../emojis/travel_and_places'
import Objects from '../emojis/objects'
import Symbols from '../emojis/symbols'
import Flags from '../emojis/flags'
import { debounce } from "debounce";
import ScrollToBottom from './scroll_to_bottom'
import fuzzysort from 'fuzzysort'

// require 'open-uri'
// doc = Nokogiri::HTML(URI.open("https://emojipedia.org/flags"))
// arr = []
// doc.at_css('.emoji-list').children.each do |x|
//   name = x.children.css('a > text()').text
//   emoji = x.children.at_css('.emoji')&.text

//   if name.present? && emoji.present?
//     arr << {
//       name: name.squish,
//       emoji: emoji
//     }
//   end
// end


// class EmojiPicker {
//   constructor() {
//     this.emojiList = document.querySelector('.emojis__list')
//     this.searchInput = document.querySelector('.emojis__search-input')
//     this.
//     this.init()
//   }

//   init() {
//     document.addEventListener('turbolinks:load', () => {

//     })
//   }
// }

document.addEventListener('turbolinks:load', () => {
  const emojiSearchArray = []

  const emojisList = document.querySelector('.emojis__list')

  const emojiCategories = [
    {
      name: 'Smileys & People',
      emojis: SmileysAndPeople.emojis
    },
    {
      name: 'Animals & Nature',
      emojis: AnimalsAndNature.emojis
    },
    {
      name: 'Food & Drink',
      emojis: FoodAndDrink.emojis
    },
    {
      name: 'Activity',
      emojis: Activity.emojis
    },
    {
      name: 'Travel & Places',
      emojis: TravelAndPlaces.emojis
    },
    {
      name: 'Objects',
      emojis: Objects.emojis
    },
    {
      name: 'Symbols',
      emojis: Symbols.emojis
    },
    {
      name: 'Flags',
      emojis: Flags.emojis
    }
  ]

  emojiCategories.map(emojiCategory => {
    let categoryName = emojiCategory.name
    let emojis = emojiCategory.emojis

    let emojiCategoryName = document.createElement('h6')
    emojiCategoryName.className = 'emojis__category-name'
    emojiCategoryName.innerText = categoryName

    emojisList.appendChild(emojiCategoryName)

    emojis.map(emojiData => {
      let emoji = document.createElement('button')
      emoji.className = 'emojis__button'
      emoji.type = 'button'
      emoji.innerText = emojiData.emoji
      emoji.title = emojiData.name
      emojisList.appendChild(emoji)
      emojiSearchArray.push(emojiData.name)
    })
  })

  const searchEmoji = () => {
    let searchTerm = document.querySelector('.emojis__search-input').value.toUpperCase()
    let emojiButtons = document.querySelectorAll('.emojis__button')
    let emojiCategoryNames = document.querySelectorAll('.emojis__category-name')

    if (searchTerm.length > 0) {
      let options = {
        threshold: -10000, // Don't return matches worse than this (higher is faster)
        limit: 100, // Don't return more results than this (lower is faster)
        allowTypo: false, // Allwos a snigle transpoes (false is faster)

        key: null, // For when targets are objects (see its example usage)
        keys: null, // For when targets are objects (see its example usage)
        scoreFn: null // For use with `keys` (see its example usage)
      }

      let results = fuzzysort.go(searchTerm, emojiSearchArray, options)
      let resultsArray = results.map(result => result.target)

      for (let i = 0; i < emojiCategoryNames.length; i++) {
        emojiCategoryNames[i].style.display = 'none'
      }

      for (let i = 0; i < emojiButtons.length; i++) {
        let emojiButton = emojiButtons[i]
        let title = emojiButton.title

        if (resultsArray.includes(title)) {
          emojiButton.style.display = ''
        } else {
          emojiButton.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < emojiButtons.length; i++) {
        emojiButtons[i].style.display = ''
      }

      for (let i = 0; i < emojiCategoryNames.length; i++) {
        emojiCategoryNames[i].style.display = ''
      }
    }
  }

  const emojiSearchInput = document.querySelector('.emojis__search-input')

  const chatMessages = document.querySelector('.js-chat-messages')

  emojiSearchInput.addEventListener('focus', event => {
    if (chatMessages.scrollHeight - chatMessages.scrollTop === chatMessages.clientHeight) {
      ScrollToBottom(chatMessages)
      setTimeout(() => {
        ScrollToBottom(chatMessages)
      }, 250);
    }
  })

  emojiSearchInput.onkeydown = debounce(searchEmoji, 500)
})
