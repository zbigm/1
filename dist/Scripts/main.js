function post(url, data) {
    return _ajax('POST', url, data)
}
function get() {

}
function _ajax(type, url, data) {
    return $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json'
    })
}