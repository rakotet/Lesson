"use strict";
const skills = ['Dev', 'DevOps', 'Testing'];
for (const skill of skills) {
    console.log(skill.toLocaleLowerCase());
}
const res = skills
    .filter((s) => s !== 'DevOps')
    .map(s => s + '!  ')
    .reduce((a, b) => a + b);
console.log(res);
