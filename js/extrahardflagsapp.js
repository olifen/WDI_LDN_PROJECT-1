document.addEventListener("DOMContentLoaded", function(event) {

  var flags1 = document.querySelectorAll('#player1Board .flag img');
  var flags2 = document.querySelectorAll('#player2Board .flag img');
  var pileFlags = document.querySelectorAll('img.pile');
  var countryInputs = document.getElementsByClassName("countryInput");
  var player1Flags = [];
  var player2Flags = [];
  var inputs = document.getElementsByClassName("countryInput");
  var turn = "player 2";
  var flagToReplaceIndex = 4;
  var flag = flagsExtraHard.splice(0, 1);
  var player1Score = 0;
  var player2Score = 0;
  var flagImage = document.getElementsByClassName("flagImage");


  // shuffles the cards at the beginning of the game
  function shuffle() {
    var flagIndex = flagsExtraHard.length;
    var index;
    var temp;

    while (flagIndex > 0) {
      index = Math.floor(Math.random() * flagIndex);
      flagIndex--;
      temp = flagsExtraHard[flagIndex];
      flagsExtraHard[flagIndex] = flagsExtraHard[index];
      flagsExtraHard[index] = temp;
    }
  }

// deals 4 cards into each player's board
  function deal() {
    for(var i=0; i<=3; i++) {
      player1Flags.push(flagsExtraHard.pop());
      player2Flags.push(flagsExtraHard.pop());
    }
  }

  function setBoard() {
    for(var i=0;i<4;i++) {
      flags1[i].src = player1Flags[i].image;
      flags1[i].setAttribute('data-answer', player1Flags[i].country);

      flags2[i].src = player2Flags[i].image;
      flags2[i].setAttribute('data-answer', player2Flags[i].country);
    }

    pileFlags[0].src = flagsExtraHard[0].image;
    pileFlags[1].src = flagsExtraHard[1].image;
  }

// checks to see if text in input box matches the country name
  function checkAnswer (index) {
    var userAnswer = countryInputs[index].value;
    if (userAnswer === player1Flags[index].country) {
      countryInputs[index].style.backgroundColor = "lightgreen";
      switchTurn();
      updateScores(index);
    } else {
      countryInputs[index].style.backgroundColor = "tomato";
      switchTurn();
    }
  }

  // adds an event listener to each input box
  function addSumbit() {
    for (var i = 0; i < inputs.length; i++) {
      (function(i) {
        inputs[i].addEventListener('keydown', function(e) {
          if(e.keyCode === 13) {
            var index = this.getAttribute('data-index');
            checkAnswer(index);
          }
        });
      }(i));
    }
  }

  // defines that player 1 starts the game
  function playerTurn() {
    setMessage(turn + "'s turn");
  }

  // displays who's turn it is
  function setMessage(msg) {
    document.getElementById("playerTurn").innerText = msg;
  }

  // switches the current player
  function switchTurn() {
    if (turn === "player 2") {
      turn = "player 1";
      setMessage(turn + "'s turn");
    } else {
      turn = "player 2";
      setMessage(turn + "'s turn");
    }
  }

  // updates the score when answer given correctly
  function updateScores(index) {
    var userAnswer = countryInputs[index].value;
    if (turn === "player 2" && userAnswer === player1Flags[index].country) {
      player1Score++;
      document.getElementById("player1Score").innerHTML=player1Score;
    } else if (turn === "player 1" && userAnswer === player1Flags[index].country) {
      player2Score++;
      document.getElementById("player2Score").innerHTML=player2Score;
    }
  }

  shuffle();
  deal();
  setBoard();
  playerTurn();
  addSumbit();
  switchTurn();
  checkAnswer();

});

// change player function
// - starts with player 1 ---done
// - when enter pressed change player ---done
// - when enter pressed add 1 to score if answer is correct

/// gameplay
