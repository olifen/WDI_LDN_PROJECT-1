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

  // shuffles the cards at the beginning of the game. randomises all cards in the array.
  // uses the fisher-yates/knuth shuffle algorithm.
  // is called at the bottom of the script.
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

  // takes two lots of 4 cards and adds them to two new arrays.
  // is called at the bottom of the script.
  function deal() {
    for(var i=0; i<=3; i++) {
      player1Flags.push(flagsEasy.pop());
      player2Flags.push(flagsEasy.pop());
    }
  }

  // places the 4 cards in each of the new arrays to appear as images and sets their country data attribute.
  // is called at the bottom of the script.
  function setBoard() {
    for(var i=0;i<4;i++) {
      flags1[i].src = player1Flags[i].image;
      flags1[i].setAttribute('data-answer', player1Flags[i].country);
      flags2[i].src = player2Flags[i].image;
      flags2[i].setAttribute('data-answer', player2Flags[i].country);
    }
  }

  // checks to see if the player's answer in the input box matches the country data attibute.
  // also runs several other functions once it has been determined whether or not the answer is correct.
  // var playerFlags uses a ternary operator - assigns a value to a variable based on some condition.
  // is called in the addSumbit function to execute once a player has submitted an answer.
  function checkAnswer (index) {
    var userAnswer = countryInputs[index].value.toLowerCase();
    var playerFlags = index > 3 ? player2Flags : player1Flags;
    if (userAnswer === playerFlags[index % 4].country) {
      updateScores();
      replaceFlag(index);
      resetInput();
      switchTurn();
      disableInput();
      checkWinner();
    } else {
      resetInput();
      switchTurn();
      disableInput();
    }
  }

  // adds an event listener of key down (return) to each input box.
  // uses a closure.
  // is called at the bottom of the script.
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

  // displays that player 1 starts the game.
  // displays the variable 'turn' (which is set at player 1 or player 2).
  // is called at the bottom of the script.
  function playerTurn() {
    setMessage(turn + "'s turn");
  }

  // selects the div in the html to display the player turn.
  // is called in the playerTurn function.
  function setMessage(msg) {
    document.getElementById("playerTurn").innerText = msg;
  }

  // checks the message display to see who's turn it is and changes it to the other player.
  // changes the color of the message to make it clearer which player's turn it is.
  // is called in the checkAnswer function to execute when the user submits and answer.
  function switchTurn() {
    if (turn === "player 2") {
      turn = "player 1";
      setMessage(turn + "'s turn");
      document.getElementById("playerTurn").style.color ="hotpink";
    } else {
      turn = "player 2";
      setMessage(turn + "'s turn");
      document.getElementById("playerTurn").style.color ="gold";
    }
  }

  // adds a point to the relevant player's score when a correct answer is given.
  // is called in the checkAnswer function to execute when the user submits an answer.
  function updateScores() {
    if (turn === "player 1") {
      player1Score++;
      document.getElementById("player1Score").innerHTML=player1Score;
    } else {
      player2Score++;
      document.getElementById("player2Score").innerHTML=player2Score;
    }
  }

  // disables the other player's input boxes when switching turns.
  // it is called at the end of the script to run when the game starts.
  // is also called in the checkAnswer function to execute when the user submits an answer.
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

  // sets a score limit and checks to see if the win condition is met.
  // if it is met, all input boxes are disabled and a message is displayed, noting which player won.
  // is called in the checkAnswer to see if there is a winner after each answer submission.
  function checkWinner() {
    if (player1Score === 5) {
      setMessage("player 1 wins");
      document.getElementById("ci1a").disabled = true;
      document.getElementById("ci1b").disabled = true;
      document.getElementById("ci1c").disabled = true;
      document.getElementById("ci1d").disabled = true;
      document.getElementById("ci2a").disabled = true;
      document.getElementById("ci2b").disabled = true;
      document.getElementById("ci2c").disabled = true;
      document.getElementById("ci2d").disabled = true;
      playAgain();
    } else if (player2Score === 5) {
      setMessage("player 2 wins");
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

  // resets the input box to clear the text of the previous answer.
  // is called in the checkAnswer function to execute when an answer is submitted.
  function resetInput() {
    for (i=0; i<countryInputs.length; i++) {
      document.getElementsByClassName("countryInput")[i].value = "";
    }
  }

  // turns the button into a clickable element.
  // once clicked, the page is reloaded for players to have another game.
  // is called in the checkWinner function to execute only when the win condition has been met.
  function playAgain() {
    var playAgainBtn = document.getElementById("playAgain");
    playAgainBtn.innerText = "play again?";
    playAgainBtn.onclick = function() {
      location.reload ();
    };
  }

  // replaces the next flag object with the object in the payerFlags array
  // removes a flag from the arrays comprising each players' board once a correct answer has been given.
  // replaces the correctly guessed flag with the next flag in the original shuffled array.
  // updates the flag image
  // is called in the checkAnswer function.
  function replaceFlag(index) {
    var playerFlags = index > 3 ? player2Flags : player1Flags;
    var flags = index > 3 ? flags2 : flags1;
    var nextFlag = flagsEasy.pop();
    playerFlags[index % 4] = nextFlag;
    flags[index % 4].src = playerFlags[index % 4].image;
  }

  shuffle();
  deal();
  setBoard();
  playerTurn();
  addSumbit();
  switchTurn();
  disableInput();

});
