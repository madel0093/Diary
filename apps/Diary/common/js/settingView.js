currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("Settings View :: init");
    $("#header_text").html("Settings View");

};

currentPage.setPass = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("setting view :: set_pass_click");

    pagesHistory.push(path + "pages/settingView.html");
    $("#pagePort").load(path + "pages/setPassword.html", function() {
        $.getScript(path + "js/setPassword.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
};

currentPage.backupSD = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("setting view :: backupSD_click");

    backupMe();

    clicked = false;
};

currentPage.restoreSD = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("setting view :: restoreSD_click");

    restoreMe();

    clicked = false;
};

currentPage.backupCloud = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("setting view :: backupCloud_click");

    pushToCloud();

    clicked = false;
};

currentPage.restoreCloud = function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("setting view :: restoreCloud_click");

    pullFromCloud();

    clicked = false;
};