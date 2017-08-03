
/* JavaScript content from js/ListDiary.js in folder common */
currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("ListDiarreis :: init");
    $("#header_text").html("List Diaries");

    currentPage.load({});
};

currentPage.load = function(query, byLocation) {
    WL.Logger.debug("LoadDiary:: " + byLocation);
    byLocation = typeof byLocation !== 'undefined' ? byLocation : false;
    WL.DiaryCollection.findQuery(query, function(res) {
        if (res.result != "YES")
            return;
        var html = "";
        for (var i = 0; i < res.list.length; i++) {
            var diary = res.list[i];

            if (byLocation === true && (!diary.json.location || diary.json.location == "")) continue;
            if (byLocation === true && checkLocation(diary.json.location) === false) continue;

            html += '<label> ' + diary.json.dateTime + ' </label>';
            html += '<textarea class="diary_list" readonly> ' + diary.json.diaryText + ' </textarea>';
            html += '<textarea class="diary_list" readonly> Feeling ' + diary.json.feeling + ' </textarea>';
            if (diary.json.photoURL && diary.json.photoURL != "") {
                WL.Logger.debug(diary.json.photoURL);
                html += '<img style=width:240px;height:240px;" src="' + diary.json.photoURL + '" />';
            }
            html += '<button onclick="currentPage.editClick(' + diary._id + ');" type="submit" style="width: 100%; color: black" class="mblBlueButton" id="btn_edit_dairy" >Edit</button>';
            html += '<button onclick="currentPage.deleteClick(' + diary._id + ');" type="submit" style="width: 100%; color: black" class="mblBlueButton" id="btn_delete_dairy" >Delete</button>';
        }
        $("#diaryList").html(html);
        $('.diary_list').emojiarea({
            wysiwyg: true,
            button: false,
            contenteditable: false
        });
    });
};

function checkLocation(diaryLocation) {
    WL.Logger.debug("checkLocation :: " + loc + "  " + diaryLocation)
    var thisLoc = loc.split(" ");
    var diaryLoc = diaryLocation.split(" ");

    // Get Distance by KiloMeters and then by meters
    var dist = calcDistance(
        parseFloat(thisLoc[0]),
        parseFloat(thisLoc[1]),
        parseFloat(diaryLoc[0]),
        parseFloat(diaryLoc[1]), "K") * 1000;
    WL.Logger.debug("ListDiarreis :: Distance\n" + loc + "\n" + diaryLocation + "\n" + dist);
    return dist < 500;
}

function calcDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
}

currentPage.editClick = function(id) {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("ListDiarreis :: editClick");

    edit_new = "edit";
    diary_id = id;

    pagesHistory.push(path + "pages/ListDiary.html");
    $("#pagePort").load(path + "pages/newDiary.html", function() {
        $.getScript(path + "js/newDiary.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
};

currentPage.deleteClick = function(id) {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("ListDiarreis :: deleteClick");

    WL.DiaryCollection.remove(id, function(res) {
        if (res.result == "YES") {
            WL.SimpleDialog.show("Diary", "Diary Removed Succesfully", [{
                text: 'OK'
            }]);

            $("#pagePort").load(path + "pages/ListDiary.html", function() {
                $.getScript(path + "js/ListDiary.js", function() {
                    if (currentPage.init) {
                        currentPage.init();
                    }
                });
            });
        } else {
            WL.SimpleDialog.show("Diary", "Cannot Remove Diary", [{
                text: 'OK'
            }]);
        }
    });
    clicked = false;
};