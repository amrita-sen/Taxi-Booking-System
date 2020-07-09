/* This booking.js file interacts with booking.html code and reacts to user input, communicates with server, 
   processes data returned from server using an XHR object. It also has functions to validate user input and 
   set default values to the pickup date and time html elements and minimum value to the date element.
   Student name: Amrita Sen */
  
var xhr = createRequest(); // Create XHR object. From file xhr.js

/* Function to tell which PHP file to execute, where to place the data that comes back from
   the server , and what data to send to PHP */
function processBooking(dataSource, divID, firstName, lastName, phoneNumber, pickupDate, pickupTime, 
				        unitNum, streetNum, streetName, suburb, destinationSuburb){
	var isFormValid = validateForm(); 	// Invoke validateForm() and save the return value in a variable.
	
	//Check if input is valid. If valid, process the information using xhr object, else return false.
	if(isFormValid == true){
		//Check if xhr was sucessfully created. Else alert the user.
		if(xhr) {	
			//Get the element where information will be displayed.
			var obj = document.getElementById(divID);	
			//Set PHP file to execute
			var url = dataSource;
			// Set request body, using function arguments, to be sent to the server.
			var requestbody =   "&firstName="+encodeURIComponent(firstName)
								+ "&lastName="+encodeURIComponent(lastName)
								+ "&phoneNumber="+encodeURIComponent(phoneNumber)
								+ "&pickupDate="+encodeURIComponent(pickupDate)
								+ "&pickupTime="+encodeURIComponent(pickupTime)
								+ "&unitNum="+encodeURIComponent(unitNum)
								+ "&streetNum="+encodeURIComponent(streetNum)
								+ "&streetName="+encodeURIComponent(streetName)
								+ "&suburb="+encodeURIComponent(suburb)
								+ "&destinationSuburb="+encodeURIComponent(destinationSuburb);
				
			/* Initialise a request using POST protocol and the function parameter, dataSource.
			   Parameter async is set to true which means asynchronous access is requested. */
			xhr.open("POST", url, true);	

			// Set the value of HTTP request header "Content-Type" as "application/x-www-form-urlencoded".
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			/* Response on ready state. The onreadystatechange property specifies a function to be 
			   executed every time the status of the XMLHttpRequest object changes */
			xhr.onreadystatechange = function() {
				// Check if the response is ready.
				if (xhr.readyState == 4 && xhr.status == 200){ 
					// Set the content of the specified HTML element to the text received from the server.
					obj.innerHTML = xhr.responseText;
				} // end if
			} // End anonymous call-back function
			
			// Open the network connection and send the request to the server taking the requestBody as parameter.
			xhr.send(requestbody); 		
		} // End nested if.
	} 
	
	return false;
} 

// ------ Set values for pickupDate and pickupTime. -------------- //

/* Function to set current system date as default value and minimum value for
   pickupDate. */
function setCurrentDateAsDefaultAndMin(){
	var today = new Date();
	var curr_date = today.getDate();
	var curr_month = today.getMonth() + 1; //Months are zero based
	var curr_year = today.getFullYear();
	
	if(curr_date < 10){
		curr_date = '0' + curr_date;
	} 

	if(curr_month < 10){
		curr_month = '0' + curr_month;
	} 

	document.getElementById("pickupDate").value = curr_year+'-'+curr_month+'-'+curr_date;
	document.getElementById("pickupDate").min = curr_year+'-'+curr_month+'-'+curr_date;
}	

// Function to set current system time as default value for pickupTime. 
function setCurrentTimeAsDefaultValue(){
	var today = new Date();
	var curr_hour = today.getHours();
	var curr_minutes = today.getMinutes();
	
	if(curr_hour < 10){
		curr_hour = '0' + curr_hour;
	} 

	if(curr_minutes < 10){
		curr_minutes = '0' + curr_minutes;
	} 

	document.getElementById("pickupTime").value = curr_hour + ":" + curr_minutes;
}		

// --------------- Input Data Validation ---------------- //

// Set input pattern
var fnamePattern = "^([a-zA-Z]+[a-zA-Z- ]*)$";
var lnamePattern = "^([a-zA-Z]+[a-zA-Z- ]*)$";
var phoneNumPattern = "^[0-9]+$";
var streetNumPattern = "^[0-9]+$";
var streetNamePattern = "^([a-zA-Z]+[a-zA-Z-'., ]*)$";
var suburbPattern = "^([a-zA-Z]+[a-zA-Z-'., ]*)$";
var datePattern = "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$";
var timePattern = "^(?:2[0-4]|[01][1-9]|10):([0-5][0-9])$";
var destinationSubPattern = "^([a-zA-Z]+[a-zA-Z-'., ]*)$";

/* Function to validate input pattern.
   It takes two strings, representing the id for the input to be validated and the pattern for the input, as arguments, 
   and returns a string representing an error message. */
function validInputPattern(inputId, pattern){
	var error = "";
	var inputField = document.getElementById(inputId);
	var inputValue = inputField.value;
	var re = new RegExp(pattern);
	
	if (!re.test(inputValue)) // Condition is checked if field is left blank
	{
		error = " The input is invalid!" //error message is displayed if field is blank
	}
	
	return error;
}

/* Function to check if input time is no earlier than current time.
   It takes two strings, representing the id for the date input and the id of the time input, as arguments, 
   and returns a string representing an error message. */
function validateTime(inputDateId, inputTimeId){
	var error = "";
	var today = new Date();
	var inputDate = document.getElementById(inputDateId).value;
	inputDate = new Date(inputDate);
	
	var curr_hour = today.getHours();
	var curr_minutes = today.getMinutes();
	
	if(curr_hour < 10){
		curr_hour = '0' + curr_hour;
	} 

	if(curr_minutes < 10){
		curr_minutes = '0' + curr_minutes;
	} 
	
	var currentTime = curr_hour + "." + curr_minutes;	
	var time = document.getElementById(inputTimeId).value.split(":");
	var hour = time[0];
	
	if(hour == '00'){
		hour = 24
	}
	
	var min = time[1];	  
	var inputTime = hour+"."+min;
	var timeDiff = currentTime - inputTime; //Calculate difference between current and input time.
	
	if(inputDate.setHours(0,0,0,0) == today.setHours(0,0,0,0)){	//If input date is today.
		if(timeDiff > 0){	//Check if currentTime is greater than input time.
			error = "The time input cannot be earlier than the current time!";
		}
	}
	
	return error;
}

/* Function that calls the validInputPattern() and validateTime() functions and returns a true if all input
   is valid else returns false */
function validateForm(){
	var errorMsg = "";
	var obj1 = document.getElementById("firstNameMsg");
	var obj2 = document.getElementById("lastNameMsg");
	var obj3 = document.getElementById("phoneNumMsg");
	var obj4 = document.getElementById("timeMsg");
	var obj5 = document.getElementById("streetNumMsg");
	var obj6 = document.getElementById("streetNameMsg");
	var obj7 = document.getElementById("subMsg");
	var obj8 = document.getElementById("destSubMsg");
	
	
	//Validate first name.
	errorMsg = validInputPattern("firstName", fnamePattern);	
	
	if(errorMsg != ""){
		document.getElementById("firstName").focus();
		obj1.innerHTML = errorMsg;
		return false;
	} else {
		obj1.innerHTML = "";
	}
		
	//Validate last name.	
	errorMsg = validInputPattern("lastName", lnamePattern);	
	if(errorMsg != ""){
		document.getElementById("lastName").focus();
		obj2.innerHTML = errorMsg;
		return false;
	} else {
		obj2.innerHTML = "";
	}
	
	//Validate phone number.
	errorMsg = validInputPattern("phoneNumber", phoneNumPattern);
	if(errorMsg != ""){
		document.getElementById("phoneNumber").focus();
		obj3.innerHTML = errorMsg;
		return false;
	} else {
		obj3.innerHTML = "";
	}
	
	//Validate pickup time.	
	errorMsg = validateTime("pickupDate", "pickupTime");
	if(errorMsg != ""){
		document.getElementById("pickupTime").focus();
		obj4.innerHTML = errorMsg;
		return false;
	} else {
		obj4.innerHTML = "";
	}
	
	//Validate street number.
	errorMsg = validInputPattern("streetNum", streetNumPattern);
	if(errorMsg != ""){
		document.getElementById("streetNum").focus();
		obj5.innerHTML = errorMsg;
		return false;
	} else {
		obj5.innerHTML = "";
	}
	
	//Validate street name.
	errorMsg = validInputPattern("streetName", streetNamePattern);
	if(errorMsg != ""){
		document.getElementById("streetName").focus();
		obj6.innerHTML = errorMsg;
		return false;
	} else {
		obj6.innerHTML = "";
	}
	
	//Validate suburb.
	errorMsg = validInputPattern("suburb", suburbPattern);
	if(errorMsg != ""){
		document.getElementById("suburb").focus();
		obj7.innerHTML = errorMsg;
		return false;
	} else {
		obj7.innerHTML = "";
	}
	
	//Validate destination suburb.
	errorMsg = validInputPattern("destinationSuburb", destinationSubPattern);
	if(errorMsg != ""){
		document.getElementById("destinationSuburb").focus();
		obj8.innerHTML = errorMsg;
		return false;
	} else {
		obj8.innerHTML = "";
	}	
	
	return true;
}