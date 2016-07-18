function onDeviceReady() {

    // Bind events
    $(document).on("resume", onResume);

    $('#app-settings').on("click", function(){
        cordova.plugins.diagnostic.switchToSettings();
    });


    function onRequestSuccess(){
        var msg = "Successfully requested location";
        console.log(msg);
        alert(msg);
        checkState();
    }

    function onRequestFailure(error){
        var msg = "Request failed: "+error;
        console.error(msg);
        alert(msg);
        checkState();
    }

    $('#request-accuracy').on("click", function(){
        cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure);
    });

    checkState();
}


function checkState(){
    console.log("Checking location state...");
    cordova.plugins.diagnostic.isLocationAvailable(function(available){
        $('#location').text(available ? "AVAILABLE": "UNAVAILABLE");
    }, onError);
}

function onError(error){
    console.error("An error occurred: "+error);
}

function onResume(){
    checkState();
}

$(document).on("deviceready", onDeviceReady);