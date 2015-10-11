function onDeviceReady() {

    // Bind events
    $(document).on("resume", onResume);

    $('#location-settings').on("click", function(){
        cordova.plugins.diagnostic.switchToLocationSettings();
    });


    function onRequestSuccess(accuracyName, success){
        var msg = "Successfully requested accuracy '"+accuracyName+"': "+success.message;
        console.log(msg);
        alert(msg);
        checkState();
    }

    function onRequestFailure(error){
        var msg = "Accuracy request failed: error code="+error.code+"; error message="+error.message;
        console.error(msg);
        alert(msg);
        checkState();
    }

    $('#request-accuracy').on("click", function(){
        var accuracy = $('#location-accuracy').val(),
            accuracyName  =  $('#location-accuracy option:selected').text();
        cordova.plugins.locationAccuracy.request(onRequestSuccess.bind(this, accuracyName), onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    });

    checkState();
}


function checkState(){
    console.log("Checking location state...");

    function evaluateMode(mode){
        $('#location-mode').text(mode.toUpperCase());
    }
    cordova.plugins.diagnostic.getLocationMode(evaluateMode, onError);
}

function onError(error){
    console.error("An error occurred: "+error);
}

function onResume(){
    checkState();
}

$(document).on("deviceready", onDeviceReady);