// var templeID = getQueryVariable('id');
var templeID = "5780993";
var pageDataURL = "https://npetersen.github.io/my-temple-stay/data/mts.json";
var weatherDataURL = "https://api.openweathermap.org/data/2.5/weather?id=" + templeID + "&units=imperial&appid=003d0dc716b994bd0c126c319d745b07";
var pageDataRequest;
var weatherDataRequest;

if (!templeID || templeID.length != 7) {

    alert('A valid temple identifier is required. Please go to the "temples" link on the main navigation');
    location.href = 'index.html';

}

pageDataRequest = new XMLHttpRequest();
pageDataRequest.open('GET', pageDataURL);
pageDataRequest.responseType = 'json';
pageDataRequest.send();

/*
weatherRequest = new XMLHttpRequest();
weatherRequest.open('GET', weatherDataURL);
weatherRequest.responseType = 'json';
weatherRequest.send();
*/

pageDataRequest.onload = function() {

    var pageData = pageDataRequest.response;
    pageData = pageData.temples.find(x => x.id == templeID);
    console.log(pageData);

    //slideshowImages = getImagesArray(pageData);
    
    $.backstretch(pageData.images, { 
        duration: 4000, 
        fade: "normal", 
        overlay: {
            init: true,
            background: "#111111", 
            opacity: 0.7
        }
    });

}

function getImagesArray(json) {
    for (var iOut = 0; iOut < json.temples.length; iOut++) {
        matchFound = json.temples[iOut].id == templeID;
        if (matchFound) {
            for (var iIn = 0; iIn < json.temples[iOut].images.length; iIn++) {
                slideshowImages.push(json.temples[iOut].images[iIn]);
            }
        }
    }
    return slideshowImages;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    
    return(false);
}
