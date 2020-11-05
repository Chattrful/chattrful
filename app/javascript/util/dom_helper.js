var DOMHelper = (function () {
  return {
    append: function({parent, html}) {
      const tempHTML = document.createElement('div')
      tempHTML.innerHTML = html
      Array.from(tempHTML.children).forEach(node => parent.append(node))
    },
    prepend: function({parent, html}) {
      const tempHTML = document.createElement('div')
      tempHTML.innerHTML = html
      Array.from(tempHTML.children).forEach(node => parent.prepend(node))
    }
  }
})()

export default DOMHelper
