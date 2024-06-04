type httpMethod = 'post' | 'get' // так можно объявить тип и использовать его в дальнейшем

function fetchAuth(id: string, method: httpMethod) { 
 
}

type User = { // спомощью типов алиасов можно типизировать объекты
  name: string,
  age: number,
  skills: string[]
}

type Role = {
  id: number
}

type UserWithRole = User & Role // & объединяет два типа в один, в него входят все условия обоих типов

let user: User = {
  name: 'asd',
  age: 33,
  skills: ['1', '2']
}

let user2: UserWithRole = {
  name: 'asd',
  age: 33,
  skills: ['1', '2'],
  id: 1
}

