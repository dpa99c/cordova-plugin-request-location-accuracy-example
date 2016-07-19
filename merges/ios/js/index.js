function onDeviceReady() {

    // Bind events
    $(document).on("resume", onResume);

    $('#app-settings').on("click", function () {
        cordova.plugins.diagnostic.switchToSettings();
    });


    $('#request-location').on("click", function () {
        $('#request-location').attr('disabled', 'disabled');
        cordova.plugins.locationAccuracy.request(function () {
            handleSuccess("Successfully requested use of location");
        }, onError);
    });

    $('#request-authorization').on("click", function () {

        cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
            if(enabled){
                cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
                    if(!authorized){
                        cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                            handleSuccess("Requested location authorization: authorization was " + status);
                            checkState();
                        }, onError, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
                    }else{
                        onError("App is already authorized to use location");
                    }
                }, onError);
            }else{
                onError("Cannot request location authorization while Location Services is OFF");
            }
        }, onError);
    });


    function checkState() {
        console.log("Checking location state...");
        cordova.plugins.diagnostic.isLocationAvailable(function (available) {
            $('#location-available').text(available ? "AVAILABLE" : "UNAVAILABLE");
        }, onError);
        cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
            $('#location-enabled').text(enabled ? "ENABLED" : "DISABLED");
            if(enabled){
                cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
                    $('#location-authorized').text(authorized ? "AUTHORIZED" : "UNAUTHORIZED");
                }, onError);
                $('#request-location').attr('disabled', 'disabled');
            }else{
                $('#location-authorized').text("UNKNOWN");
                $('#request-location').removeAttr('disabled');
            }
        }, onError);

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

    function onResume() {
        checkState();
    }

    checkState();
}
$(document).on("deviceready", onDeviceReady);