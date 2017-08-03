
/* JavaScript content from js/main.js in folder common */
var pagesHistory = [];
var currentPage = {};
var path = "";

var edit_new = "Null";
var edit_new_cat = "Null";
var cat_id = null;
var diary_id = null;

var clicked = false;

function wlCommonInit() {
    //document.addEventListener("pause", onPause, false);

    WL.UserCollection.init();
    WL.CategoryCollection.init();
    WL.DiaryCollection.init();

    $("#searchPort").hide();

    $("#pagePort").load(path + "pages/Welcome.html", function() {
        $.getScript(path + "js/welcome.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });

}

// function onPause() {
//     WL.Client.logout('SimpleAuthRealm', {
//         onSuccess: WL.Client.reloadApp
//     });
// }

function pushToCloud() {
    //	var invocationData = {
    //	        adapter : 'DiaryMySQL',
    //	        procedure : 'PROCEDURE_NAME',
    //	        parameters : []
    //	    };
    //
    //	WL.Client.invokeProcedure(invocationData,{
    //	    onSuccess : getDataSuccess,
    //	    onFailure : getDataFailure,
    //	});
    WL.UserCollection.pushToAdapter(function(res) {
        if (res.result == "YES") {
            WL.CategoryCollection.pushToAdapter(function(res2) {
                if (res2.result == "YES") {
                    WL.DiaryCollection.pushToAdapter(function(res3) {
                        if (res3.result == "YES") {
                            WL.SimpleDialog.show("Diary", "Backup Succesful", [{
                                text: 'OK'
                            }]);
                        } else {
                            WL.SimpleDialog.show("Diary", "Backup Error", [{
                                text: 'OK'
                            }]);
                        }
                    });
                } else {
                    WL.SimpleDialog.show("Diary", "Backup Error", [{
                        text: 'OK'
                    }]);
                }
            });
        } else {
            WL.SimpleDialog.show("Diary", "Backup Error", [{
                text: 'OK'
            }]);
        }
    });

}

function pullFromCloud() {
    //	WL.UserCollection.removeCollection(function(res){
    //		WL.UserCollection.init();
    //		WL.UserCollection.loadFromAdapter();
    //	});

    WL.CategoryCollection.removeCollection(function(res) {
        WL.CategoryCollection.init();
        WL.CategoryCollection.loadFromAdapter(function(res) {
            if (res.result == "YES") {
                WL.DiaryCollection.removeCollection(function(res) {
                    WL.DiaryCollection.init();
                    WL.DiaryCollection.loadFromAdapter(function(res2) {
                        if (res2.result == "YES") {
                            WL.SimpleDialog.show("Diary", "Restore Succesful", [{
                                text: 'OK'
                            }]);
                        } else {
                            WL.SimpleDialog.show("Diary", "Restore Error", [{
                                text: 'OK'
                            }]);
                        }
                    });
                });
            } else {
                WL.SimpleDialog.show("Diary", "Restore Error", [{
                    text: 'OK'
                }]);
            }
        });
    });


}

$("#btn_back").unbind('click').click(function() {
    WL.Logger.debug("backClick");

    backPage = "";
    if (userGeneralID === "") {
        backPage = "Welcome.html";
    } else {
        backPage = "main.html";
    }

    $("#pagePort").load(path + "pages/" + backPage, function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });

});

$("#btn_search").unbind('click').click(function() {
    WL.Logger.debug("searchClick");

    var query = {};
    query.diaryText = $("#txt_search").val() || "";
    WL.Logger.debug(query);

    $("#pagePort").load(path + "pages/ListDiary.html", function() {
        $.getScript(path + "js/ListDiary.js", function() {
            if (currentPage.load) {
                currentPage.load(query);
            }
        });
    });
});
//sender ID
//130682241443
//server ID // API key
//AIzaSyCgwwFAPo27gTf_dDUVEmNSZv1SRhXKS70
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit() {
    wlCommonInit();
    // Environment initialization code goes here
}

function backupMe() {
    cordova.exec(backupSuccess, backupFailure, "SDCardPlugin", "backup", []);
}

function backupSuccess(data) {
    alert("Backup Completed Successfully");
}

function backupFailure(data) {
    alert("Backup Failed");
}

function restoreMe(){
	cordova.exec(restoreSuccess, restoreFailure, "SDCardPlugin", "restore", []);
}

function restoreSuccess(data) {
    alert("Data Restored Successfully");
}

function restoreFailure(data) {
    alert("Restore Failed");
}
