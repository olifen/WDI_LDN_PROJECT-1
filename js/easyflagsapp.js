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
  var flag = flagsEasy.splice(0, 1);
  var player1Score = 0;
  var player2Score = 0;
  var flagImage = document.getElementsByClassName("flagImage");


  // shuffles the cards at the beginning of the game
  function shuffle() {
    var flagIndex = flagsEasy.length;
    var index;
    var temp;

    while (flagIndex > 0) {
      index = Math.floor(Math.random() * flagIndex);
      flagIndex--;
      temp = flagsEasy[flagIndex];
      flagsEasy[flagIndex] = flagsEasy[index];
      flagsEasy[index] = temp;
    }
  }

  // deals 4 cards into each player's board
  function deal() {
    for(var i=0; i<=3; i++) {
      player1Flags.push(flagsEasy.pop());
      player2Flags.push(flagsEasy.pop());
    }
  }

  function setBoard() {
    for(var i=0;i<4;i++) {
      flags1[i].src = player1Flags[i].image;
      flags1[i].setAttribute('data-answer', player1Flags[i].country);

      flags2[i].src = player2Flags[i].image;
      flags2[i].setAttribute('data-answer', player2Flags[i].country);
    }

    // pileFlags[0].src = flagsEasy[0].image;
    // pileFlags[1].src = flagsEasy[1].image;
  }

  // checks to see if text in input box matches the country name
  function checkAnswer (index) {
    var userAnswer = countryInputs[index].value.toLowerCase();
    var playerFlags = index > 3 ? player2Flags : player1Flags;

    if (userAnswer === playerFlags[index % 4].country) {
      // countryInputs[index].style.backgroundColor = "lightgreen";
      updateScores();
      replaceFlag(index);
      resetInput();
      switchTurn();
      disableInput();
      checkWinner();
    } else {
      // countryInputs[index].style.backgroundColor = "tomato";
      resetInput();
      switchTurn();
      disableInput();
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
  function updateScores() {
    if (turn === "player 1") {
      player1Score++;
      document.getElementById("player1Score").innerHTML=player1Score;
    } else {
      player2Score++;
      document.getElementById("player2Score").innerHTML=player2Score;
    }
  }

  function disableInput() {
    if (turn === "player 1") {
      document.getElementById("ci1a").disabled = false;
      document.getElementById("ci1b").disabled = false;
      document.getElementById("ci1c").disabled = false;
      document.getElementById("ci1d").disabled = false;
      document.getElementById("ci2a").disabled = true;
      document.getElementById("ci2b").disabled = true;
      document.getElementById("ci2c").disabled = true;
      document.getElementById("ci2d").disabled = true;
    } else {
      document.getElementById("ci2a").disabled = false;
      document.getElementById("ci2b").disabled = false;
      document.getElementById("ci2c").disabled = false;
      document.getElementById("ci2d").disabled = false;
      document.getElementById("ci1a").disabled = true;
      document.getElementById("ci1b").disabled = true;
      document.getElementById("ci1c").disabled = true;
      document.getElementById("ci1d").disabled = true;
    }
  }

  function checkWinner() {
    if (player1Score === 21) {
      setMessage("player 1 wins");
      console.log("player 1 wins");
      document.getElementById("ci1a").disabled = true;
      document.getElementById("ci1b").disabled = true;
      document.getElementById("ci1c").disabled = true;
      document.getElementById("ci1d").disabled = true;
      document.getElementById("ci2a").disabled = true;
      document.getElementById("ci2b").disabled = true;
      document.getElementById("ci2c").disabled = true;
      document.getElementById("ci2d").disabled = true;
      playAgain();
    } else if (player2Score === 21) {
      setMessage("player 2 wins");
      console.log("player 2 wins");
      document.getElementById("ci1a").disabled = true;
      document.getElementById("ci1b").disabled = true;
      document.getElementById("ci1c").disabled = true;
      document.getElementById("ci1d").disabled = true;
      document.getElementById("ci2a").disabled = true;
      document.getElementById("ci2b").disabled = true;
      document.getElementById("ci2c").disabled = true;
      document.getElementById("ci2d").disabled = true;
      playAgain();
    }
  }

  function resetInput() {
    for (i=0; i<countryInputs.length; i++) {
      document.getElementsByClassName("countryInput")[i].value = "";
    }
  }

  function playAgain() {
    var playAgainBtn = document.getElementById("playAgain");
    playAgainBtn.innerText = "play again?";
    playAgainBtn.onclick = function() {
      location.reload ();
    };
  }

  function replaceFlag(index) {
    console.log("replaceFlag");
    // replace the next flag object with the object in the payerFlags array
    var playerFlags = index > 3 ? player2Flags : player1Flags;
    console.log(playerFlags);
    var flags = index > 3 ? flags2 : flags1;
    var nextFlag = flagsEasy.pop();

    playerFlags[index % 4] = nextFlag;
    // update the flag image
    flags[index % 4].src = playerFlags[index % 4].image;
    // put the next flag in on the pile
    // pileFlags[0].src = flagsEasy[0].image;
  }

  shuffle();
  deal();
  setBoard();
  playerTurn();
  addSumbit();
  switchTurn();
  disableInput();

});

// change player function
// - starts with player 1 ---done
// - when enter pressed change player ---done
// - when enter pressed add 1 to score if answer is correct

/// gameplay
