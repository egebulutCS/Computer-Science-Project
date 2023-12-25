// create a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices){
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // add vertex to graph
    addVertex(v){
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }

    // add edge to the graph
    addEdge(v, w){
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
    }

    // Prints the vertex and adjacency list
    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {

            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
}

function initiate() {
    var g = new Graph(9);
    var vertices = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    for (var i = 0; i < vertices.length; i++) {
        g.addVertex(vertices[i]);
    }
    g.addEdge('a1', 'a2');
    g.addEdge('a1', 'b2');
    g.addEdge('a1', 'b1');
    g.addEdge('a2', 'a3');
    g.addEdge('a2', 'b2');
    g.addEdge('a2', 'b1');
    g.addEdge('a2', 'b3');
    g.addEdge('a3', 'b2');
    g.addEdge('a3', 'b3');
    g.addEdge('b1', 'b2');
    g.addEdge('b1', 'c1');
    g.addEdge('b1', 'c2');
    g.addEdge('b2', 'c1');
    g.addEdge('b2', 'c2');
    g.addEdge('b2', 'c3');
    g.addEdge('b2', 'b3');
    g.addEdge('b3', 'c2');
    g.addEdge('b3', 'c3');
    g.addEdge('c1', 'c2');
    g.addEdge('c2', 'c3');
    g.printGraph();
    return [g, g.AdjList];
}

// Primary

var init = initiate();
var graph = init[0];
var AdjList = init[1];
var combination = [];  //combination in the system
var usrCombination = [];  //combination that the user enters
var time;
// var time2;
var timeData = [];  //for gathering time data
// var timeReg1 = [];  //time register 1
// var timeReg2 = [];  //time register 2
// var timeReg3 = [];  //time register 3
// var timeReg4 = [];  //time register 4
// var timeReg5 = [];  //time register 5
// var timeReg = [timeReg1, timeReg2, timeReg3, timeReg4, timeReg5];
var timeReg = [];
// let i = 0;  //time register counter
var pos = [];
var posReg = [];
var sessionID = -1;
var color="rgb(50,50,50)";
var r=0;
var g=0;
var b=0;
var counter=0;
var dot;
var checkbox = false;
var mode = "reg";
var sent = false;
var dots;
var regCounter = 0;

function gridSize(n){
	if(n=="2"){
		dots = ["dot1", "dot2", "dot4", "dot5"];
	} else {
		dots = ["dot1", "dot2", "dot3", "dot4", "dot5", "dot6", "dot7", "dot8", "dot9"];
	}
	makeHid("thankYou");
	makeHid("proceed");
	makeHid("nextTest");
}

function proceedTest(r){
	makeHid("return");
	makeVis("procBut");
	document.getElementById("procBut").innerHTML = ("Number " + r + " proceed to the test.");
}

function proceedTestTr(r){
	makeHid("return");
	makeVis("procBut");
	document.getElementById("procBut").innerHTML = ("Numara " + r + ", teste başlayabilirsin.");
}

function selectVertex(vertex){
	if(usrCombination.length == 0) {
		usrCombination.push(vertex);
		time = new Date();
		//timeData.push(0);
		timeData.push(time.getTime());
		pos.push(getMouseLoc());
		vertexColor(vertex);
		choose();
	} else if (usrCombination.length < 30) {
		var v1 = usrCombination[usrCombination.length-1];
		var v2 = vertex;
		var edges = AdjList.get(v2);
		if(edges.includes(v1)){
			usrCombination.push(v2);
			time = new Date();
			console.log(time.getTime());
			//console.log(time - timeData[timeData.length-1]);
			// time2 = new Date();
			//timeData.push(time - timeData[timeData.length-1]);
			timeData.push(time.getTime());
			//console.log(time2 - time);
			pos.push(getMouseLoc());
			vertexColor(vertex);
			choose();
		}
	}
	//pos.push(getMouseLoc());
	//console.log(usrCombination);
	//return usrCombination;
	//vertexColor(vertex);
}

function submit(){
	if(mode=="reg"){
		regPatt();
	}
	else if(mode=="auth") {
		Authenticate();
	}
}

function Authenticate(){	
	let match = patternMatch();
	if(match && timeCheck()){
		alert("Successful authentication");
	} else {
		alert("Unsuccessful authentication");
	}
	usrCombination = [];
	time = 0;
	time2 = 0;
	timeData = [];
	pos = [];
	color = "rgb(255,255,255)";
	dots.forEach(function (x){
		chameleon(x);
	});
	choose();
}

function patternMatch(){	
	let match = true;
	for(let j = 0; j <= combination.length; j++){
		if (combination[j] != usrCombination[j]){
			match = false;
		}
	}
	return match;
}

function timeCheck(){
    var timemm = [];
    for(let j = 0; j < timeReg[0].length; j++){
		var time = [];
		for(let z = 0; z < timeReg.length; z++){
			time.push((timeReg[z])[j]);
			console.log((timeReg[z])[j]);
			console.log(time);
			console.log(timeReg[z]);
		}
		var max = Math.max(time);
		var min = Math.min(time);
		timemm.push([max, min]);
		console.log(timemm);
    }
    var bool = true;
    for(let j = 0; j < timemm.length; j++){
        if((timemm[j][0] < timeData[j]) || (timemm[j][1] > timeData[j])){
            bool = false;
        }
    }
    return bool;
}

function regPatt(){
	if(usrCombination.length != 12){
		alert("Pattern must be of exactly 12 vertices.");
	} else {
		var reg = true;
		if((combination.length != 0) && (combination.length != usrCombination.length)){
			reg = false;
		} else if(combination.length != 0){
			for(let j = 0; j <= combination.length; j++){
				if(combination[j] != usrCombination[j]){
					reg = false;
				}
			}
		}
		if (reg){
			combination = usrCombination;
			usrCombination = [];
			console.log(combination);
			regCounter++;
			document.getElementById("regCount").innerHTML = regCounter;
			time = 0;
			// time2 = 0;
			// timeReg[i] = timeData;
			timeReg.push(timeData);
			timeData = [];
			posReg.push(pos);
			pos = [];
			// i++;
			// if (i >= 5) {
				// i = 0;
			// }
		} else {
			alert("Your pattern has to be the same as the first one!");
		}
	}
	resetPatt();
}

function resetPatt(){
    usrCombination = [];
    time = 0;
	time2 = 0;
	timeData = [];
	pos = [];
	choose();
	if(mode=="reg"){
		color = "rgb(50,50,50)";
	}
	else if (mode=="auth"){
		color = "rgb(255,255,255)";
	}
	dots.forEach(function (x){
		chameleon(x);
	});
}

function getMouseLoc(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

	//console.log(pageX, pageY);
    return [pageX, pageY];
}

function sendTestData(){
	if(regCounter >= 5){
		if(sessionID >= 0){
			if(sent==false){
				saveData();
				sent=true;
			} else {
				alert("You have already sent your data.");
			}
			makeVis("thankYou");
			makeVis("proceed");
			makeVis("nextTest");
		} else {
			alert("You need to put in your ID.");
			console.log(sessionID);
		}
	} else {
		alert("You need to register at least 5 times to send your data.");
	}
}

function makeVis(s){
	if(document.getElementById(s)!=null){
		document.getElementById(s).style.visibility = "visible";
	}
}

function makeHid(s){
	if(document.getElementById(s)!=null){
		document.getElementById(s).style.visibility = "hidden";
	}
}

function binaryCheckBox(){
	if(checkbox){
		checkbox = false;
	} else {
		checkbox = true;
	}
}

function beginTest(){
	if(checkbox == false){
		alert("You must accept the terms of the experiment to begin!");
	} else {
		window.location.href = "getID.html";
	}
}

function beginTestTR(){
	if(checkbox == false){
		alert("Deneye başlamak için şartları kabul etmeniz lazım!");
	} else {
		window.location.href = "getID-tr.html";
	}
}

function choose(){
	var x = document.getElementById("counter");
	x.innerHTML = usrCombination.length;
}

// Secondary

function vertexColor(v){
	if (counter==0){
		r+=80;
		if (r>256){
			r-=256;
		}
	} else if (counter==1){
		g+=80;
		if (g>256){
			g-=256;
		}
	} else {
		b+=80;
		if (b>256){
			b-=256;
		}
	}
	counter++;
	if (counter>2){
		counter-=3;
	}
	color = "rgb("+r+","+g+","+b+")";
	chameleon(makeDot(v));
	if((r==b) && (g==b) && (r==g)){
		vertexColor(v);
	}
}

function makeDot(v){
	var num;
	if (v.charAt(0)=='a'){
		num = 0 + parseInt(v.charAt(1));
	} else if (v.charAt(0)=='b'){
		num = 3 + parseInt(v.charAt(1));
	} else {
		num = 6 + parseInt(v.charAt(1));
	}
	dot = "dot"+num;
	return dot;
}

function chameleon(dot){
	document.getElementById(dot).style.backgroundColor = color;
}

function changeMode(){
	var x = document.getElementById("mode");
	if (x.innerHTML === "Register Mode") {
		x.innerHTML = "Authentication Mode";
		color = "rgb(255,255,255)";
		dots.forEach(function (x){
			chameleon(x);
		});
		mode = "auth";
	} else {
		x.innerHTML = "Register Mode";
		color = "rgb(50,50,50)";
		dots.forEach(function (x){
			chameleon(x);
		});
		mode = "reg";
	}
}

// Delivery

function saveData(){
	$.post("saveDataTest.php",{
		userId: sessionID,
		combination: JSON.stringify(combination),
		time: JSON.stringify(timeReg),
		position: JSON.stringify(posReg)
	});
	alert("Your data has been recorded. Thank you!\n Continue from below!");
}

function getID() {
    $.post(
        "getData.php",
        { name: "" },
        function(response) {
			var result = parseInt(response);
			if (isNaN(result)){
				result = 0;
			} else {
				result+=1;
			}
			proceedTest(result);
			alert("Your ID for all your tests is " + result);
			sessionID = result;
        }
    );
}

function getIDtr() {
    $.post(
        "getData.php",
        { name: "" },
        function(response) {
			var result = parseInt(response);
			if (isNaN(result)){
				result = 0;
			} else {
				result+=1;
			}
			proceedTestTr(result);
			alert("Bütün testler için kullanacağın ID " + result);
			sessionID = result;
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

function submitID(){
	sessionID = window.prompt("Enter your ID: ");
	if(sessionID!=null){
		alert("Your ID is " + sessionID + ". Please remember your ID for future testing.");
	}else{
		alert("Please enter an ID");
	}
}