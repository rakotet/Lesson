module.exports = function numberOfSigns(x) {
    return ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) ); // находим количество цифр после запятой
}