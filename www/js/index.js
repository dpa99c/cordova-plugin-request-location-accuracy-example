var platform;
function onDeviceReady(){
    platform = cordova.platformId;
    $('body').addClass(platform);
    $(document).on("resume", onResume);
    checkState();
}

function onResume(){
    checkState();
}

function openSettings(){
    if(platform === "android"){
        cordova.plugins.diagnostic.switchToLocationSettings();
    }else{
        cordova.plugins.diagnostic.switchToSettings();
    }
}


function handleLocationAuthorizationStatus(cb, status) {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            cb(true);
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization(cb);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            cb(true);
            break;
    }
}

function requestLocationAuthorization(cb) {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function ensureLocationAuthorization(cb) {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function requestLocationAccuracy(){
    ensureLocationAuthorization(function(isAuthorized){
        if(isAuthorized){
            cordova.plugins.locationAccuracy.canRequest(function(canRequest){
                if (canRequest) {
                    cordova.plugins.locationAccuracy.request(function () {
                            handleSuccess("Location accuracy request successful");
                        }, function (error) {
                            onError("Error requesting location accuracy: " + JSON.stringify(error));
                            if (error) {
                                // Android only
                                onError("error code=" + error.code + "; error message=" + error.message);
                                if (platform === "android" && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                        cordova.plugins.diagnostic.switchToLocationSettings();
                                    }
                                }
                            }
                        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
                    );
                } else {
                    // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
                    // On Android, this will occur if the app doesn't have authorization to use location.
                    onError("Cannot request location accuracy");
                }
            });
        }else{
            onError("User denied permission to use location");
        }
    });
}


function checkState(){
    console.log("Checking location state...");

    var canRequest;
    cordova.plugins.locationAccuracy.canRequest(function(_canRequest){
        canRequest = _canRequest;
        if(canRequest){
            $('#request-accuracy').removeAttr('disabled');
        }else{
            $('#request-accuracy').attr('disabled', 'disabled');
        }
    });

    cordova.plugins.diagnostic.isLocationAvailable(function (available) {
        $('#location-available').text(available ? "AVAILABLE" : "UNAVAILABLE");
    }, onError);
    cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
        $('#location-enabled').text(enabled ? "ENABLED" : "DISABLED");
        if(enabled){
            cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
                $('#location-authorized').text(authorized ? "AUTHORIZED" : "UNAUTHORIZED");
            }, onError);
        }else{
            $('#location-authorized').text("UNKNOWN");
        }
    }, onError);

    if(platform === "android"){
        cordova.plugins.diagnostic.getLocationMode(function(mode){
            $('#location-mode').text(mode.toUpperCase());
            if(canRequest && mode !== "high_accuracy"){
                $('#request-accuracy').removeAttr('disabled');
            }else{
                $('#request-accuracy').attr('disabled', 'disabled');
            }
        }, onError);
    }
}

function onError(error) {
    var msg = "An error occurred: " + error;
    console.error(msg);
    alert(msg);
    checkState();
}

function handleSuccess(msg){
    console.log(msg);
    alert(msg);
    checkState();
}

$(document).on("deviceready", onDeviceReady);