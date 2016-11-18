function getArt(cls1, cls2, cls3, offSet) {
    $.getJSON("http://localhost:8080/api/art/" + cls1 + "/" + cls2 + "/" + cls3 + "/" + offSet,
        function (json) {
            myFunction(json);
        });
}

function getClass(arg1, arg2) {
    var num = parseInt(arg1.replace("Class", ""));
    var click = " onclick=getClass('Class" + (num + 1) + "',this.innerHTML);";
    if (arg2 !== "Null") {
        $('#Class' + (num - 1)).prev().html(arg2 + '<span class="caret"></span>')
    }
    if (arg1 === "Class1") {
        $('#Class2').prev().html('Class 2<span class="caret"></span>').hide();
        $('#Class3').prev().html('Class 3<span class="caret"></span>').hide();
        $('#search').hide();
        $('#Class2').empty();
        $('#Class3').empty();
    }
    if (arg1 === "Class2") {
        $('#Class2').prev().show();
        $('#Class2').prev().html('Class 2<span class="caret"></span>')
        $('#Class3').prev().html('Class 3<span class="caret"></span>').hide();
        $('#search').show();
        $('#Class2').empty();
        $('#Class3').empty();
    }
    if (arg1 === "Class3") {
        $('#Class3').prev().show();
        $('#Class3').prev().html('Class 3<span class="caret"></span>')
        $('#search').show();
        $('#Class3').empty();
    }

    var cls1 = $('#Class1').prev().text();
    var cls2 = $('#Class2').prev().text();
    var cls3 = $('#Class3').prev().text();
    if (cls1 === "Class 1") {
        cls1 = "null"
    };
    if (cls2 === "Class 2") {
        cls2 = "null"
    };
    if (cls3 === "Class 3") {
        cls3 = "null"
    };
    cls1 = cls1.replace(" ", "%20");
    cls2 = cls2.replace(" ", "%20");
    cls3 = cls3.replace(" ", "%20");
    arg1 = arg1.replace(" ", "%20");


    $.getJSON("http://localhost:8080/api/art2/" + cls1 + "/" + cls2 + "/" + cls3 + "/" + arg1,
        function (json) {
            for (i = 0; i < json.length; i++) {
                $('#' + arg1).append('<li><a href="#"' + click + '>' + json[i] + "</a></li>")
            }
        });
}

function setFilter() {
    var cls1 = $('#Class1').prev().text();
    var cls2 = $('#Class2').prev().text();
    var cls3 = $('#Class3').prev().text();
    if (cls1 === "Class 1") {
        cls1 = "null"
    };
    if (cls2 === "Class 2") {
        cls2 = "null"
    };
    if (cls3 === "Class 3") {
        cls3 = "null"
    };
    document.getElementById("slider-thumbs").innerHTML = '';
    document.getElementById("myCarousel").innerHTML = '';
    cls1 = cls1.replace(" ", "%20");
    cls2 = cls2.replace(" ", "%20");
    cls3 = cls3.replace(" ", "%20");
    getArt(cls1, cls2, cls3, 0);
}