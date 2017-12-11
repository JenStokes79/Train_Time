// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQp2qzcmnXE28wdLXHcvpfoQ7JPbyEmAs",
    authDomain: "train-time-19885.firebaseapp.com",
    databaseURL: "https://train-time-19885.firebaseio.com",
    projectId: "train-time-19885",
    storageBucket: "train-time-19885.appspot.com",
    messagingSenderId: "140676448999"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  // button adds train info
$("#trainSubmit").on("click", function(event) {
  event.preventDefault();

  var train = $("#trainName").val().trim(); 
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X"); 
  var frequency = $("#frequency").val().trim();

  var newTrain = {
  	train: train,
  	destination: destination,
    firstTrain: firstTrain,
  	frequency: frequency
  }

  database.ref().push(newTrain) // this works, data going to fireabse!!! woohoo!!

  console.log(newTrain.train); //this works
  console.log(newTrain.destination); //this works
  console.log(newTrain.firstTrain); // this works
  console.log(newTrain.frequency); // this works

  alert ("New Train Added") // alerts user their train has been added


// will clear the input forms
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKay){

console.log(childSnapshot.val()); 



var train = childSnapshot.val().train
var destination = childSnapshot.val().destination
var firstTrain = childSnapshot.val().firstTrain
var frequency = childSnapshot.val().frequency

console.log(train);
console.log(destination);
console.log(firstTrain);
console.log(frequency);

//var firstTrainPretty = moment.(firstTrain).format("HHmm");

var currentTime = moment();


//var nextArrival = moment().diff(moment(currentTime), "minutes");
//console.log(nextArrival);


 //var currentTime = moment().format("HH:mm")
  //console.log("Local Current Time: " + currentTime)
 //var timeDifference = moment(currentTime).add(frequency, "minutes").format("HH:mm");
 // console.log("Time Difference from Current Time to Next Train: " + timeDifference);

var difference = moment().diff(moment.unix(firstTrain), "minutes");
var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
var newTime = frequency - remainder;

var nextArrival = moment().add(newTime, "m").format("hh:mm"); 


console.log(difference);
console.log(remainder);
console.log(newTime);
console.log(nextArrival);
//var newTime = moment().add(frequency, "minutes").format("HH:mm");
//console.log(newTime)

//var difference = frequency - newTime;
//console.log(difference);

 $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + newTime + "</td><td>");
});



