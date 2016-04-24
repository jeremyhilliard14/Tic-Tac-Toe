var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
var winners = [];
var playerOneMarkings = [];
var playerTwoMarkings = [];
var whosTurn = 1;
var gameHeader =  $('#game-header');//document.getElementById('game-header')
var computer;
var playerMode;
var winsPlayerOne;
var winsPlayerTwo;

// $(document).ready(function(){

	$('.difficulty :button').click(function(){
		var diff = $(this).val();
		console.log(diff);
		var winnersInside = [];

		if(diff == 'easy'){
			var rowSize = 3;
			var gridSize = rowSize;

			for(i=1; i<=gridSize; i++){
				winnersInside = [];
				for(j=0;j<gridSize; j++){
					winnersInside.push(alpha[j]+i);

				}
				winners.push(winnersInside);
			}		
			console.log(winners);			
		}else if(diff == 'med'){
			gridSize = 4
		}

		// 	// var rowSize = 4;
		// 	// var gridSize = rowSize;
		// 	// for(i=1; i<=gridSize; i++){
		// 	// 	winnersInside = [];
		// 	// 	for(j=0;j<gridSize; j++){
		// 	// 		winnersInside.push(alpha[j]+i);

		// 	// 	}
		// 	// 	winners.push(winnersInside);
		// 	}	
		console.log(winners);				
		// }else if(diff == 'hard'){
		// 	var rowSize = 5;
		// 	var gridSize = rowSize;
		// 	for(i=1; i<=gridSize; i++){
		// 		winnersInside = [];
		// 		for(j=0;j<gridSize; j++){
		// 			winnersInside.push(alpha[j]+i);

		// 		}
		// 		winners.push(winnersInside);
		// 	}	
		// 	console.log(winners);				
		// }
		// htmlToAppend = '';
		// for(i=0; i<winners.length; i++){
		// 	htmlToAppend += '<div class="row row'+i+'">';
		// 	for(j=0;j<=gridSize; j++){
		// 		htmlToAppend += '<button disabled class="left square empty" id="'+winners[i][j]+'"></button>';
		// 	}
		// 	htmlToAppend += '</div>';
		// }

		// $('#board-wrapper').html(htmlToAppend);

	});


		
		// $('#button-bucket').toggle();
		// gameTiles = cards.slice(0,(gridSize/2));


		// for(i = 0; i < gridArray.length; i++){
		// 	var html = '<div class="mg-tile">';
		// 			html += '<div class="mg-tile-inner unmatched flipped">';
		// 				html +='<div class="mg-tile-outside"></div>';
		// 				html += '<div class="mg-tile-inside">' + gridArray[i] + '</div>';
		// 			html +=	'</div>'
		// 		html += '</div>'
		// 	$('#mg-contents').append(html);
		// }

	function onePlayer(){
		computer = true;
		playerMode = 1;
		// document.getElementById('game-header').innerHTML = 'Your turn!';
		$('#game-header').html('Your turn!');
		// var buttons = document.getElementsByTagName("button");
		var buttons = $(':button');
		for(i=0; i<buttons.length; i++){
			buttons[i].disabled = false;
		}
	}

	function twoPlayers(){
		computer = false;
		playerMode = 2;
		$('#game-header').html('Player 1\'s turn!');
		// document.getElementById('game-header').innerHTML = 'Player 1\'s turn!';
		var buttons = document.getElementsByTagName("button");
		// var buttons = $(':button');
		for(i=0; i<buttons.length; i++){
			buttons[i].disabled = false;
		}
	}



	function addSymbol(element){
		if(element.innerHTML == ''){
		// if($(this).html() == ''){
			//Put a symbol in... X or O?
			if(whosTurn == 1){
				//It's X's turn. So, we have an empty square, and it's X's turn. Put an X in.
				element.innerHTML = 'X';
				// $(this).html('X');
				whosTurn = 2;
				// gameHeader.innerHTML = "It is Player 2's turn";
				$('#game-header').html("It is Player 2's turn");
				gameHeader.className = 'player-two';
				//Get rid of class 'empty', and add who took the square
				element.classList.remove('empty');

				element.classList.add('p1');
				playerOneMarkings.push(element.id);
				checkWin();
				//Only run computersTurn, if the user chose 1 player
				if(computer == true){
					// setTimeout(computersTurn, 3000);
					computersTurn();
				}


			}else{
			//Otherwise run players turn.
				//It has to be O's turn. Put an O in.
				element.innerHTML = 'O';
				whosTurn = 1;
				// gameHeader.innerHTML = "It is Player 1's turn";
				$('#game-header').hmtl("It is Player 1's turn");
				gameHeader.className = 'player-one';
				element.classList.remove('empty');
				element.classList.add('p2');
				playerTwoMarkings.push(element.id);
				checkWin();
			}
		}else{
			// gameHeader.innerHTML = "This box is taken";
			$('#game-header').html("This box is taken");
			// gameHeader.className = 'red';
			$('#game-header').remove('.red');
		}
		checkWin();
	}

	function computersTurn(){
		//It has to be O's turn. Put an O in.
		// Get a random, empty square.
		// var arrayOfEmptySquares = document.getElementsByClassName('empty');
		var arrayOfEmptySquares = $('.empty');
		// var randomEmptySquareIndex = Math.floor(Math.random() * arrayOfEmptySquares.length);
		var randomEmptySquareIndex = Math.floor(Math.random() * $('.empty').length);
		// var element = arrayOfEmptySquares[randomEmptySquareIndex];
		var element = $('.empty')[randomEmptySquareIndex];
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
		//Define a variable, and if it gets to 3, then we have a winner. If it doesn't, the row is not complete.
		var rowCount = 0;
		var playerTwoRowCount = 0;
		var thisWinCombination;
		//Loop through all winning possibilities. RowCount needs to restart each time. 
		for(i=0; i<winners.length; i++){
			rowCount = 0;
			playerTwoRowCount = 0;
			thisWinCombination = winners[i];
			//Now, let's check if all the elemtns in the winners array, exist in the current player array (playerOneMarkings or playerTwoMarkings)
			for(j=0; j<thisWinCombination.length; j++){
				//Check if this square of the win combo we are on, is in the player's marking
				if(playerOneMarkings.indexOf(thisWinCombination[j]) > -1){
					//HIT!!!!
					rowCount++;
				}
				if(playerTwoMarkings.indexOf(thisWinCombination[j]) > -1){
					//HIT!!!!
					playerTwoRowCount++;
				}

			}
			if(rowCount === 3){
				//Player 1 won!!!!
				gameOver(thisWinCombination, 1);
			}else if(playerTwoRowCount === 3){
				gameOver(thisWinCombination, 2);			
			}
		}
	}


	function gameOver(combo, playerWhoWon){
		for(i=0; i<combo.length; i++){
			// console.log(combo[i]);
			document.getElementById(combo[i]).classList.add('winner');
		}
		// gameHeader.innerHTML = 'Player ' + playerWhoWon + ' , won the game!';
		gameHeader.html('Player' + playerWhoWon + ' , won the game!');

		// var buttons = document.getElementsByTagName("button");
		var buttons = $(':button');
		for(i=0; i<buttons.length; i++){
			buttons[i].disabled = true;
		}
		//Give the user a button to click on, to reset the board. When they click on it

		// Update wins counter for the winning playerOneMarkings
		if(playerWhoWon==1){
			winsPlayerOne++;
		}else{
			winsPlayerTwo++;
		}
		// document.getElementById('play-again-button').disabled = false;
		$('#play-again-button').attr('disabled')
		// document.getElementById('play-again').style.display = 'block';
		$('#play-again').css('dislay', 'block');
	}

	function resetGame(){
		// Clear Player Arrays
		playerOneMarkings = [];
		playerTwoMarkings = [];
		
		// var buttons = document.getElementsByClassName("square");
		var buttons = $('.square');
		// Clear innerHTML of squares
		for(i=0; i<buttons.length; i++){
			// buttons[i].innerHTML = '' ;
			buttons[i].html('');
			// buttons[i].classList.add('empty');
			buttons[i].addClass('.empty');
			// buttons[i].classList.remove('winner');
			buttons[i].removeClass('.winner');
		}
		//Enable the one and two player buttons
		// document.getElementById('one-player').disabled = false;
		$('#one-player').attr('disabled');
		// document.getElementById('two-players').disabled = false;	
		$('#two-players').attr('disabled');
		//hide the play again button
		// document.getElementById('play-again').style.display = 'none';
		$('#play-again').css('display', 'none');
	}

// });

var squareWidth = $('#a1').width();
$('#square').each(function(){
	$(this.css('height', squareWidth + 'px'));
});
