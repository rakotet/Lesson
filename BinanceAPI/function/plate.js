module.exports = function plate(book, priceString) {
  let price = Number(priceString.price)

  let n = 0
  let n1 = 0
  let n2 = 0
  let n3 = 0
  let n4 = 0
  let counter = 0
  let arr = []
  let nearestMaxShort = 0
  const percent = 0.03
  
  for(let i = 0; i < book.asks.length; i++) {
    if(Number(book.asks[i][1]) > n && Number(book.asks[i][0]) < (price + (price * percent))) {
      n = Number(book.asks[i][1])
      arr[0] = book.asks[i]
    }
  }

  for(let i = 0; i < book.asks.length; i++) {
    if(Number(book.asks[i][1]) === n) continue;
    if(Number(book.asks[i][1]) > n1 && Number(book.asks[i][0]) < (price + (price * percent))) {
      n1 = Number(book.asks[i][1])
      arr[1] = book.asks[i]
    }
  }

  for(let i = 0; i < book.asks.length; i++) {
    if(Number(book.asks[i][1]) === n || Number(book.asks[i][1]) === n1) continue;
    if(Number(book.asks[i][1]) > n2 && Number(book.asks[i][0]) < (price + (price * percent))) {
      n2 = Number(book.asks[i][1])
      arr[2] = book.asks[i]
    }
  }

  for(let i = 0; i < book.asks.length; i++) {
    if(Number(book.asks[i][1]) === n || Number(book.asks[i][1]) === n1 || Number(book.asks[i][1]) === n2) continue;
    if(Number(book.asks[i][1]) > n3 && Number(book.asks[i][0]) < (price + (price * percent))) {
      n3 = Number(book.asks[i][1])
      arr[3] = book.asks[i]
    }
  }

  for(let i = 0; i < book.asks.length; i++) {
    if(Number(book.asks[i][1]) === n || Number(book.asks[i][1]) === n1 || Number(book.asks[i][1]) === n2 || Number(book.asks[i][1]) === n3) continue;
    if(Number(book.asks[i][1]) > n4 && Number(book.asks[i][0]) < (price + (price * percent))) {
      n4 = Number(book.asks[i][1])
      arr[4] = book.asks[i]
    }
  }
  
  ////////////////////////////////////////////

  let m = 0
  let m1 = 0
  let m2 = 0
  let m3 = 0
  let m4 = 0
  let counter2 = 0
  let arr2 = []
  let nearestMaxShort2 = 0
  
  for(let i = 0; i < book.bids.length; i++) {
    if(Number(book.bids[i][1]) > m && Number(book.bids[i][0]) > (price - (price * percent))) {
      m = Number(book.bids[i][1])
      arr2[0] = book.bids[i]
    }
  }

  for(let i = 0; i < book.bids.length; i++) {
    if(Number(book.bids[i][1]) === m) continue;
    if(Number(book.bids[i][1]) > m1 && Number(book.bids[i][0]) > (price - (price * percent))) {
      m1 = Number(book.bids[i][1])
      arr2[1] = book.bids[i]
    }
  }

  for(let i = 0; i < book.bids.length; i++) {
    if(Number(book.bids[i][1]) === m || Number(book.bids[i][1]) === m1) continue;
    if(Number(book.bids[i][1]) > m2 && Number(book.bids[i][0]) > (price - (price * percent))) {
      m2 = Number(book.bids[i][1])
      arr2[2] = book.bids[i]
    }
  }

  for(let i = 0; i < book.bids.length; i++) {
    if(Number(book.bids[i][1]) === m || Number(book.bids[i][1]) === m1 || Number(book.bids[i][1]) === m2) continue;
    if(Number(book.bids[i][1]) > m3 && Number(book.bids[i][0]) > (price - (price * percent))) {
      m3 = Number(book.bids[i][1])
      arr2[3] = book.bids[i]
    }
  }

  for(let i = 0; i < book.bids.length; i++) {
    if(Number(book.bids[i][1]) === m || Number(book.bids[i][1]) === m1 || Number(book.bids[i][1]) === m2 || Number(book.bids[i][1]) === m3) continue;
    if(Number(book.bids[i][1]) > m4 && Number(book.bids[i][0]) > (price - (price * percent))) {
      m4 = Number(book.bids[i][1])
      arr2[4] = book.bids[i]
    }
  }

  arr.sort((a, b) => b[0] - a[0]);
  arr2.sort((a, b) => b[0] - a[0]);

  let j = (((Number(arr[0][0]) - price) / price) * 100).toFixed(2)
  let j1 = (((price - Number(arr2[0][0])) / price) * 100).toFixed(2)

  console.log(arr);
  console.log(new Date().toLocaleTimeString() + '-----');
  console.log(arr2);
}