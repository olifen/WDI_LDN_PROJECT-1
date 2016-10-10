var flags = document.querySelectorAll('.board .flag img');
var countryInputs = document.getElementsByClassName("countryInput");

// shuffles the cards at the beginning of the game
function shuffle() {

  var flagIndex = flagsEasy.length;
  var index, temp;

  while (flagIndex > 0) {
    index = Math.floor(Math.random() * flagIndex);
    flagIndex--;

    temp = flagsEasy[flagIndex];
    flagsEasy[flagIndex] = flagsEasy[index];
    flagsEasy[index] = temp;
  }

  for(var i=0;i<flags.length;i++) {
    flags[i].src = flagsEasy[i].image;
    flags[i].setAttribute('data-answer', flagsEasy[i].country);
  }

  var htmlFlag9 = document.getElementById("pileFlagsLeft");
  var htmlFlag10 = document.getElementById("pileFlagsRight");

  htmlFlag9.src = flagsEasy[8].image;
  htmlFlag10.src = flagsEasy[9].image;

}
shuffle();

function checkAnswer (index) {
  var userAnswer = countryInputs[index].value;
  if (userAnswer === flagsEasy[index].country) {
    countryInputs[index].style.backgroundColor = "lightgreen";
    switchTurn();
    updateScores(index);
  } else {
    countryInputs[index].style.backgroundColor = "tomato";
    switchTurn();
  }
}

// adds an event listener to each input box
var inputs = document.getElementsByClassName("countryInput");
for (var i = 0; i < inputs.length; i++) {
  (function(i) {
    inputs[i].addEventListener('keydown', function(e) {
      if(e.keyCode === 13) {
        var index = this.getAttribute('data-index');
        checkAnswer(index);
      }
    });
  }(i));
};

// defines that player 1 starts the game
var turn = "player 1"
function startGame() {
  setMessage(turn + "'s turn");
}

// displays who's turn it is
function setMessage(msg) {
  document.getElementById("playerTurn").innerText = msg;
}

// switches the current player
function switchTurn() {
  if (turn === "player 1") {
    turn = "player 2";
    setMessage(turn + "'s turn");
  } else {
    turn = "player 1";
    setMessage(turn + "'s turn");
  }
}

// updates the score when answer given correctly
// removes flag when answer given correctly
var player1Score = 0;
var player2Score = 0;

var flag = document.getElementsByClassName("flagImage");
function updateScores(index) {
  var userAnswer = countryInputs[index].value;
  if (turn === "player 2" && userAnswer === flagsEasy[index].country) {
    player1Score++;
    document.getElementById("player1Score").innerHTML=player1Score;
  } else if (turn === "player 1" && userAnswer === flagsEasy[index].country) {
    player2Score++;
    document.getElementById("player2Score").innerHTML=player2Score;
  }
}








// console.log(flag);
// console.log(index);
// console.log(flag[index]);
// var a = document.body.querySelectorAll("#board");
// var b = a.querySelectorAll("#player1Board");
// var c = b.querySelectorAll(".flag");
// var d = c.querySelectorAll(".flagBoard");
// console.log(d);





// function replaceFlag() {
//   console.log("clicked");
// }
//
// function disableInputs() {
//   if (turn === "player 1") {
//     document.getElementsByClassName("flagBoard2").disabled = true;
//   } else if (turn === "player 2") {
//     document.getElementsByClassName("flagBoard1").disabled = true;
//   }
// }
// disableInputs();
//
// function checkWinner() {
//   if (player1Score === 10) {
//     console.log("player 1 wins");
//   } else if (player2Score === 10) {
//     console.log("player 2 wins");
//   }
// }
// checkWinner();

// function replaceFlag() {
//
// }








// change player function
// - starts with player 1 ---done
// - when enter pressed change player ---done
// - when enter pressed add 1 to score if answer is correct

/// gameplay
