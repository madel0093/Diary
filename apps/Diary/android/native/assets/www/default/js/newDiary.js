
/* JavaScript content from js/newDiary.js in folder common */
currentPage = {};
path = "";

currentPage.init = function() {
    $('#text_dairy').emojiarea({
        wysiwyg: true,
        button: '#emo-button'
    });
    $('#feeling_dairy').emojiarea({
        wysiwyg: true,
        button: '#emo-button-2'
    });

    WL.Logger.debug("Main :: newDiary :: init");
    $("#header_text").html("New Diary");

    WL.CategoryCollection.findQuery({}, function(res) {
        if (res.result != "YES")
            return;

        var html = '<option selected="selected"></option>';
        for (var i = 0; i < res.list.length; i++) {
            var cat = res.list[i];

            html += '<option value="' + cat.json.idGeneralCategory + '">' + cat.json.name + '</option>';
        }
        $("#catList").html(html);
    });

    if (edit_new == "edit") {
        WL.DiaryCollection.findQuery({
            _id: diary_id
        }, function(res) {
            if (res.result == "YES") {
                $("#text_dairy").val(res.list[0].json.diaryText);
                $("#feeling_dairy").val(res.list[0].json.feeling);
                $("#catList").val(res.list[0].json.idCategory);

                if (res.list[0].json.photoURL && res.list[0].json.photoURL !== "") {
                    $('#imageTag').attr('src', res.list[0].json.photoURL);
                    $('#removeImg').show();
                }

                $('#text_dairy').emojiarea({
                    wysiwyg: true,
                    button: '#emo-button'
                });
                $('#feeling_dairy').emojiarea({
                    wysiwyg: true,
                    button: '#emo-button-2'
                });
            }
        });
    }
};

function onCameraSuccess(imageURL) {
    var largeImage = document.getElementById('imageTag');

    // Unhide image elements
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    largeImage.src = imageURL;
    $('#removeImg').show();
}
currentPage.removePhoto = function() {
    $('#imageTag').attr('src', "");
    $('#removeImg').hide();
};
currentPage.addPhoto = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("newDiary :: Add Photo Clicked");

    var myCam = new myCamera();
    myCam.getPhoto(onCameraSuccess);

    clicked = false;
};

currentPage.capPhoto = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("newDiary :: Capture Photo Clicked");

    var myCam = new myCamera();
    myCam.capturePhoto(onCameraSuccess);

    clicked = false;
};

//TODO add photo and location
$("#btn_save").unbind('click').click(function() {
    WL.Logger.debug("Edit_New Diary Clicked");

    var _diary = $("#text_dairy").val() || "";
    var _feel = $("#feeling_dairy").val() || "";
    var _idCat = $("#catList option:selected").val() || "";
    var _photoURL = $('#imageTag').attr('src') || "";

    // $("#btn_addphoto").val() || "";

    var data = {
        photoURL: _photoURL,
        location: loc,
        feeling: _feel,
        diaryText: _diary,
        idCategory: _idCat
    };

    if (edit_new == "new") {
        WL.Logger.debug("New Diary");
        WL.DiaryCollection.add(data, function(res) {
            if (res.result == "YES") {
                WL.SimpleDialog.show("Diary", "Diary Added Succesfully", [{
                    text: 'OK'
                }]);
            } else {
                WL.SimpleDialog.show("Diary", "Cannot Add Diary", [{
                    text: 'OK'
                }]);
            }
            $("#pagePort").load(path + "pages/ListDiary.html", function() {
                $.getScript(path + "js/ListDiary.js", function() {
                    if (currentPage.init) {
                        currentPage.init();
                    }
                });
            });
        });
    } else {
        WL.Logger.debug("Edit Diary " + diary_id);
        data._id = diary_id;
        WL.DiaryCollection.update(data, function(res) {
            if (res.result == "YES") {
                WL.SimpleDialog.show("Diary", "Diary Updated Succesfully", [{
                    text: 'OK'
                }]);
            } else {
                WL.SimpleDialog.show("Diary", "Cannot Edit Diary", [{
                    text: 'OK'
                }]);
            }
            // pagesHistory.push(path + "pages/newDiary.html");
            $("#pagePort").load(path + "pages/ListDiary.html", function() {
                $.getScript(path + "js/ListDiary.js", function() {
                    if (currentPage.init) {
                        currentPage.init();
                    }
                });
            });
        });
    }
});