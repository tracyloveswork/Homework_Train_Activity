// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAeXUCrz_2fhizv6MZRvXW9FT2ai5u33_E",
    authDomain: "trainhw-375b0.firebaseapp.com",
    databaseURL: "https://trainhw-375b0.firebaseio.com",
    projectId: "trainhw-375b0",
    storageBucket: "trainhw-375b0.appspot.com",
    messagingSenderId: "110589898337"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  // Add a train time

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Get input values
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-input").val().trim(), "HH:mm");
  var frequency = $("#frequency-input").val().trim();

  // Create an object with data to be sent to firebase
  var newTrain = {
    train: trainName,
    trainDestination: destination,
    trainFirst: firstTrain,
    trainFrequency: frequency
  };

  console.log(newTrain.train);
  console.log(newTrain.trainDestination);
  console.log(newTrain.trainFirst);
  console.log(newTrain.trainFrequency);

  // Push object to database
  database.ref().push(newTrain);

  // Clears inputs
  $("#train-name-input").val("");
  $("#desination-input").val("");
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

 	// var trainStart = moment.unix(firstTrain).format("hh:mm");

 	// First Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Give current time a variable
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
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
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add train data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});

// Notes
  // function findArrival() {
  		
  // 		var i = 1;

  // 		if (currentTime > firstTrain + (i * frequency)) {

  // 			nextArrival = firstTrain + (i * frequency);

  // 		} else {

  // 			i++;
  // 		}

  // 	}

