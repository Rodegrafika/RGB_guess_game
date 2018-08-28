var numSquares = 6; 
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var clickNumber = 0;


init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset(); 
	setHardAsDefault();
	clickNumber = 0;

}

function setHardAsDefault() {
	modeButtons[1].classList.add("selected");

}

function setUpModeButtons() {
	for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		 this.classList.add("selected");
		 if (this.textContent === "Easy") {
		 	numSquares = 3;
			} else if (this.textContent === "Hard") {
				numSquares = 6;
			} else {
				numSquares = 9;
			}
		 //this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();
		});
	}

}

function setUpSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		clickNumber = clickNumber + 1;
		var clickedColor =  this.style.backgroundColor;
		
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again? ";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			clickNumber = 0;
		} else {
			this.style.backgroundColor = "#e6e8ed";
			messageDisplay.textContent = "Try Again!";
		}
	});
}
	resetButton.addEventListener("click", function(){
		reset();
	});
}

function reset(){
	// figure out hom many square to show 
	colors = generateRandomColors(numSquares);
	//pick a new color
	pickedColor = pickColor(); 
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// set the message to none
	messageDisplay.textContent = "";  
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		// hide the last three squares in easy mode
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	}
	// set the new colors button back to initial
	resetButton.textContent = "New Colors";
	// set the background color of the header back to initial
	h1.style.backgroundColor = "#a9b5ce";

}




function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		// change each color to match the given color
		squares[i].style.backgroundColor = color;
	}

}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array 
	var arr = [];
	//repaet num times
	for(var i = 0; i < num; i++){
		//get random color und push into arr
		arr.push(randomColor()) 
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}