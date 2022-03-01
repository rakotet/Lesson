// const arr = [5, 8, 1, 6, 0, 2, 9]

// function getArr(arr) {
//   for(let i = 0; i < arr.length; i++) {
//     let min = arr[i]
//     let index = i
//     for(let i2 = i + 1 ; i2 < arr.length; i2++) {
//       if(min > arr[i2]) continue
//       else {
//         min = arr[i2]
//         index = i2
//       }
//       console.log(min)
//     }
//     arr.splice(index, 1)
//     arr.unshift(min)
//     //console.log(arr)
//   }

//   return arr
// }

// console.log(getArr(arr));

const bubbleSort = arr => {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let wasSwap = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
          if (arr[j] < arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              wasSwap = true;
          }
      }
      if (!wasSwap) break;
  }
  return arr;
};

console.log(bubbleSort([5, 8, 1, 6, 0, 2, 9]));