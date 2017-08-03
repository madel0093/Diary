
/* JavaScript content from js/setPassword.js in folder common */
currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("SetPassword :: init");
    $("#header_text").html("Set Password");

};

$("#set_btn").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("SetPassword :: setClicked");

    var _pass = $("#set_pass").val() || "";
    var _repass = $("#re_set_pass").val() || "";

    if (_pass !== "" && _repass == _pass) {
        WL.UserCollection.update({
            password: _pass
        }, function(res) {
            if (res.result == "YES") {
                WL.SimpleDialog.show("SetPassword", "Password Updated Succesfully", [{
                    text: 'OK'
                }]);
            } else {
                WL.SimpleDialog.show("SetPassword", "Cannot Set Password", [{
                    text: 'OK'
                }]);
            }
        });

        $("#pagePort").load(pagesHistory.pop(), function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    }
    clicked = false;
});