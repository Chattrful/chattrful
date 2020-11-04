export default function Truncate () {
  const truncates = document.querySelectorAll('.js-truncate')

  truncates.forEach(truncate => {
    const truncateParent = $(truncate).parents(`${truncate.dataset.truncateParent}`)[0]
    const offset = truncateParent.querySelector(truncate.dataset.truncateOffset)
    const style = getComputedStyle(truncateParent)
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const width = truncateParent.offsetWidth
    truncate.style.width = `${width - offset.offsetWidth - padding}px`
  })
}
