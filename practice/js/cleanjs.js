var winners = [
	['a1', 'a2', 'a3'],
	['b1', 'b2', 'b3'],
	['c1', 'c2', 'c3'],
	['a1', 'b1', 'c1'],
	['a2', 'b2', 'c2'],
	['a3', 'b3', 'c3'],
	['a1', 'b2', 'c3'],
	['c1', 'b2', 'a3'],
];
var playerOneMarkings = [];
var playerTwoMarkings = [];
//console.log(winners);
var whosTurn = 1;

function setMark(element){
	var gameHeader = document.getElementById('game-header');
	if(element.innerHTML == ''){
		gameHeader.className = '';
		//put a symbol in the box.
		if(whosTurn == 1){
			element.innerHTML = 'X';
			whosTurn = 2;
			gameHeader.innerHTML = "It is Player 2's turn.";
			gameHeader.className = 'player-two'
			element.classList.remove('empty');
			element.classList.add('p1');
			playerOneMarkings.push(element.id);

		} else{
			element.innerHTML = 'O';
			whosTurn = 1;
			gameHeader.innerHTML = "It is Player 1's turn."
			gameHeader.className = 'player-one';
			element.classList.remove('empty');
			element.classList.add('p2');
			playerTwoMarkings.push(element.id);
		}	
	}else{
		gameHeader.innerHTML = "This box is taken.";
		gameHeader.style.backgroundColor = "red";
	}
	checkWin();

}

function checkWin(){

}


// var squareWidth = document.getElementById('a1').clientWidth;
// var squares = document.getElementByClassName('square');
// for(i=0; i<squares.length; i++){
// 	squares[i].style.height = squareWidth + 'px';
// }


