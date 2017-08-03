
/* JavaScript content from js/login.js in folder common */
currentPage = {};
path = "";

currentPage.init = function() {
    WL.Logger.debug("welcome :: login :: init");
    $("#header_text").html("Login");
};

var handler = WL.Client.createChallengeHandler("SimpleAuthRealm");

$('#loginBtn').unbind('click').click(function() {
    WL.Logger.debug("welcome :: login :: loginClick");

    var username = $("input[name=login_email]").val() || "";
    var password = $("input[name=login_password]").val() || "";

    var data = {
        email: username,
        password: password
    };
    var invocationData = {
        adapter: "SimpleAuthAdapter",
        procedure: "submitAuthentication",
        parameters: [username, password]
    };
    WL.UserCollection.getUser(data, function(res) {
        if (res.result == "YES" && res.email == username && res.password == password) {
            WL.Device.getNetworkInfo(function(networkInfo) {
                if (networkInfo.isNetworkConnected == "true") {
                    WL.Client.logout('SimpleAuthRealm');
                    handler.submitAdapterAuthentication(invocationData, {});
                } else {
                    WL.SimpleDialog.show("Signup", "Cannot Connect to Server", [{
                        text: 'OK'
                    }]);
                }

            });

            userGeneralID = res.idGeneralUser;

        } else if (res.result == "NO") {
            WL.SimpleDialog.show("Signup", "Login Cannot be Completed", [{
                text: 'OK'
            }]);
        } else {
            // WL.SimpleDialog.show("Signup", "User Not Found on Device", [{
            //     text: 'OK'
            // }]);
            WL.Client.logout('SimpleAuthRealm');
            WL.Device.getNetworkInfo(function(networkInfo) {
                if (networkInfo.isNetworkConnected == "true") {
                    handler.submitAdapterAuthentication(invocationData, {});
                } else {
                    WL.SimpleDialog.show("Signup", "Cannot Connect to Server", [{
                        text: 'OK'
                    }]);
                }

            });
        }

    });
});
/*
WL.Client.logout('SimpleAuthRealm', {onSuccess:WL.Client.reloadApp})
*/
currentPage.forgotClick = function() {
    if (clicked)
        return;
    clicked = true;

    WL.Logger.debug("welcome :: login :: forgotClick");

    clicked = false;
};

function getSecretData() {
    var invocationData = {
        adapter: "SimpleAuthAdapter",
        procedure: "requestForData"
    };
    WL.Client.invokeProcedure(invocationData, {
        onSuccess: getSecretDataOK,
        onFailure: getSecretDataFAIL
    });
}

function getSecretDataOK(response) {
    var resId = "Response ID is " + response.invocationResult.responseID;
    var theData = resId + "<br />Secret data is :<br />" + response.invocationResult.secretData;
    alert(JSON.stringify(theData));
}

function getSecretDataFAIL(response) {
    alert("FAIL:<br />" + JSON.stringify(response.invocationResult));
}

// Challenge Handler

handler.isCustomResponse = function(response) {
    WL.Logger.debug("isCustomResonse");

    if (!response || !response.responseJSON || response.responseText === null) {
        return false;
    }
    if (typeof(response.responseJSON.authRequired) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};

handler.handleChallenge = function(response) {
    WL.Logger.debug("handleChallenge");
    WL.Logger.debug(response);

    var authRequired = response.responseJSON.authRequired;
    if (authRequired === true) {
        // display login form
        userGeneralID = "";
        WL.SimpleDialog.show("Signup", "Cannot Find user on server, Please signup again!", [{
            text: 'OK'
        }]);
    } else {
        userGeneralID = response.responseJSON.userGeneralID;
        $("#pagePort").load(path + "pages/main.html", function() {
            $.getScript(path + "js/main_page.js", function() {
                if (currentPage.init) {
                    currentPage.init();
                }
            });
        });
        $("#searchPort").show();

        handler.submitSuccess();
    }
};