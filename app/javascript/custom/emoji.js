import SmileysAndPeople from '../emojis/smileys_and_people'
import AnimalsAndNature from '../emojis/animals_and_nature'
import FoodAndDrink from '../emojis/food_and_drink'
import Activity from '../emojis/activity'
import TravelAndPlaces from '../emojis/travel_and_places'
import Objects from '../emojis/objects'
import Symbols from '../emojis/symbols'
import Flags from '../emojis/flags'

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
  const emojiContainer = document.querySelector('.emojis')

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

    let emojiCategoryContainer = document.createElement('div')
    emojiCategoryContainer.className = 'emojis__category'

    let emojiCategoryName = document.createElement('h6')
    emojiCategoryName.className = 'emojis__category-name'
    emojiCategoryName.innerText = categoryName

    emojiCategoryContainer.appendChild(emojiCategoryName)

    emojis.map(emojiData => {
      let emoji = document.createElement('button')
      emoji.className = 'emojis__button'
      emoji.type = 'button'
      emoji.innerText = emojiData.emoji
      emoji.title = emojiData.name
      emojiCategoryContainer.appendChild(emoji)
    })

    emojiContainer.appendChild(emojiCategoryContainer)
  })
})
