mtsData = $.getJSON('data/mts.json', function(data) {

});

console.log(mtsData);

$.backstretch([
    "img/ogd-ut-1.jpg", 
    "img/ogd-ut-2.jpg", 
    "img/slc-ut-1.jpg"
], { 
    duration: 4000, 
    fade: "normal", 
    overlay: {
        init: true,
        background: "#444444", 
        opacity: 0.6
    }
});
