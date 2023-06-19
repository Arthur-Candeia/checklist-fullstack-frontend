export function eyeClick() {
  const input = document.querySelector('#password')
  const visible = document.querySelector('.visible')
  const invisible = document.querySelector('.invisible')

  if (visible.style.visibility != 'hidden') {
    input.setAttribute('type', 'text')
    visible.style.visibility = 'hidden'
    invisible.style.visibility = 'visible'
  }
  else {
    input.setAttribute('type', 'password')
    visible.style.visibility = 'visible'
    invisible.style.visibility = 'hidden'
  }
}