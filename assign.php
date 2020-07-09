<!-- This assign.php file takes in a request for assigning a taxi, makes an update to the MySQL database to change the status of 
	 the booking request that matches the given booking reference number from “unassigned” to “assigned”, and returns confirmation 
	 information to the client  -->
<!-- Student name: Amrita Sen -->
<?php
	//Check if form submission is correct. If incorrect, display error message.	
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		// Copy user input in to variable.
		$bookingNum = $_POST["bookingNum"];
		
		// Include the file with database login details.
		require_once ("../../conf/settings.php");
			
		// The @ operator suppresses the display of any error messages
		// mysqli_connect returns false if connection failed, otherwise a connection value
		$dbConnection = @mysqli_connect($host,$user,$pswd)
						or die('Failed to connect to server');
		
		//Use MySQL database or display error message and end script.
		@mysqli_select_db($dbConnection, $dbnm)
			or die('Database not available');

		/* Check if table "taxi_bookings" exists. If the query is unable to be executed, 
			display error message and end script.*/
		$tableName = "taxi_bookings";		
		$sqlString = "SHOW TABLES LIKE '$tableName';";
		$queryResult = @mysqli_query($dbConnection, $sqlString)
			or die("<p>Unable to execute the query.</p>"
			. "<p>Error code " . mysqli_errno($dbConnection)
			. ": " . mysqli_error($dbConnection). "</p>");
		
		//Check if table exists. If table does not exist, display error message.	
		if(mysqli_num_rows($queryResult) == 1){					
			// If table exists, set select query statement to retrieve a booking with the specified booking number.
			$query1 = "SELECT * FROM $tableName WHERE booking_number = '$bookingNum'";
			
			/* Execute the query and store result into the result pointer.
			   If query is unable to be executed, display error message and end script.*/
			$resultSet1 = @mysqli_query($dbConnection, $query1)
						or die("<p>Unable to execute database query 1.</p>"
						. "<p>Error code " . mysqli_errno($dbConnection)
						. ": " . mysqli_error($dbConnection). "</p>"); 
			
			//Check if a matching entry exists in the table. If not found, display message.			
			if(mysqli_num_rows($resultSet1) > 0) {				
				/* If a matching enrty exists, set select query statement to retrieve a booking with the specified booking number
				   and booking status. */
				$query2 = "SELECT * FROM $tableName WHERE booking_number = '$bookingNum' AND booking_status = 'assigned'";

				/* Execute the query and store result into the result pointer.
			       If query is unable to be executed, display error message and end script.*/
				$resultSet2 = @mysqli_query($dbConnection, $query2)
							or die("<p>Unable to execute database query 2.</p>"
							. "<p>Error code " . mysqli_errno($dbConnection)
							. ": " . mysqli_error($dbConnection). "</p>"); 

				//Check if a matching entry exists in the table.  
				if(mysqli_num_rows($resultSet2) > 0) {
					//Display the "taxi has been assigned" message.
					echo "<h3 style='color: brown;'>A taxi has already been assigned to this booking request!</h3>";
				} else {
					// Otherwise update the booking number to assigned
					$query3 = "UPDATE $tableName SET booking_status = 'assigned' WHERE booking_number = $bookingNum";
					$resultSet3 = @mysqli_query($dbConnection, $query3)
								or die("<p>Unable to execute database query 3.</p>"
								. "<p>Error code " . mysqli_errno($dbConnection)
								. ": " . mysqli_error($dbConnection). "</p>"); 
					
					// Display confirmation message.
					echo "<h3 style='color: brown;'>The booking request $bookingNum has been properly assigned!</h3>";
				} 
			} else {
				// Otherwise the booking number was not found
				echo "<h3 style='color: brown;'>The booking request, to assign a taxi, not found!</h3>";
			}
		} else {
				// Otherwise the table was not found
			echo "<p>Specified table not found in the database.</p>";
		}
	} else {
		die ("	<p>The form submission method seems to be incorrect!</p>");
	}	
?>