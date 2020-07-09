<!-- This display.php file retrieves all "unassigned" bookings with a pickup time within 2 hours from the database. For 
     each found request, the booking reference number, customer name, contact phone, pick-up suburb, destination suburb, 
	 and pick-up date/time are returned to the client in a tabular format. -->
<!-- Student name: Amrita Sen -->
<?php
	//Check if form submission is correct. If incorrect, display error message.	
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		// Sets time zone
		date_default_timezone_set("Pacific/Auckland");
		
		// Sets up the pickup date, time and +2hour info to check against.
		$currentDate = date("Y-m-d");
		$currentTime = date("H:i:s");
		$timeX2 = date("H:i:s", strtotime("+2 hours"));
		
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
			// If table exists, set select query statement to retrieve bookings with pickup time within 2 hours of current time.
			$query = "SELECT booking_number, first_name, last_name, phone_number, suburb, destination_suburb, pickup_date, pickup_time 
					  FROM $tableName 
					  WHERE booking_status = 'unassigned' 
					  AND pickup_date = '$currentDate' AND pickup_time BETWEEN '$currentTime' AND '$timeX2'";
		
			/* Execute the query and store result into the result pointer.
			   If query is unable to be executed, display error message and end script.*/
			$resultSet = @mysqli_query($dbConnection, $query)
						or die("<p>Unable to execute database query 1.</p>"
						. "<p>Error code " . mysqli_errno($dbConnection)
						. ": " . mysqli_error($dbConnection). "</p>"); 
			
			//Check if entries with matching search criteria exist in the table. If no matching entries found, display message.				
			if(mysqli_num_rows($resultSet) > 0) {
				echo "<h3 style='color: brown;'>Pickup Requests</h3>";	// Heading to be displayed with matching entries.
				
				/*Retrieve all results from $resultSet and copy to variable $row.
				  If query is unable to be executed, display error message and end script.*/
				$row = @mysqli_fetch_row($resultSet)
					or die("	<p>Unable to execute the query.</p>"
						 . "	<p>Error code " . mysqli_errno($dbConnection)
						 . ": " . mysqli_error($dbConnection). "</p>
						</div>");
				
				// Create the table to display the output of the query
				echo "<table border='1' style='table-layout: fixed; text-align:center; class='center'>
						<tr style ='color: black;'>
							<th>Booking Number</th>
							<th>Customer First Name</th>
							<th>Customer Last Name</th>
							<th>Customer Phone</th>
							<th>Pickup Suburb</th>
							<th>Destination Suburb</th>
							<th>Pickup Date</th>
							<th>Pickup Time</th>
						</tr>";

				// Iterate through each row and retrieve the information relevant to the query and display it in the table.
				while($row){
					echo "<tr>";
					
					//For each retrieved row, loop through the column data and display each input in a tabular cell.
					for($i = 0; $i < 8; $i++){
						echo "<td style=\"text-align:center; max-width: 350px; word-wrap: break-word;\">".$row[$i]."</td>";
					}
							
					echo "</tr>";						
						
					$row = mysqli_fetch_row($resultSet);						
				}	
				
				echo "</table><br/>";
			} else {
				echo "<h3 style='color: brown;'>No pickup requests to display.</h3>";
			}
		} else { 
			die ("<p>The selected table does not exist in the database!</p>");
		}
		
		//Close connection to the MySQL database server
		mysqli_close($dbConnection); 
	} else {
		die ("	<p>The form submission method seems to be incorrect!</p>");
	}	
?>