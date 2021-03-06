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

  // Array to hold trains
  var trainArray = [];
  // Set gloabl variables
  var minutesAway = "0";
  // Value to create unique #IDs
  var trainID=0

  // Add a train time

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Get input values
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

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
	console.log("This is being pushed:");
  console.log(childSnapshot.val());

  // Push object to array in browser
  var newObject = childSnapshot.val();
  trainArray.push(newObject);
  console.log("This is the train array:");
  console.log(trainArray);

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
	var currentTime = moment();

	// First Time (pushed back 1 year to make sure it comes before current time)
 	var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
 	console.log(firstTrainConverted);

  // Difference between the times
  var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  // Remainder
  var remainder = diffTime % frequency;
  console.log(remainder);

  // Minutes until next train
  minutesAway = frequency - remainder;
  console.log(minutesAway);

  // Next train time
  var nextTrain = moment().add(minutesAway, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm a");

  // Add train data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td id=\"minutesAway" + trainID + "\">" + minutesAway + "</td></tr>");

  trainID++;

// Handle the errors

}, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

});

 	// Set one minute interval to countdown minutes away...
 	var intervalId;

 	// trainArray used for loop
 	console.log(trainArray);

 	intervalID = setInterval(function(){

 		for (i=0;i<trainArray.length;i++) {

	 		// Calculate the next train
			var currentTime = moment();

			var firstTrain = trainArray[i].trainFirst;
			var frequency = trainArray[i].trainFrequency;

			// First Time (pushed back 1 year to make sure it comes before current time)
		 	var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
		 	// console.log(firstTrainConverted);

		  // Difference between the times
		  var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes");
		  // console.log("DIFFERENCE IN TIME: " + diffTime);
		  
		  // Remainder
		  var remainder = diffTime % frequency;
		  // console.log(remainder);

		  // Minutes until next train
		  minutesAway = frequency - remainder;
		  // console.log(minutesAway);

	 		$("#minutesAway" + i).text(minutesAway);

	  }

 }, 1000);

