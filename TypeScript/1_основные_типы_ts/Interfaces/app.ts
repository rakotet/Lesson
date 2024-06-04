interface User { // interface альтернативная запись описания типов
  name: string,
  age: number,
  skills: string[]

  log: (id: number) => string // в интерфейсы можно определять ф-и котоыре должны содержать объекты или классы этого типа User (описываем что принимает, чт овозвращает)
}

interface UserJob {
  job: string
}

interface UserRole extends User, UserJob { // объединяем два интерфейса в один (все условия обоих интерфейсов объединяются) через запятую можно объединять сколько угодно интерфейсов
  roleId: number
}

let user: UserRole = {
  job: 'dev',
  roleId: 1,
  name: 'asd',
  age: 33,
  skills: ['1', '2'],

  log(id) {
    return ''
  }
}

interface UserDic { // [] говорят о том что у объекта этого интерфейса может быть не ограниченное число свойств где ключ это число а значение тип User
  [index: number]: User // индексные свойства
}



