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

document.addEventListener('turbolinks:load', () => {
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
      emoji.dataset.name = emojiData.name
      emojisList.appendChild(emoji)
    })
  })

  const searchEmoji = () => {
    let searchTerm = document.querySelector('.emojis__search-input').value.toUpperCase()
    let emojiButtons = document.querySelectorAll('.emojis__button')
    let emojiCategoryNames = document.querySelectorAll('.emojis__category-name')

    if (searchTerm.length > 0) {
      for (let i = 0; i < emojiCategoryNames.length; i++) {
        emojiCategoryNames[i].style.display = 'none'
      }

      for (let i = 0; i < emojiButtons.length; i++) {
        let emojiButton = emojiButtons[i]
        let title = emojiButton.title.toUpperCase()

        if (title.indexOf(searchTerm) > -1) {
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
