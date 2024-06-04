"use strict";
function getfullName(userEntity) {
    return `${userEntity.firstName} ${userEntity.surName}`;
}
const user = {
    firstName: 'Alex',
    surName: 'Rakot',
    city: 'Moscow',
    age: 33
};
console.log(getfullName(user));
