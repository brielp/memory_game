const gameContainer = document.getElementById('game');
const newGameBtn = document.getElementById('new_game');
const showScore = document.getElementById('current_score');
const barnUrl = 'https://cdn.pixabay.com/photo/2014/03/25/16/58/barn-297763_960_720.png';

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];
const IMAGES = [
	'https://cdn.pixabay.com/photo/2013/07/13/12/34/cow-159893_960_720.png',
	'https://cdn.pixabay.com/photo/2018/07/16/15/31/dog-3542195_960_720.png',
	'https://cdn.pixabay.com/photo/2016/03/31/21/04/horse-1296173_960_720.png',
	'https://cdn.pixabay.com/photo/2018/07/15/13/29/lamb-3539619_960_720.png',
	'https://cdn.pixabay.com/photo/2012/05/07/04/17/pig-47920_960_720.png',
	'https://cdn.pixabay.com/photo/2013/07/13/12/34/cow-159893_960_720.png',
	'https://cdn.pixabay.com/photo/2018/07/16/15/31/dog-3542195_960_720.png',
	'https://cdn.pixabay.com/photo/2016/03/31/21/04/horse-1296173_960_720.png',
	'https://cdn.pixabay.com/photo/2018/07/15/13/29/lamb-3539619_960_720.png',
	'https://cdn.pixabay.com/photo/2012/05/07/04/17/pig-47920_960_720.png'
];

let currentScore = 0;
let clicked = [];
let allClickedCards = [];
let result;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledImgs = shuffle(IMAGES);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(imgArray) {
	for (let img of imgArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(img);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	let clickedCard = event.target;
	// check whether card has been clicked
	for (let card of allClickedCards) {
		if (card === clickedCard) {
			return 0;
		}
	}
	// handle the first of the two clicks
	if (clicked.length === 0) {
		clicked.push(clickedCard);
		allClickedCards.push(clickedCard);
		clickedCard.style.backgroundImage = `url(${clickedCard.classList[0]})`;
		// handle the second of the two clicks
	} else if (clicked.length === 1) {
		clicked.push(clickedCard);
		allClickedCards.push(clickedCard);
		clickedCard.style.backgroundImage = `url(${clickedCard.classList[0]})`;
		result = checkMatch(clicked[0].style.backgroundImage, clicked[1].style.backgroundImage);
		if (result === true) {
			// start the counter over
			for (card of clicked) {
				card.classList.add('glow');
			}
			clicked = [];
			updateGuesses();
			// keep from re-clicking the card, take it out of the running
		} else {
			setTimeout(function() {
				flipCards(clicked);
				clicked = [];
			}, 1000);
			allClickedCards.pop();
			allClickedCards.pop();
			updateGuesses();
		}
	}

	if (allClickedCards.length === COLORS.length) {
		setTimeout(function() {
			gameOver();
		}, 100);
	}
}

newGameBtn.addEventListener('click', function() {
	newGame();
});

// when the DOM loads
createDivsForColors(shuffledImgs);

function checkMatch(item1, item2) {
	return item1 === item2;
}

function flipCards(arr) {
	for (let item of arr) {
		item.style.backgroundImage = 'url(https://cdn.pixabay.com/photo/2014/03/25/16/58/barn-297763_960_720.png)';
	}
}

function updateGuesses() {
	currentScore++;
	showScore.innerText = currentScore;
}

function newGame() {
	gameContainer.innerHTML = '';
	allClickedCards = [];
	clicked = [];
	currentScore = 0;
	showScore.innerText = currentScore;
	createDivsForColors(shuffle(IMAGES));
	newGameBtn.classList.remove('glow');
}

function gameOver() {
	newGameBtn.classList.add('glow');
	alert('You win!');
}
