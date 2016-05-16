/*
grid object is the major part of game program
its property--board is used for represent game progress
its methods are applied to control computer to move and check game status
*/
var grid = function(){

	/*
	9 cells are represented by a array of 9 elements, 0 stands for empty
	1 stands for player's move and 2 stands for computer's move
	*/
	this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	//1 stands for player's move
	this.setcell1 = function(index) {
		this.board[index] = 1;
	}

	//2 stands for computer's move
	this.setcell2 = function(index) {
		this.board[index] = 2;
	}

	//check the remaining empty cells, return a array of empty cells' indice
	this.emptycells = function() {
		var result = [];
		for (var i = 0; i < 9; i++) {
			if (this.board[i] == 0) {
				result.push(i);
			}
		}
		return result;
	}

	//control computer to achieve a random move
	this.computerMove = function() {
		var result = this.emptycells();
		var n = result.length - 1;
		var moveIndex = Math.floor(Math.random() * n);
		document.getElementById(result[moveIndex]).innerHTML = "X";
		this.setcell2(result[moveIndex]);
	}

	this.move = function(side, index) {
		if (side == true) {
			this.setcell2(index);
		}
		if (side == false) {
			this.setcell1(index);
		}
	}

	//check the status of the game, return 1, 2 or 3.
	//1 stands for play's win, 2 stands for computer's win, 3 stands for a draw
	this.judge = function() {
		for (var i = 0; i <= 6; i = i + 3) {
			if (this.board[i] == 1 && this.board[i] == this.board[i + 1] && this.board[i + 2] == this.board[i]) {
				return 1;
			}
		}

		for (var i = 0; i <= 2; i = i + 1) {
			if (this.board[i] == 1 && this.board[i + 3] == this.board[i] && this.board[i + 6] == this.board[i]) {
				return 1;
			}
		}

		if (this.board[0] == 1 && this.board[4] == this.board[0] && this.board[8]  == this.board[0]) {
			return 1;
		}

		if (this.board[2] == 1 && this.board[4] == this.board[2] && this.board[6]  == this.board[2]) {
			return 1;
		}

		for (var i = 0; i <= 6; i = i + 3) {
			if (this.board[i] == 2 && this.board[i] == this.board[i + 1] && this.board[i + 2] == this.board[i]) {
				return 2;
			}
		}

		for (var i = 0; i <= 2; i = i + 1) {
			if (this.board[i] == 2 && this.board[i + 3] == this.board[i] && this.board[i + 6] == this.board[i]) {
				return 2;
			}
		}

		if (this.board[0] == 2 && this.board[4] == this.board[0] && this.board[8]  == this.board[0]) {
			return 2;
		}

		if (this.board[2] == 2 && this.board[4] == this.board[2] && this.board[6]  == this.board[2]) {
			return 2;
		}

		return 3;
	}

	// minimax algorithm is applied here to control computer's next move
	//reference: UC Berkeley 61B Lecture notes
	this.chooseMove = function(side) {
		var myBest = new best(); //my best move
		var reply; //opponent's best reply
		var status = this.judge();

		if (status == 1){
			myBest.score = -1;
			return myBest;
		}
		if (status == 2) {
			myBest.score = 1;
			return myBest;
		}
		
		var avail = this.emptycells(); //all the legal moves

		if (avail.length == 0) {
			myBest.score = 0;
			return myBest;
		}

		if (side == true) {
			myBest.score = -1;
		} else if (side == false) {
			myBest.score = 1;
		}		

		// a loop is used to perform all the legal moves
		for (var i = 0; i < avail.length; i++) {
			this.move(side, avail[i]); //next move
			reply = this.chooseMove(!side); //recursion for game tree search
			this.board[avail[i]] = 0; //undo the move
			if (side == true && reply.score > myBest.score) {
				myBest.score = reply.score;
				myBest.move = avail[i];
			}
			if (side == false && reply.score < myBest.score) {
				myBest.score = reply.score;
				myBest.move = avail[i];
			}
		}
		return myBest;
	}

};

//best object is applied in grid.chooseMove() function, used for return type
//it is holds a record of the best move and its score
var best = function(){
	this.score = 0;
	this.move = 0;
};




