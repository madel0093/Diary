currentPage = {};
path = "";

currentPage.init = function() {
    WL.Logger.debug("welcome :: signup :: init");
    $("#header_text").html("Singup");
};
currentPage.registerClick = function() {

    WL.Logger.debug("welcome :: signup :: registerClick");

    var _email = $("input[name=register_email]").val() || "";
    var _name = $("input[name=register_user_name]").val() || "";
    var _password = $("input[name=register_password]").val() || "";
    var _repPassword = $("input[name=register_repeat_password]").val() || "";

    WL.Logger.debug(_email);
    WL.Logger.debug(_name);
    WL.Logger.debug(_password);
    WL.Logger.debug(_repPassword);

    if (_email === "" || _name === "" || _password === "" || _repPassword === "") {
        WL.SimpleDialog.show("Signup", "Please Enter All Values", [{
            text: 'OK'
        }]);
        return;
    } else if (_password != _repPassword) {
        WL.SimpleDialog.show("Signup", "Password does not match", [{
            text: 'OK'
        }]);
        return;
    }

    var data = {
        password: _password,
        name: _name,
        // birth: "string",
        email: _email
    };
    WL.Logger.debug(data);

    var invocationData = {
        adapter: 'DiaryMySQL',
        procedure: 'findUser',
        parameters: [_email, _password]
    };

    WL.Client.invokeProcedure(invocationData, {
        onSuccess: function(result) {
            WL.Logger.debug(result);
            if (Array.isArray(result.resultSet) && result.resultSet.length > 0) {
                WL.SimpleDialog.show("Signup", "Username already taken, try another one!", [{
                    text: 'OK'
                }]);
            } else {
                WL.UserCollection.add(data, function(res) {
                    if (res.result == "YES") {
                        WL.SimpleDialog.show("Signup", "Register Successful", [{
                            text: 'OK'
                        }]);
                        WL.UserCollection.pushToAdapter(function(res) {
                            if (res.result == "YES") {

                            } else {
                                WL.SimpleDialog.show("Signup", "Cannot Connect to Server", [{
                                    text: 'OK'
                                }]);
                            }
                        });
                        $("#pagePort").load(path + "pages/main.html", function() {
                            $.getScript(path + "js/main_page.js", function() {
                                if (currentPage.init) {
                                    currentPage.init();
                                }
                            });
                        });
                    } else {
                        WL.SimpleDialog.show("Signup", "Register Cannot be Completed", [{
                            text: 'OK'
                        }]);
                    }
                });
            }
        },
        onFailure: function(result) {
            WL.SimpleDialog.show("Signup", "Cannot Connect to Server", [{
                text: 'OK'
            }]);
        }
    });

};