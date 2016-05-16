// end function is used to for game's terminal
function end(result) {
	switch (result) {
		case 1:
			$(".cell").off("click");
		    document.getElementById("result").innerHTML = "You win!";
		    document.getElementById("newstart").innerHTML = "Play again?";
		    break;
		case 2:
			$(".cell").off("click");
		    document.getElementById("result").innerHTML = "You lose!";
		    document.getElementById("newstart").innerHTML = "Play again?";
		    break;
		case 0:
			$(".cell").off("click");
		    document.getElementById("result").innerHTML = "It is a draw";
		    document.getElementById("newstart").innerHTML = "Play again?";
		    break;
	}
}

//initialize the game
function start(level) {
	var newgame = new grid();
	document.getElementById("status").innerHTML = "It is your turn";
	$(".cell").each(function() {
    	var $this = $(this);
    	var result;
    	var temp;
    	$this.click(function() {
    		if (this.innerHTML == "O" || this.innerHTML == "X") {
    			window.alert("Please put on an empty cell");
    		} else {
    			document.getElementById("status").innerHTML = "";
    			this.innerHTML = "O";
		        newgame.setcell1(this.id);
		        result = newgame.judge();
		        if (result == 1) {
		        	return end(1);
		        }
		        result = newgame.emptycells();
		        if (result.length == 0){
		        	return end(0);
		        }
		        if (level == "easy") {
		        	newgame.computerMove();
		        } else {
		        	temp = newgame.chooseMove(true);
			        newgame.setcell2(temp.move);
			        var a = temp.move;
			        document.getElementById(a).innerHTML = "X";
		        }		        		        
		        result = newgame.judge();
		        if (result == 2) {
		        	return end(2);
		        }
		        result = newgame.emptycells();
		        if (result.length == 0){
		        	return end(0);
		        }
		        document.getElementById("status").innerHTML = "It is your turn again"
    		}
	        
     	})
 	});
}

$("#easy, #hard, .start, #newstart").hover(function(){
	$(this).css("color", "red");
	}, function(){
	$(this).css("color", "#ffb3b3");
});

$(".start").click(function(){
	this.innerHTML = "";
	document.getElementById("select").innerHTML = "Select your level";
	document.getElementById("hard").innerHTML = "Hard";
	document.getElementById("easy").innerHTML = "Easy";
});

$("#hard").click(function(){
	document.getElementById("select").innerHTML = "";
	document.getElementById("hard").innerHTML = "";
	document.getElementById("easy").innerHTML = "";
	start("hard");
});

$("#easy").click(function(){
	document.getElementById("select").innerHTML = "";
	document.getElementById("hard").innerHTML = "";
	document.getElementById("easy").innerHTML = "";
	start("easy");
});

$("#newstart").click(function(){
	for (var i = 0; i < 9; i++) {
		document.getElementById(i).innerHTML = "";
	}
	document.getElementById("newstart").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	document.getElementById("select").innerHTML = "Select your level";
	document.getElementById("hard").innerHTML = "Hard";
	document.getElementById("easy").innerHTML = "Easy";
});


