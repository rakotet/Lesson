function getfullName(userEntity: {firstName: string, surName: string}) : string {
  return `${userEntity.firstName} ${userEntity.surName}`
}

const user = {
  firstName: 'Alex',
  surName: 'Rakot',
  city: 'Moscow',
  age: 33,
  skills: {
    dev: true,
    devOps: true
  }
}

console.log(getfullName(user))