function saveData(){
	$.post("saveDataTest.php",{
		userId: 340,
		combination: '["a1","a2","a3","b3","b2"]',
		time: '[0,130,260,390,420]',
		position: '[[120,30],[130,60],[130,90],[160,90],[160,60]]'
	});
}
