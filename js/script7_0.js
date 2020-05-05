var carName = 'Ford'
var carYear = 2008
var year = 2018
var personYear = 1990

function calculateYear (year) {
    var curentYear = 2018
    var result = curentYear - year
    return result
}

function checkAndLogAge (year) {
    if (calculateYear(year) < 10) {
        console.log('Возраст меньше 10 лет')
    } else {
        console.log('Возраст больше 10 лет')
    }
} 

checkAndLogAge(carYear)
checkAndLogAge(personYear)