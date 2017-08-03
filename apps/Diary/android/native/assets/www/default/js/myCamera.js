
/* JavaScript content from js/myCamera.js in folder common */
// Wait for Cordova to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

var pictureSource, destinationType;

// Define a class like this
function myCamera() {
    this.pictureSource = pictureSource; // picture source
    this.destinationType = destinationType; // sets the format of returned value 
    this.imageLocation = "";
}


// Cordova is ready to be used!
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
myCamera.prototype.onPhotoDataSuccess = function(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
};

// Called when a photo is successfully retrieved
myCamera.prototype.onPhotoURLSuccess = function(imageURL) {
    // Uncomment to view the image file URI 
    // console.log(imageURL);

    // Get image handle
    // var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    // largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    // largeImage.src = imageURL;
    this.imageLocation = imageURL;
};

// A button will call this function
myCamera.prototype.capturePhoto = function(onCamSuccess) {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onCamSuccess, onCamFail, {
        quality: 50,
        destinationType: destinationType.FILE_URL,
        saveToPhotoAlbum: true
    });
    WL.Logger.debug("capturePhoto :: saveToPhotoAlbum");
};

// A button will call this function
myCamera.prototype.capturePhotoEdit = function() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
};

// A button will call this function
myCamera.prototype.getPhoto = function(onCamSuccess) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onCamSuccess, onCamFail, {
        quality: 50,
        destinationType: destinationType.FILE_URL,
        sourceType: pictureSource.SAVEDPHOTOALBUM
    });
};

// Called if something bad happens. 
function onCamFail(message) {
    alert('Failed because: ' + message);
};