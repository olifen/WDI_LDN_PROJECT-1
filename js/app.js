var flagsEasy = [{
  image: "images/brazil.png",
  country: "brazil",
  capital: "brasilia"
},{
  image: "images/china.png",
  country: "china",
  capital: "beijing"
},{
  image: "images/france.png",
  country: "france",
  capital: "paris"
},{
  image: "images/germany.png",
  country: "germany",
  capital: "berlin"
},{
  image: "images/india.png",
  country: "india",
  capital: "new dehli"
},{
  image: "images/italy.png",
  country: "italy",
  capital: "rome"
},{
  image: "images/japan.png",
  country: "japan",
  capital: "tokyo"
},{
  image: "images/russia.png",
  country: "russia",
  capital: "moscow"
},{
  image: "images/uk.png",
  country: "uk",
  capital: "london"
},{
  image: "images/usa.png",
  country: "usa",
  capital: "washington dc"
}];

var flags = document.querySelectorAll('.board .flag img');
var countryInputs = document.getElementsByClassName("countryInput");

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
  console.log(userAnswer, flagsEasy[index].country);
  if (userAnswer === flagsEasy[index].country) {
    countryInputs[index].style.backgroundColor = "lightgreen";
  } else {
    countryInputs[index].style.backgroundColor = "tomato";
  }
}

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


// update scores
// var player1Score = 0;
// var player2Score = 0;
//
// var updateScores = function() {
//   if (checkAnswer ==
//   document.getElementById("player1Score").innerHTML=player1Score;
//   document.getElementById("player2Score").innerHTML=player2Score;
// }
// updateScores();









// //changes player
// function changePlayer() {
//   if (checkWinner(document.turn)) {
//     setMessage(document.turn + " wins");
//     document.gameOver = document.turn;
//   } else if (document.turn == "X") {
//     document.turn = "0";
//     setMessage(document.turn + "'s turn");
//   } else {
//     document.turn = "X";
//     setMessage(document.turn + "'s turn");
//   }
// }
//
// //indicates player turn
// function currentTurn() {
//   document.turn = "X";
//   document.gameOver = null;
//   setMessage(document.turn + "'s turn");
// }
//
// function setMessage(msg) {
//   document.getElementById("message").innerText = msg;
// }
