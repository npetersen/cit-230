var idArray = [5780993, 5771960, 5771826, 5779206];
var templeID = idArray[Math.floor(Math.random() * idArray.length)];
var pageDataURL = "https://npetersen.github.io/my-temple-stay/data/mts.json";
var pageDataRequest;

pageDataRequest = new XMLHttpRequest();
pageDataRequest.open('GET', pageDataURL);
pageDataRequest.responseType = 'json';
pageDataRequest.send();

pageDataRequest.onload = function() {

    var pageData = pageDataRequest.response;
    pageData = pageData.temples.find(x => x.id == templeID);
    console.log(pageData);
    
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