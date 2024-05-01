function getfullName(firstName: string, surName: string): string {
  return `${firstName} ${surName}`
}

const getfullNameArrow = (firstName: string, surName: string): string => { // запись стрелочной функции в TS
  return `${firstName} ${surName}`
}

console.log(getfullName('Alex', 'Rakot'))