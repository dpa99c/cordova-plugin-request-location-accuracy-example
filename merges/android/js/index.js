function onDeviceReady() {

    // Bind events
    $(document).on("resume", onResume);

    $('#location-settings').on("click", function(){
        cordova.plugins.diagnostic.switchToLocationSettings();
    });


    function onRequestSuccess(accuracyName, success){
        handleSuccess("Successfully requested accuracy '"+accuracyName+"': "+success.message);
    }

    function onRequestFailure(error){
        onError("Accuracy request failed: error code="+error.code+"; error message="+error.message);
    }

    $('#request-accuracy').on("click", function(){
        var accuracy = $('#location-accuracy').val(),
            accuracyName  =  $('#location-accuracy option:selected').text();
        cordova.plugins.locationAccuracy.request(onRequestSuccess.bind(this, accuracyName), onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    });

    $('#request-authorization').on("click", function () {

        cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
            if(!authorized){
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                    handleSuccess("Requested location authorization: authorization was " + status);
                }, onError, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
            }else{
                onError("App is already authorized to use location");
            }
        }, onError);
    });

    checkState();
}


function checkState(){
    console.log("Checking location state...");

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            $('#request-accuracy').removeAttr('disabled');
        }else{
            $('#request-accuracy').attr('disabled', 'disabled');
        }
    });

    cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
        if(authorized){
            $('#request-authorization').attr('disabled', 'disabled');
        }else{
            $('#request-authorization').removeAttr('disabled');
        }
    }, onError);

    function evaluateMode(mode){
        $('#location-mode').text(mode.toUpperCase());
    }
    cordova.plugins.diagnostic.getLocationMode(evaluateMode, onError);
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

function onResume(){
    checkState();
}

$(document).on("deviceready", onDeviceReady);