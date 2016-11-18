//Function to add images to the gallery
function myFunction(arr) {
    var thumbs = "";
    var slides = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        thumbs += '<li class="col-sm-3"><a class="thumbnail" id="carousel-selector-' + i + '"><img src="' + arr[i].Image + '"></a></li>';
        if (i === 0) {
            slides += '<div class="active item" data-slide-number="' + i + '"><img src="' + arr[i].Image + '"><h3>' + arr[i].Title + '</h3></div>';
        } else {
            slides += '<div class="item" data-slide-number="' + i + '"><img src="' + arr[i].Image + '"><h3>' + arr[i].Title + '</h3></div>';
        }
    }
    document.getElementById("slider-thumbs").innerHTML = '<div class="carousel-inner"><ul class="hide-bullets">' + thumbs + '</ul></div>';
    document.getElementById("myCarousel").innerHTML = '<div class="carousel-inner">' + slides + '</div>';
}