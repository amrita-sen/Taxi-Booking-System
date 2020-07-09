/* This admin.js file interacts with admin.html code and reacts to user input, communicates with server, 
   processes data returned from server using an XHR object. It also has a function to validate the user
   input for booking number field.
   Student name: Amrita Sen */
   
var xhr = createRequest(); //Create XHR object. From file xhr.js

/* Function to tell which PHP file to execute, where to place the data that comes back from
   the server , and what data to send to PHP. This function is called when the user clicks the
   "Assign Taxi" button. */
function assigning(dataSource, divID, bookingNumber) {
	var error = validateBookingNUmberInput(); // Invoke validateBookingNUmberInput() and save the return value in a variable.
	var obj = document.getElementById(divID); //Get the element where information will be displayed.
			
	//Check if input is valid. If valid, process the information using xhr object, else display error message.
	if(error == ""){	
		//Check if xhr was sucessfully created. Else alert the user.
		if(xhr) {
			//Set PHP file to execute
			var url = dataSource;	
			// Set request body, using function argument, to be sent to the server.
			var requestbody ="bookingNum="+encodeURIComponent(bookingNumber);
			
			/* Initialise a request using POST protocol and the function parameter, dataSource.
			   Parameter async is set to true which means asynchronous access is requested. */
			xhr.open("POST", url, true);
			
			// Set the value of HTTP request header "Content-Type" as "application/x-www-form-urlencoded".
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			/* Response on ready state. The onreadystatechange property specifies a function to be 
			   executed every time the status of the XMLHttpRequest object changes */
			xhr.onreadystatechange = function() {
				// Check if the response is ready.
				if (xhr.readyState == 4 && xhr.status == 200) { 
					// Set the content of the specified HTML element to the text received from the server.
					obj.innerHTML = "<span style='color:black'>" + xhr.responseText + "</span>";
				} // end if
			} // end anonymous call-back function
			
			// Open the network connection and send the request to the server taking the requestBody as parameter.
			xhr.send(requestbody);
		} // End nested if.
	} else {
		//Set content of specified html element to the relevant error message.
		obj.innerHTML = "<span><h3 style='color:brown'>" + error + "</h3></span>";
	}	
} // end function

/* Function to tell which PHP file to execute, where to place the data that comes back from
   the server , and what data to send to PHP. This function is called when the user clicks the
   "Display Requests" button. */
function requesting(dataSource, divID, date) {
	//Check if xhr was sucessfully created. Else alert the user.
	if(xhr) {
		//Get the element where information will be displayed.
		var obj = document.getElementById(divID);
		//Set PHP file to execute
		var url = dataSource;
		// Set request body, using function argument, to be sent to the server.
		var requestbody ="date="+encodeURIComponent(date);
		
		/* Initialise a request using POST protocol and the function parameter, dataSource.
		   Parameter async is set to true which means asynchronous access is requested. */
		xhr.open("POST", url, true);
		
		// Set the value of HTTP request header "Content-Type" as "application/x-www-form-urlencoded".
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		/* Response on ready state. The onreadystatechange property specifies a function to be 
		   executed every time the status of the XMLHttpRequest object changes */
		xhr.onreadystatechange = function() {
			// Check if the response is ready.
			if (xhr.readyState == 4 && xhr.status == 200) { 
				// Set the content of the specified HTML element to the text received from the server.
				obj.innerHTML = "<span style='color:black'>" + xhr.responseText + "</span>";
			} // end if
		} // end anonymous call-back function
		
		// Open the network connection and send the request to the server taking the requestBody as parameter.
		xhr.send(requestbody);
	} // End if.
}

// --------------- Input Data Validation ---------------- //

/* Function to check if input value is a positive number greater than 0. 
   Returns an error message if data is invalid. */
function validateBookingNUmberInput(){
	var errorMsg = "";
	var input = document.getElementById("bookingNum").value;
	var pattern = "^[0-9]+$";
	var re = new RegExp(pattern);
	
	if(input.length == 0){
		errorMsg = "The booking number field cannot be empty! Please input a valid booking number and try again.";		
	} else if(!re.test(input)){
		errorMsg = "The booking number is invalid! Please input a valid booking number greater than 0 and try again.";	
	} else if(re.test(input)){
		var n = Math.floor(Number(input));
		
		if(String(n) === input && n < 1){
			errorMsg = "The booking number is invalid! Please input a valid booking number greater than 0 and try again.";	
		}		
	}
	
	document.getElementById("bookingNum").focus();
	
	return errorMsg;
}