Original scope of the game:

- 2-4 players
- 200ish cards/flags
- groups of 50ish flags
- 4 cards in each players board
- take turns guessing flags from other people's boards
- correct guess gets you one point
- if you then answer the capital of the country, you get a bonus point
- two hints available - only receive 1/2 point if used
- when flag is correctly guessed it is removed from play
- the owner of the board from which the flag was removed chooses the face up top card from one of two piles in the middle of the board
- game ends when all flags have been used up

Final scope:

- 2 players
- 200ish cards/flags programmed + autonomous edition
- 4 difficulty settings of 50 flags
- option to play marathon game with all flags
- take turns guessing from own board
- 1 point for a correct answer
- when answered correctly, flag is removed and placed with a random flag
- game ends when a player hits the score limit

Planning:

- used trello
- broke each stage down and worked at it chronologically:
  - create array of objects for the flags, with country name and flag image as    properties
  - write a shuffle function to randomise the array
  - display images of flags in each players board
  - create input box for answer and add event listener for submit
  - write functions to check for a correct answer
    - within that function, update the score accordingly and switch player turn
  - create a win condition and a function to check for\ it.
  - add a display to indicate when the game is over and make an option to play again

Challenges:

- removing cards and replacing with a new one - had to end up rewriting large portions of the code to get it working. lots of help from will and mike. kept hitting walls on this issue.
- a lot of the difficulties came from improper use of index, and how getElementsByClassName returns an array of objects, but my understanding of the way it works has increased after this project.
- some features proved beyond me at this stage, such as a second input bar for capitals, having two piles of flags to replace
