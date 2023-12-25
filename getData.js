function getData() {
    $.post(
        "getData.php",
        { name: "" },
        function(response) {
		var result = parseInt(response);
		console.log('Retreived data: ', result+1);
        }
    );  
}
