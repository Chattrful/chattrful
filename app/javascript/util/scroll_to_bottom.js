export default function ScrollToBottom ({element, delay}) {
  if (delay) {
    setTimeout(() => {
      element.scrollTop = element.scrollHeight
    }, delay);
  } else {
    element.scrollTop = element.scrollHeight
  }
}
