const skill: readonly [number, string] = [1, 'Dev'] // при readonly нельзя изменять значения перемынных в массиве
const skills: readonly string[] = ['DevOps', 'Dev'] // string[] сколько угодно значений в массиве, но только строки
const skills2: ReadonlyArray<string> = ['DevOps', 'Dev'] // тоже самое что : readonly string[] но с использованием дженериков (узнаю позже что такое дженерики)
