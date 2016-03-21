var winners = 
[
	['a1', 'a2', 'a3'],
	['b1', 'b2', 'b3'],
	['c1', 'c2', 'c3'],
	['a1', 'b1', 'c1'],
	['a2', 'b2', 'c2'],
	['a3', 'b3', 'c3'],
	['a1', 'b2', 'c3'],
	['c1', 'b2', 'a3']
];

var playerOneMarkings = [];
var playerTwoMarkings = [];
//console.log(winners);
var whosTurn = 1;
var gameHeader = document.getElementById('game-header');
var computer;
var playerMode;

// if (solo.addEventListener){
// 	solo.addEventListener('one-player', onePlayer());
// }else if (pair.addEventListener){
// 	pair.addEventListener('two-player', twoPlayer());
// }
// console.log(solo.addEventListener);

function twoPlayers(){
	computer = false;
	playerMode = 2;
	document.getElementById('game-header').innerHTML = 'Player 1\'s turn!';
	var buttons = document.getElementsByTagName("button");
	for(i=0; i<square.length; i++){
		buttons[i].disabled = false;
		buttons[i].style.pointerEvents = 'auto';
	}

};

function onePlayer(){
	computer = true;
	playerMode = 1;
	document.getElementById('game-header').innerHTML ='Your Turn';

	var buttons = document.getElementsByTagName("button");
	for(i=0; i<square.length; i++){
		buttons[i].disabled = false;
		buttons[i].style.pointerEvents = 'auto';
	}
};


function addSymbol(element){
	if(element.innerHTML == ''){
		//put a symbol in the box.
		if(whosTurn == 1){
			element.innerHTML = 'X';
			whosTurn = 2;
			gameHeader.innerHTML = "It is Player 2's turn.";
			gameHeader.className = 'player-two'
			element.classList.remove('empty');
			element.classList.add('p1');
			playerOneMarkings.push(element.id);
			checkWin();
			if(computer == true){
				computersTurn();
			}
		} else{
			element.innerHTML = 'O';
			whosTurn = 1;
			gameHeader.innerHTML = "It is Player 1's turn."
			gameHeader.className = 'player-one';
			element.classList.remove('empty');
			element.classList.add('p2');
			playerTwoMarkings.push(element.id);
			checkWin();
		}

	}else{
		gameHeader.innerHTML = "This box is taken.";
		gameHeader.style.backgroundColor = "red";
	};
	checkWin();
};
function computersTurn(){
	//It has to be O's turn. Put an O in.
	// Get a random, empty square.
	var arrayOfEmptySquares = document.getElementsByClassName('empty');
 	var randomEmptySquareIndex = Math.floor(Math.random() * arrayOfEmptySquares.length);
 	var element = arrayOfEmptySquares[randomEmptySquareIndex];
	element.innerHTML = 'O';
	whosTurn = 1;
	gameHeader.innerHTML = "It is Player 1's turn";
 	gameHeader.className = 'player-one';
 	element.classList.remove('empty');
 	element.classList.add('p2');
 	playerTwoMarkings.push(element.id);	
 	checkWin();
 }

function checkWin(){

	var rowCount = 0;
	var thisWinCombination;
	var rowCount2 = 0;

	for(i=0; i<winners.length; i++){
		rowCount = 0;
		rowCount2 = 0;
		thisWinCombination = winners[i];
		for(j=0; j<thisWinCombination.length; j++){
			//check if this square of the win combo we are on is in the player's marking.
			if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1){
				rowCount++;
			};
			if(playerTwoMarkings.indexOf(thisWinCombination[j]) > -1){
			rowCount2++;
			};
	
		};

		if (rowCount === 3) {
			gameOver(thisWinCombination, 1);

		}else if (rowCount2 === 3) {
			gameOver(thisWinCombination, 2);
		};
	};

	// for(i=0; i<winner.length; i++){
	// 	rowCount=0;
	// 	for(j=0; j<thisWinCombination.length; i++){
	// 		if(playerTwoMarkings.indexOf(thisWinCombination[j]) > -1){
	// 			rowCount++;
	// 		};
	// 	};
	// 	if (rowCount == 3) {
	// 		gameOver(thisWinCombination);
	// }
};

function gameOver(combo, player){
 	for(i=0; i<combo.length; i++){
 		document.getElementById(combo[i]).classList.add('winner');
		
 	};
 	gameHeader.innerHTML = "Player " + player + " , won the game!";
 
 };


var buttons = document.getElementsByTagName('button');
for(i=0; i<buttons.length; i++){
	buttons[i].disabled = true;

	buttons[i].style.pointerEvents = 'none';
}




var squareWidth = document.getElementById('a1').clientWidth;
var squares = document.getElementsByClassName('square');
for(i=0; i<squares.length; i++){
	squares[i].style.height = squareWidth + 'px';
}



// function disableContent(){
// 	if (gameOver == true){
// 		document.getElementById("a1,a2,a3,b1,b2,b3,c1,c2,c3").disabled=true
// 	};	
// };

// var Enabled=true;
// function disableContent{
//  if (gameOver == false){
// 	checkWin();
// }else{

// }
// }

// var squareWidth = document.getElementById('a1').clientWidth;
// var squares = document.getElementByClassName('square');
// for(i=0; i<squares.length; i++){
// 	squares[i].style.height = squareWidth + 'px';
// }
