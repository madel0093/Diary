currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("welcome :: init");
    $("#header_text").html("Welcome to Everyday Diary");
};

$("#btn_signup").unbind('click').click(function() {
    WL.Logger.debug("Welcome :: signupClick");

    pagesHistory.push(path + "pages/Welcome.html");
    $("#pagePort").load(path + "pages/signup.html", function() {
        $.getScript(path + "js/signup.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
});
$("#btn_Login").unbind('click').click(function() {
    WL.Logger.debug("Welcome :: loginClick");

    pagesHistory.push(path + "pages/Welcome.html");
    $("#pagePort").load(path + "pages/login.html", function() {
        $.getScript(path + "js/login.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
});