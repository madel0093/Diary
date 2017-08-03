currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("welcome :: login||singup :: main :: init");
    $("#header_text").html("Everyday Diary");

};

$("#btn_addnew").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Main :: addnewClick");

    edit_new = "new";
    pagesHistory.push(path + "pages/main.html");
    $("#pagePort").load(path + "pages/newDiary.html", function() {
        $.getScript(path + "js/newDiary.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
});

$("#btn_mycategories").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Main :: mycategoriesClick");

    pagesHistory.push(path + "pages/main.html");
    $("#pagePort").load(path + "pages/Categories.html", function() {
        $.getScript(path + "js/Categories.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
});

$("#btn_mydairies").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Main :: mydiariesClick");

    pagesHistory.push(path + "pages/main.html");
    $("#pagePort").load(path + "pages/ListDiary.html", function() {
        $.getScript(path + "js/ListDiary.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
});

$("#btn_settings").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;

    WL.Logger.debug("Main :: settingsClick");

    pagesHistory.push(path + "pages/main.html");
    $("#pagePort").load(path + "pages/settingView.html", function() {
        $.getScript(path + "js/settingView.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
});

//TODO export pdf button
// $("#btn_topdf").click(function() {
// if (clicked) return;
// clicked = true;
//     WL.Logger.debug("Main :: exportPDFClick");

//     pagesHistory.push(path + "pages/main.html");
//     $("#pagePort").load(path + "pages/Categories.html", function() {
//         $.getScript(path + "js/Categories.js", function() {
//             if (currentPage.init) {
//                 currentPage.init();
//             }
//         });
//     });
//    clicked = false;
// });

// TODO What Happened here
$("#btn_place").unbind('click').click(function() {

    WL.Logger.debug("Main :: placeClick");

    var query = {};

    pagesHistory.push(path + "pages/main.html");
    $("#pagePort").load(path + "pages/ListDiary.html", function() {
        $.getScript(path + "js/ListDiary.js", function() {
            if (currentPage.load) {
                currentPage.load(query, true);
            }
        });
    });


});