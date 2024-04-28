/*
Последовательность Фибоначчи где переменные в массиве это число + n, размер пока не закончится BigInteger
*/

function fibonacciSequence() {
  let n = 1n
  let arr = [n, n];
  for (let i = 2; i < 100; i++) {
    arr.push(arr[i-2] + arr[i-1]);
  }
  
  console.log(arr);
  return Array.of(...arr)[Symbol.iterator]();
}

/*
Найти гипотенузу треугольника
*/

function calculateHypotenuse(a, b) {
  if((a > 0 && b > 0) && (typeof a == 'number') && (typeof b == 'number')) {
    return Number((Math.sqrt(a*a + b*b)).toFixed(3))
  } else {
    throw('throws error')
  } 
}


/*
Крестики нолики
*/

function isSolved(board) {
  let x = 1
  let o = 2
  let noEnd = -1
  let playNo = 0
  let play = false
  let count = 0

  for(let i = 0; i < board.length; i++) {
    if(board[i][0] == x && board[i][1] == x && board[i][2] == x) return x
    if(board[i][0] == o && board[i][1] == o && board[i][2] == o) return o
    
    for(let w = 0; w < board[i].length; w++) {
      if(board[i][w] == 0) play = true
      if(board[i][w] == 1 || board[i][w] == 2) count++
    }
  }

  if((board[0][0] == x && board[1][0] == x && board[2][0] == x) || 
  (board[0][1] == x && board[1][1] == x && board[2][1] == x) || 
  (board[0][2] == x && board[1][2] == x && board[2][2] == x) || 
  (board[0][0] == x && board[1][1] == x && board[2][2] == x) || 
  (board[0][2] == x && board[1][1] == x && board[2][0] == x)) 
  return x
  
  if((board[0][0] == o && board[1][0] == o && board[2][0] == o) || 
  (board[0][1] == o && board[1][1] == o && board[2][1] == o) || 
  (board[0][2] == o && board[1][2] == o && board[2][2] == o) || 
  (board[0][0] == o && board[1][1] == o && board[2][2] == o) || 
  (board[0][2] == o && board[1][1] == o && board[2][0] == o)) 
  return o
  
  if(count == 9) return playNo
  if(play) return noEnd
}

isSolved(
  [[1,2,0],
  [0,1,2],
  [0,0,1]]
)

/*
Переставить символы одной строки что бы получить соответствие втоой строки
*/

function scramble(str1, str2) {
  let obj = {}

  for(let sy of str1) {
    if(obj[sy]) obj[sy]++
    else obj[sy] = 1
  }

  for(let sy of str2) {
    if(!obj[sy] || obj[sy] < 1) return false
    else obj[sy]--
  }

  return true
}

scramble('dinhtuj', 'dntj')



/*

*/