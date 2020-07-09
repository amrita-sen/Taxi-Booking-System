/* Function to create an XMLHttpRequest object, based on the type of browser, that can be used to 
   request data from the web server. Returns a valid XHR object.
   Student name: Amrita Sen */
   
function createRequest() {
    var xhr = false;  
	
	// Check if it uses a “native” XMLHttpRequest object.
    if (window.XMLHttpRequest) {
		// code for modern browsers
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // Or check if it uses ActiveX control
		// code for old IE browsers
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
    return xhr;
} // end function createRequest()