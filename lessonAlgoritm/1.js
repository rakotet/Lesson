function one(s) {
  let string = ''

  for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 3; j++) {
      string += s + ' '
    }

    string += '\n'
  }

  console.log(string);
}

//one('8')

//////////////////////////////

function one2() {
  let string = ''

  for(let i = 1; i <= 7; i++) {
    for(let j = 0; j < 5; j++) {
      string += i + ' '
    }
    string += '\n'
  }

  console.log(string);
}

//one2()

///////////////////////

function one3() {
  let string = ''

  for(let i = 10; i <= 80; i += 10) {
    for(let j = 0; j < 4; j++) {
      string += i + ' '
    }

    string += '\n'
  }

  console.log(string);
}

//one3()

/////////////////////////

function one4() {
  let string = ''

  for(let i = 0; i < 5; i++) {
    for(let j = 2; j <= 20; j++) {
      string += j + ' '
    }

    string += '\n'
  }

  console.log(string)
}

//one4()

/////////////////////////

function one5() {
  let string = ''

  for(let i = 0; i < 4; i++) {
    for(let j = 15; j >= 3; j--) {
      string += j + ' '
    }

    string += '\n'
  }

  console.log(string)
}

//one5()

/////////////////////////

function one6() {
  let string = ''

  for(let i = 0, w = 6; i < 5; i++, w--) {
    for(let j = 0; j < w; j++) {
      string += '0 '
    }

    string += '\n'
  }

  console.log(string)
}

//one6()

/////////////////////////

function one7(nubmer) {
  let string = ''

  for(let i = 0, w = 0; i < nubmer; i++, w++) {
    for(let j = nubmer; j > w; j--) {
      string += j + ' '
    }

    string += '\n'
  }

  console.log(string)
}

//one7(8)

/////////////////////////

