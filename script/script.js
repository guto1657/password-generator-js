const rangeValue = document.querySelector('#rangeNumber')
const rangefield = document.querySelector('#rangeField')
const btn = document.getElementById('btn')
const clipboard = document.getElementById('clipboard')

function handleInputChange(e){
  const target = e.target
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

  rangeValue.innerHTML = rangefield.value
}

function handleNewPassword() {
  const selectedBoxes = document.getElementsByClassName('checkboxField')
  const charactersRange = document.getElementById('rangeNumber').innerHTML
  let charset = ''
  let newPassword = ''

  if(charactersRange <= 0) {
    return
  }

  for(let i = 0; i < selectedBoxes.length; i++) {
    if(selectedBoxes[i].checked === true) {
      if(selectedBoxes[i].value === 'uppercase') {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }

      if(selectedBoxes[i].value === 'lowercase') {
        charset += 'abcdefghijklmnopqrstuvwxyz'
      }

      if(selectedBoxes[i].value === 'numbers') {
        charset += '1234567890'
      }

      if(selectedBoxes[i].value === 'symbols') {
        charset += '$@#&!'
      }
    }
  }
  console.log(charset)

  for(let i = 0, n = charset.length; i < charactersRange; ++i) {
    newPassword += charset.charAt(Math.floor(Math.random() * n))
  }

  document.querySelector('#password').value = newPassword

  checkPasswordStrength(newPassword)
}

function checkPasswordStrength(password) {
  const columns = document.getElementsByClassName('column')
  let color = ''
  let strength = 0;

  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }

  console.log(strength)

  switch(strength) {
    case 1: {
      color = 'rgb(246, 74, 74)'
      break;
    }
    case 2: {
      color = 'rgb(251, 124, 88)'  
      break;
    }
    case 3: {
      color = 'rgb(248, 205, 101)'
      break;
    }
    case 4: {
      color = 'rgb(164, 255, 175)'
      break;
    }
    default: {
      color = 'transparent'
    }
  }

  
  for(let i = 0; i < columns.length; i++) {
    columns[i].style.background = 'transparent'
  }

  for(let i = 0; i < strength; i++) {
    columns[i].style.background = color
  }
}



function copyPassword() {
  password.select()
  password.setSelectionRange(0,99999)

  navigator.clipboard.writeText(password.value)
}

btn.addEventListener('click', handleNewPassword)
rangefield.addEventListener('input', handleInputChange)
clipboard.addEventListener('click',copyPassword)