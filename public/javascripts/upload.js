$('.upload-btn').on('click', function () {
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function () {

  var files = $(this).get(0).files;

  if (files.length > 0) {
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();


    //Build JS Object to pass into API post.
    var jsonBody = {};
    jsonBody.Title = $('#title').val();
    jsonBody.Artist = $('#artist').val();
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
    if (cls1 !== "null") {
      jsonBody.Class1 = cls1;
    }
    if (cls2 !== "null") {
      jsonBody.Class2 = cls2;
    }
    if (cls3 !== "null") {
      jsonBody.Class3 = cls3;
    }

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      jsonBody.Image = '/images/' + file.name;
      addData(jsonBody);

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log('upload successful!\n' + data);
      },
      xhr: function () {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function (evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });
  }
});

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


  $.getJSON("http://localhost:8080/api/class/" + cls1 + "/" + cls2 + "/" + cls3 + "/" + arg1,
    function (json) {
      for (i = 0; i < json.length; i++) {
        $('#' + arg1).append('<li><a href="#"' + click + '>' + json[i] + "</a></li>")
      }
    });
}

getClass("Class1", "Null");

function addData(data) {
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/art",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",


    error: function (jqXHR, status) {
      // error handler
      console.log(jqXHR);
      alert('fail' + status.code);
    }
  });
}