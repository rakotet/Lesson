function fetchAuth(id: string, method: 'post' | 'get'): 1 | -1 { // теперь в аргумент method мы можем передать только 'post' или 'get', работет как и с другими типами (к примеру 1 | 2) так же работает и для возвращаемого значения
  return 1
}

fetchAuth('s', 'post') // коректные аргументы
fetchAuth('s', 'get')

// let method = 'post' // так работать не будет т.к. ts считает эту переменную как тип string а не 'post' | 'get'
const method = 'post' // а вот так будет работать корректно

fetchAuth('s', method)

// так же если мы не можем объявить переменную константой то можно использовать as (на свой страх и риск т.к как as приводит к нужному типу но не значению переменной)
let method1 = 'post'

fetchAuth('s', method1 as 'post')