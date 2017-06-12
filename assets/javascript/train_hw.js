// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCi5ozW0D9XGfWhi6y3uAxXAW3KUUxhFiU",
    authDomain: "traintime-e7c66.firebaseapp.com",
    databaseURL: "https://traintime-e7c66.firebaseio.com",
    projectId: "traintime-e7c66",
    storageBucket: "traintime-e7c66.appspot.com",
    messagingSenderId: "1019157971976"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Add a train time

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Get input values
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // firstTrain = moment(firstTrain).format("HH:mm");


  // Test variables are picked up
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Create an object with data to be sent to firebase
  var newTrain = {
    train: trainName,
    trainDestination: destination,
    trainFirst: firstTrain,
    trainFrequency: frequency
  };

  // Test variables in object
  console.log(newTrain.train);
  console.log(newTrain.trainDestination);
  console.log(newTrain.trainFirst);
  console.log(newTrain.trainFrequency);

  // Push object to database
  database.ref().push(newTrain);

  // Clears inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// Firebase event for adding a train and updating HTML
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().trainDestination;
  var firstTrain = childSnapshot.val().trainFirst;
  var frequency = childSnapshot.val().trainFrequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

// Calculate the next train
 	// Variables to use trainName, destination, firstTrain, frequency
 	// New variables nextTrain, minutesAway

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
 console.log(firstTrainConverted);

  // Give current time a variable
  // var currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
  
  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  // Remainder
  var remainder = diffTime % frequency;
  console.log(remainder);

  // Minutes until next train
  var minutesAway = frequency - remainder;
  console.log(minutesAway);;

  // Next train time
  var nextTrain = moment().add(minutesAway, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm a");

  // Add train data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});


