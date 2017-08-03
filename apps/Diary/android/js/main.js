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
