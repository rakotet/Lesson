"use strict";
function getfullName(firstName, surName) {
    return `${firstName} ${surName}`;
}
const getfullNameArrow = (firstName, surName) => {
    return `${firstName} ${surName}`;
};
console.log(getfullName('Alex', 'Rakot'));
