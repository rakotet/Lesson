function logId(id: string | number | boolean) { // принимает либо тип строки либо число
  console.log(id) // у id не может вызывать методы строк или чисел т.к. это объект типа Union

  if(typeof id === 'string') { // такая првоерка называется сужение типов, используется часто
    console.log(id) // тут можем использовать строковые методы id 
  } else if(typeof id === 'number') {
    console.log(id) // тут можем использовать числовые методы id 
  } else {
    console.log(id)
  }
}

logId(1)
logId('dfdf')
logId(true)

function logError(err: string | string[]) {
  if(Array.isArray(err)) {
    console.log(err) // можно делать дейстаия как с массивом
  } else {
    console.log(err) // можно делать дейстаия как с строкой
  }
}

function logObject(obj: {a: number} | {b: number}) { // сужение типов рабоатет и с оъектами
  if('a' in obj) { // in возвращает true если такой ключ есть в объекте
    console.log(obj.a)
  } else {
    console.log(obj.b)
  }
}

function logMulti(a: string | number, b: string | boolean) { // втречается крайне редко, сужение по одинаковым типам
  if(a === b) { // используем сравнение именно по типу
    console.log(a) // работаем как с строкой
  }
}