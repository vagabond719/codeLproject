jQuery(document).ready(function ($) {
    $('#smallnav').hide();
    $('#maincontainer').hide();
    $('#footer').hide();
});

$("#hidecover").click(function () {
    $(".cover").fadeOut();
    $('#smallnav').fadeIn("slow");
    $('#maincontainer').fadeIn("slow");
    $('#footer').fadeIn("slow");
});

$('#search').click(function() {
    setFilter()
});

getArt("null", "null", "null", 0);
getClass("Class1", "Null");