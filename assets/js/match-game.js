var MatchGame = {};
var pairsFound = 0;
var $controls = $('<div class="col-xs-12 win">YOU WIN!</div><div class="col-xs-12 controls">PLAY AGAIN</div>')

function restart() {
	var $game = $('#game');
	pairsFound = 0;
	var values = MatchGame.generateCardValues();
	MatchGame.renderCards(values, $game);
}

$(document).ready(function() {
	restart();
});

MatchGame.generateCardValues = function() {
	var numbers = [];
	var pairs = [];

	for (var i = 1; i < 9; i++) {
		numbers.push(i);
		numbers.push(i);
	}

	while (pairs.length < 16) {
		var min = 0;
		var max = numbers.length;
		var random = (Math.floor(Math.random() * (max - min)) + min);
		pairs.push(numbers[random]);
		numbers.splice(random, 1);
	}

	return pairs;
};

MatchGame.renderCards = function(cardValues, $game) {
	var colors = [
		'hsl(25, 85%, 65%)',
		'hsl(55, 85%, 65%)',
		'hsl(90, 85%, 65%)',
		'hsl(160, 85%, 65%)',
		'hsl(220, 85%, 65%)',
		'hsl(265, 85%, 65%)',
		'hsl(310, 85%, 65%)',
		'hsl(360, 85%, 65%)'
	];

	$game.empty();
	$game.data('flippedCards', []);

	for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
		var value = cardValues[valueIndex];
		var color = colors[value - 1];
		var data = {
			value: value,
			color: color,
			isFlipped: false
		};

		var $cardElement = $('<div class="col-xs-3 card"></div>');
		$cardElement.data(data);
		$game.append($cardElement);
	}

	$('.card').click(function() {
		MatchGame.flipCard($(this), $('#game'));
	});
};

MatchGame.flipCard = function($card, $game) {
	if ($card.data('isFlipped')) {
		return;
	}

	$card.css('background-color', $card.data('color'))
		.text($card.data('value'))
		.data('isFlipped', true);
	var flippedCards = $game.data('flippedCards');
	flippedCards.push($card);

	if (flippedCards.length === 2) {
		if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
			var matchCss = {
				backgroundColor: 'rgb(153, 153, 153)',
				color: 'rgb(204,204,204)'
			};
			flippedCards[0].css(matchCss);
			flippedCards[1].css(matchCss);
			pairsFound += 1;
			if (pairsFound === 8) {
				$game.html($controls);
			}
		} else {
			var card1 = flippedCards[0];
			var card2 = flippedCards[1];
			window.setTimeout(function() {
				card1.css('background-color', 'rgb(32, 64, 86)')
					.text('')
					.data('isFlipped', false);
				card2.css('background-color', 'rgb(32, 64, 86)')
					.text('')
					.data('isFlipped', false)
			}, 350);
		}
		$game.data('flippedCards', []);
	}
};

$controls.click(function() {
	restart();
});
