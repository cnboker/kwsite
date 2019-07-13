(function($) {
    var key = atob(getUrlParameter('key'))
    var id = getParameter(key,'id')
    var url = getParameter(key, 'url')
    if(id && id.length === 24){
        $.post(url,{
            id
        })
    }
    $('.carousel').carousel(); 
})($)

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
    getParameter(sPageURL)
};

function getParameter(sPageURL, key){
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}