// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.database();
 
exports.changeStatusWrite = functions.database.ref('/RFID/{rfid}/Flag')
    .onWrite((change, contex) => {

        // Grab the current value of what was written to the Realtime Database.
        const id = contex.params.rfid;

        var updateStatus;
        var device_id;
        var flag;
        var ref = db.ref('RFID');

        var status;
        // Attach an asynchronous callback to read the data at our posts reference
        ref.orderByKey().equalTo(id).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                data.forEach(function(field) {
                   // console.log("field " + field.key + " value " + field.val());
                if(String(field.key) === "Status"){
                    status=field.val();
                } 
                if(String(field.key) === "Device"){
                    device_id=field.val();
                    //console.log("device_id " + device_id);
                } 
                if(String(field.key) === "Flag"){
                    flag=field.val();
                    //console.log("device_id " + device_id);
				} 
                });
              });

		}, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
          console.log("MyStatus "+ status);


          //If Flag NOT 0
          if(flag === 1){
          
          //const temp_id=1;
          //Update Device Id -----------
          //var Device_ref = db.ref('AVL');
          var upvotesRef = db.ref('/Device/'+ device_id + '/Available');

        if(status === 1){
            updateStatus = 0;
            upvotesRef.transaction(function (current_value) {
                return (current_value || 0) + 1;
            });
        }
        else{
            updateStatus = 1;
            upvotesRef.transaction(function (current_value) {
                return (current_value || 0) - 1;
            });
        }

        console.log("updateStatus "+ updateStatus);

        //update Status
        var statusRef = db.ref('/RFID/'+ id + '/Status');
        statusRef.transaction(function (current_value) {
            return updateStatus;
        });

        return change.after.ref.parent.child('Flag').set(0);
        }
        else{                       //If Flag is 0
            return;
        }
    })