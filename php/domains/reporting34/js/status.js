$(document).ready(function() {
    $("h3").bind("click", function(event) {
        ajax({'func': 1});
    });
});
function ajax(data) {
    $.ajax({
        url: 'jsone.php',
        type: "POST",
        data: data,
        dataType: "text",
        error: error,
        success: success
    });
}
function error() {
    alert('Ошибка при загрузке данных!');
}
function success(result) {
    var result = $.parseJSON(result);
    var str = '';
    for (var i in result)
        str += '<b>' + i + '</b>: ' + result[i] + '<br />';
    $('#result').empty();
    $('#result').append(str);
}