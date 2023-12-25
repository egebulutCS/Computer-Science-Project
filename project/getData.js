function getData() {
    $.post(
        "getData.php",
        { name: "" },
        function(response) {
		var result = parseInt(response);
		if(isNaN(result)){
			result = 0;
		} else {
			result+=1;
		}
		console.log('Retreived data: ' + result);
        }
    );  
}

// Native implementation
function isNaN(x) {
  // Coerce into number
  x = Number(x);
  // if x is NaN, NaN != NaN is true, otherwise it's false
  return x != x;
}
