# Taxi-Booking-System
A simple web-based taxi booking system called CabsOnline developed using simple Ajax techniques (JavaScript, HTML, XMLHttpRequest, CSS, and DOM), PHP and MySQL on the server.

CabsOnline, via its booking component, allows passengers to book taxi services from any of their internet connected computers or mobile phones. It also has an admin component that allows its administrative staff to view pickup requests that are within the next 2 hours and, to assign a taxi to a booking using an input reference number. 

<b>Note:</b> The two components are intentionally kept separate and access to the other component is not provided in either web page. This is to restrict access to the administration page as it does not require authentication. Each page can be accessed via its URL.
<br><br>
<b>Suggested browser:</b> Chrome.

<b>List of files in the system:</b>
1.	booking.html
2.	booking.js
3.	booking.php
4.	admin.html
5.	admin.js
6.	display.php
7.	assign.php
8.	xhr.js
9.	MySqlCode.txt
10.	CarLogo.JPG (Created online)
11.	stylesheet.css
12.	w3.css (W3.CSS is a modern CSS framework with support for desktop, tablet, and mobile design by default)

<b>How to use the system:</b><br><br>
<b>1.	Booking Component (booking.html):</b><br>
1.1.	The web page displays a simple “Book a Cab” form divided into 3 sections: Passenger information, Pickup Details and Drop off details.<br> 
1.2.	Information must be entered into all fields marked with a red *. This is specified at the top of the form.<br>
1.3.	The pattern criteria for input into each required field is displayed when the mouse hovers over the text box of that field. By default, the current date and time will be displayed for the pickup date and time respectively.<br>
1.4.	To submit the form, click the “Make Booking” button provided at the bottom of the form.<br>
1.5.	If the form contains invalid information or if any required field is empty, the form will not be submitted, and the user will be prompted to input the information and submit the form again.<br>
1.6.	If the information is successfully submitted, a booking confirmation message, with the booking reference number, will be displayed on the same page, replacing the form. A link to the form is provided below the message in case the user wants to make another booking.<br>

<b>Screenshots:</b>

<b>The booking form:</b>

![image](https://user-images.githubusercontent.com/52112568/87094014-4103c000-c292-11ea-8a43-45b679fc2e17.png)

<br><b>If trying to submit the form with an empty mandatory field:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87094055-54169000-c292-11ea-82ef-c66a8442f437.png)

<br><b>If trying to submit the form with an invalid text field:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87094110-71e3f500-c292-11ea-8fd9-a194a8a0f945.png)

<br><b>If trying to submit the form with an invalid pickup date:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87094128-7c9e8a00-c292-11ea-8464-81583b56c7f5.png)

<br><b>If trying to submit the form with an invalid pickup time:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87094162-87591f00-c292-11ea-8137-99380f606a18.png)

<br><b>Confirmation after successful form submission:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87094187-93dd7780-c292-11ea-9cb3-68a3229e9597.png)

<b>2.	Admin Component (admin.html - No authentication required):</b><br>	
2.1.	The web page displays 2 main sections – “Display Pickup Requests” and “Assign Taxi”.<br>
2.2.	To display all requests with a pickup time within the next 2 hours, the user must click the “Display Requests” button provided in the “Display Pickup Requests” section.<br>
2.3.	The requests, if any, will be displayed below the form on the same page in a tabular format, with information of each booking on a separate row. If there are no results to display, a message  saying so will be displayed on the page.<br>
2.4.	To assign a taxi, the user must input a booking reference number in the text box and click the “Assign Taxi” button, both provided in the “Assign Taxi” section.<br>
2.5.	The pattern criteria for input is displayed when the mouse hovers over the text box of the field.<br>
2.6.	If the input is invalid or if no input is provided, an appropriate message will be displayed on the same page and the user will be prompted to input the information and submit the form again.<br>
2.7.	If the information is valid, a confirmation message will be displayed.<br>

<b>Screenshots:</b>

<b>The admin page:</b>

![image](https://user-images.githubusercontent.com/52112568/87094219-a3f55700-c292-11ea-8b3b-1fc61c3cbed9.png)

<b>When a user chooses to display requests:</b>

<b>If there are requests to display:</b>

![image](https://user-images.githubusercontent.com/52112568/87094248-af488280-c292-11ea-9ff3-157bbc6ae773.png)

<b>If there are no requests to display:</b>

![image](https://user-images.githubusercontent.com/52112568/87094306-c4251600-c292-11ea-86a7-1736f82205ea.png)

<br><b>When a user chooses to assign a taxi:</b><br>

![image](https://user-images.githubusercontent.com/52112568/87097219-cbe7b900-c298-11ea-9635-e62f0ead2b3b.png)

<b>When a user tries to assign a taxi with invalid input:</b>

![image](https://user-images.githubusercontent.com/52112568/87094337-d56e2280-c292-11ea-9aa4-c33208e69032.png)

<b>When a user tries to assign a taxi with a booking number but it has already been assigned a taxi:</b>

![image](https://user-images.githubusercontent.com/52112568/87094383-e9b21f80-c292-11ea-8cd5-7dc043e872f8.png)

<b>When a user tries to assign a taxi with a booking number but the booking number does not exist in the database:</b>

![image](https://user-images.githubusercontent.com/52112568/87094422-f9316880-c292-11ea-98b0-ce7b65185bb8.png)

<b>When a taxi has been successfully assigned:</b>

![image](https://user-images.githubusercontent.com/52112568/87094362-e028b780-c292-11ea-9c85-fd84ee579166.png)






