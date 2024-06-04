enum StatusCode { // числовой enum
  SUCCESS = 1, // присваивать можно и математические операции и вызов ф-й
  IN_PROCESS = 2,
  FAILED = 3
}

enum StatusCode2 { // строковый enum
  SUCCESS = 's',
  IN_PROCESS = 'i',
  FAILED = 'f'
}

enum StatusCode3 { // гитрогенный enum (использовать с осторожностью, встречается редко)
  SUCCESS = 1,
  IN_PROCESS = 'i',
  FAILED = 'f'
}

const enum Role { // костантный enum
  ADMIN = 1,
  USER = 2
}

const res = {
  message: 'Платеж успешен',
  statusCode: StatusCode.SUCCESS
}

if(res.statusCode === StatusCode.SUCCESS) { // пример использования

}

function action(status: StatusCode3) {

}

action(StatusCode3.SUCCESS)