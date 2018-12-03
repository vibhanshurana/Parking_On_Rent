var fruits = [];
function myFunction() {

var map1 = document.getElementById("map1"); 
var map2 = document.getElementById("map2"); 
var map3 = document.getElementById("map3"); 
var map4 = document.getElementById("map4"); 

var config = {
  apiKey: "AIzaSyBnv3e5FaZWeoLKCWUW1LuQYnS3rbylCFc",
  authDomain: "myparking-7e556.firebaseapp.com",
  databaseURL: "myparking-7e556.firebaseio.com",
  storageBucket: "myparking-7e556.appspot.com",
  messagingSenderId: "141182312829"
};/*
 apiKey: "AIzaSyA_GfH36smQ1dHhn4IBERQJZIzBlgQ5M3k",
   authDomain: "parking-asr.firebaseapp.com",
  databaseURL: "parking-asr.firebaseio.com",
  storageBucket: "parking-asr.appspot.com",
  messagingSenderId:"599740138021"
    };*/
console.log("HELLO"); 
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('Device');
var myTable = "";
var myData = "";
//var fruits = [];
var text = "";
dbRefObject.on('value', snap => {
   myTable = JSON.stringify(snap.val(), null, 1);
   snap.forEach(function(data) {
    
    data.forEach(function(field) {
      if(field.key === "Available")
        text = field.val();
      else
        text = text + "/" + field.val();
      });
      fruits.push(text);
    });
  console.log(myTable);

  /*map1.innerText = fruits[0];
  map2.innerText = fruits[1];
  map3.innerText = fruits[2];
  map4.innerText = fruits[3];
    */
});
//fireHeading.innerText = fruits; 
}