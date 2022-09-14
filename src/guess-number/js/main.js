function reset() {
  for (var i = 0; i < numbers.length; i++) {
    numbers[i] = {
      value: '',
      selected: i === 0
    }
  }
  records = []
  generateTarget()
}

var inputs = []
for (var i = 0; i < 10; i++) {
  inputs.push(i)
}
var numbers = []
var target = []
for (var i = 0; i < 4; i++) {
  numbers.push({
    value: '',
    selected: i === 0
  })
  target.push(null)
}

var records = []


function selectNumber(index) {
  for (var i = 0; i < numbers.length; i++) {
    numbers[i].selected = i === index
  }
  renderNumbers()
}

function input(number) {
  console.log(number)
  var index = -1
  for (var i = 0; i < numbers.length; i++) {
    var n = numbers[i]
    if (n.selected) {
      index = i
      n.value = number
    } else if (n.value === number) {
      n.value = ''
    }
  }

  // var nextIndex = -1

  // for (var i = 0; i < numbers.length; i++) {
  //   if (numbers[i].value === '' && i > index) {
  //     nextIndex = i
  //     break
  //   }
  // }
  // if (nextIndex < 0) {
  // }
  nextIndex = (index + 1) % 4
  selectNumber(nextIndex)
}

function renderNumbers() {
  var tds = document.getElementById('number-row').children
  var allNumbersSet = true
  for (var i = 0; i < numbers.length; i++) {
    n = numbers[i]
    td = tds[i]
    td.innerHTML = n.value
    td.setAttribute('class', n.selected ? 'selected' : '')
    if (n.value === '') {
      allNumbersSet = false
    }
  }
  var button = document.getElementById('submit')
  if (allNumbersSet && !isGoal()) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', 'disabled')
  }
}

function generateInputsControls() {
  var row = document.getElementById('input-row')
  for (var i = 0; i < inputs.length; i++) {
    var td = document.createElement('td')
    td.innerHTML = inputs[i]
    td.onclick = function(j) {
      return function () {
        input(inputs[j])
      }
    }(i)
    row.appendChild(td)
  }
}

function generateNumberControls() {
  var row = document.getElementById('number-row')
  for (var i = 0; i < numbers.length; i++) {
    var td = document.createElement('td')
    td.onclick = function(j) {
      return function () {
        selectNumber(j)
      }
    }(i)
    row.appendChild(td)
  }
  renderNumbers()
}

function getPureNumbers() {
  var ret = ''
  for (var i = 0; i < numbers.length; i++) {
    ret += numbers[i].value
  }
  return ret
}

function submitGuess() {
  records.push({
    number: getPureNumbers(),
    result: getCompareResult()
  })
  renderRecords()
  renderNumbers()
  renderResult()
}

function getCompareResult() {
  var a = 0
  var b = 0
  for (var i = 0; i < numbers.length; i++) {
    for (var j = 0; j < target.length; j++) {
      if (numbers[i].value === target[j]) {
        if (i === j) {
          a++
        } else {
          b++
        }
      }
    }
  }

  return {
    a: a,
    b: b
  }
}

function setupSubmit() {
  var button = document.getElementById('submit')
  button.onclick = submitGuess
}

function generateTarget() {
  var candidates = inputs.slice()
  for (var i = 0; i < target.length; i++) {
    target[i] = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
  }
  console.log(target)
}

function renderRecords() {
  var root = document.getElementById('history-panel')
  root.innerHTML = ''
  for (var i = 0; i < records.length; i++) {
    var r = records[i]
    var li = document.createElement('li')

    var index = document.createElement('div')
    index.innerHTML = i + 1
    index.setAttribute('class', 'index')
    var num = document.createElement('div')
    num.innerHTML = r.number
    num.setAttribute('class', 'number')
    var result = document.createElement('div')
    result.innerHTML = r.result.a + 'A' + r.result.b + 'B'
    result.setAttribute('class', 'result')

    li.appendChild(index)
    li.appendChild(num)
    li.appendChild(result)
    root.appendChild(li)
  }
}

function isGoal() {
  return records.length > 0 && records[records.length - 1].result.a === 4
}

function renderResult() {
  var result = document.getElementById('result')
  if (isGoal()) {
    result.setAttribute('class', 'goal')
    var stars = document.getElementById('stars')
    var starCount = records.length < 9 ? 3 : (records.length < 18 ? 2 : 1)
    var starText = ''
    for (var i = 0; i < 3; i++) {
      starText += i < starCount ? '★' : '☆'
    }
    stars.innerHTML = starText
  } else {
    result.setAttribute('class', '')
  }
}

function replay() {
  reset()
  renderRecords()
  renderNumbers()
  renderResult()
}

reset()
generateInputsControls()
generateNumberControls()
setupSubmit()