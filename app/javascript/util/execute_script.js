export default function ExecuteScript ({text}) {
  let script = document.createElement('script');
  let scriptText = document.createTextNode(text);
  script.appendChild(scriptText);
  document.body.appendChild(script);
  script.remove()
}
