const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

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
		clickedCard.style.backgroundColor = clickedCard.classList[0];
		// handle the second of the two clicks
	} else if (clicked.length === 1) {
		clicked.push(clickedCard);
		allClickedCards.push(clickedCard);
		clickedCard.style.backgroundColor = clickedCard.classList[0];
		result = checkMatch(clicked[0].style.backgroundColor, clicked[1].style.backgroundColor);
		if (result === true) {
			// start the counter over
			clicked = [];
			// keep from re-clicking the card, take it out of the running
		} else {
			setTimeout(function() {
				flipCards(clicked);
				clicked = [];
			}, 1000);
			allClickedCards.pop();
			allClickedCards.pop();
		}
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);

function checkMatch(item1, item2) {
	return item1 === item2;
}

function flipCards(arr) {
	for (let item of arr) {
		item.style.backgroundColor = 'white';
	}
}

function newGame() {
	flipCards(allClickedCards);
	allClickedCards = [];
	clicked = [];
	console.log(shuffle(COLORS));
}
