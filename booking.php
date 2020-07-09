<!-- This booking.php file receives the data input from the client, processes it, saves it in the database, and sends the data back
     to the client. Information includes a confirmation message with a booking reference number, pickup date and time. -->
<!-- Student name: Amrita Sen -->
<?php
	//Check if form submission is correct. If incorrect, display error message.	
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		/* Check if required fields are not empty. If empty, display error message. This check is provided in case
		   the required HTML attribute does not work in the browser. */
		if(!empty($_POST["firstName"]) && !empty($_POST["lastName"]) && !empty($_POST["phoneNumber"])
		   && !empty($_POST["pickupDate"]) && !empty($_POST["pickupTime"]) && !empty($_POST["streetNum"]) 
	       && !empty($_POST["streetName"]) && !empty($_POST["suburb"]) && !empty($_POST["destinationSuburb"])){
			
			date_default_timezone_set("Pacific/Auckland"); // Set default timezone.
			
			//Get system date and time when booking is made.
			$bookingDate = date("Y-m-d");	
			$bookingTime = date("h:i:sa");	
			
			//Copy user input values for each field to a variable.
			$fName = $_POST["firstName"];
			$lName = $_POST["lastName"];
			$phoneNum = $_POST["phoneNumber"];
			$pickupDate = $_POST["pickupDate"];
			$pickupTime = $_POST["pickupTime"];
			$unitNum = $_POST["unitNum"];
			$streetNum = $_POST["streetNum"];
			$streetName = $_POST["streetName"];
			$suburb = $_POST["suburb"];
			$destinationSuburb = $_POST["destinationSuburb"];
			
			// Include the file with database login details.
			require_once ("../../conf/settings.php");
			
			// The @ operator suppresses the display of any error messages
			// Connect to a MySQL database server or display error message and end script if unable to connect.
			$dbConnection = @mysqli_connect($host,$user,$pswd)
					or die("<p>Failed to connect to server!</p>");
					
			//Use MySQL database or display error message and end script.
			@mysqli_select_db($dbConnection, $dbnm)
					or die("	<p>Database not available!</p>
							</div>");
			
			/* Check if table "taxi_bookings" exists. If the query is unable to be executed, 
			   display error message and end script.*/
			$tableName = "taxi_bookings";		
			$sqlString = "SHOW TABLES LIKE '$tableName';";
			$queryResult = @mysqli_query($dbConnection, $sqlString)
				or die("	<p>Unable to execute the query.</p>"
					   . "  <p>Error code " . mysqli_errno($dbConnection)
					   . ": " . mysqli_error($dbConnection). "</p>");
			
			//Check if table exists. If table does not exist, display error message.		
			if(mysqli_num_rows($queryResult) == 1){			
				// If table exists, set the SQL insert query statement.
				$query = "INSERT INTO $tableName  SET 
									booking_date = '".$bookingDate."',
									booking_time = '".$bookingTime."',
									first_name = '".$fName."',
									last_name = '".$lName."',
									phone_number = '".$phoneNum."',
									unit_number = '".$unitNum."',
									street_number = '".$streetNum."',
									street_name = '".$streetName."',
									suburb = '".$suburb."',
									destination_suburb = '".$destinationSuburb."',
									pickup_date = '".$pickupDate."',
									pickup_time = '".$pickupTime."',
									booking_status = 'unassigned';";									
								
				/* Execute the query and store result into the result pointer.
				   If query is unable to be executed, display error message and end script.*/
				$resultSet = @mysqli_query($dbConnection, $query)
							or die("<p>Unable to execute the query.</p>"
							. "<p>Error code " . mysqli_errno($dbConnection)
							. ": " . mysqli_error($dbConnection). "</p>"); 
				
				// Change format pickup date to Month DD, YYYY, for display in confirmation message.
				$date = date_create($pickupDate);
				$newPickupDateFormat = date_format($date, "F d, Y");
				
				/* Display booking success message with the auto generated booking number retrieved using mysqli_insert_id() function.
				   A link to take the user back to the booking form will also be displayed. */
				echo "<br/><div class=\"w3-container w3-mobile\" align=\"center\">
						<div class=\"w3-card w3-round-xlarge w3-mobile\" style=\"width:60%;\">
							<header class=\"w3-container w3-pale-yellow\" align=\"left\">
								<h3 class=\"w3-text-yellow\">Thank you! Your booking is successful.</h3> 
							</header>
							<div class=\"w3-container w3-light-gray\" align=\"left\">
								<br/>
								<p>Your booking reference number is ". mysqli_insert_id($dbConnection) .". </p>
								<p>You will be picked up in front of your provided address at $pickupTime on $newPickupDateFormat.</p>
								<br/><br/>
							</div>
							</div>
						</div><br/><br/>
					<footer class=\"w3-container w3-center\">
						<p><a href=\"booking.html\">Return to make a booking</a></p>
					</footer>";
			} else { 
				die ("<p>The selected table, \"$tableName\", does not exist in the database!</p>");
			}
	
			//Close connection to the MySQL database server
			mysqli_close($dbConnection); 
		} else {
			// Display error message if any fields are empty.
			echo "<br/><div class=\"w3-container w3-mobile\" align=\"center\">
						<div class=\"w3-card w3-round-xlarge w3-mobile\" style=\"width:60%;\">
							<header class=\"w3-container\" align=\"left\">
									<h3 class=\"w3-text-red\">Oops! Something went wrong :(</h3> 
							</header>
							<div class=\"w3-container\" align=\"left\">
								<p>One or more of the required fields are empty. Please input valid information in all the required fields and try again.</p>
							</div>
						</div>
					</div><br/><br/>
					<footer class=\"w3-container w3-center\">
						<p><a href=\"booking.html\">Return to make a booking</a></p>
					</footer>" ;
		}
	} else {
		die ("	<p>The form submission method seems to be incorrect!</p>");
	}			
?>