var playerTurn = 1;


function setMark(element) {
	var imgFile;
	var selected = element.getAttribute('sel');
	console.dir(element);
	if (selected !== "y"){
		element.setAttribute('sel', 'y');
		if (player === 1){
			imgFile = "css/o.png";
			player = 2;
		} else{
			imgFile = 'css/x.png';
			player = 1;
		}
		element.childres[0].src = imgFile;
		document.getElementById('turn').innerHTML = "Player's " + player + " turn.";
	}
}

// var icons = document.getElementById('app-icons');
//        if(icons.style.display == 'block')
//           icons.style.display = 'none';
//        else
//           icons.style.display = 'block';
//   }
// 	alert("clicked on " + element);
// }