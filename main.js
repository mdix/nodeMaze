var level = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1, 1, 1, 1, 1,-1,-1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var character = function(x, y) {
	this.x = x;
	this.y = y;
	this.symbol = "\033[34m♖\033[0m";
	this.gold = 0;
}

var randomCharacter = new character(4,4);
var time = 0;

function main() {
	time += 1;
	render(randomCharacter);
	moveCharacter(randomCharacter);
    spawnGold();
}

function render(randomCharacter) {
	process.stdout.write('\u001B[2J\u001B[0;0f');
	
	for (var x = 0; x < level.length; x++) {
		for (var y = 0; y < level[x].length; y++) {
			if (level[x][y] < 0) {
				if (randomCharacter.x === x && randomCharacter.y === y) {
					process.stdout.write(randomCharacter.symbol);
				} else {
					process.stdout.write('❖');
				}
			} else {
				if (randomCharacter.x === x && randomCharacter.y === y) {
					process.stdout.write(randomCharacter.symbol);
				} else {
					if (level[x][y] === 2) {
						process.stdout.write("\033[33m☻\033[0m");	
					} else {
						process.stdout.write('☐');	
					}
				}
			}
		}
		process.stdout.write("\n");
	}
    process.stdout.write("gold: " + randomCharacter.gold);
}

function moveCharacter(randomCharacter) {
	var maxY = level[0].length - 1;
	var maxX = level.length - 1;
	var isWalkable = false;
	
	while (isWalkable !== true) {
		nextX = Math.floor((Math.random()*maxX)+1);
		nextY = Math.floor((Math.random()*maxY)+1);
		
		if (level[nextX][nextY] > 0) {
			if (!(randomCharacter.x === nextX && randomCharacter.y === nextY)) {
				if ((!(nextX > randomCharacter.x + 1 || nextX < randomCharacter.x - 1) && !(nextY > randomCharacter.y + 1 || nextY < randomCharacter.y - 1))) {
					randomCharacter.x = nextX;
					randomCharacter.y = nextY;
					pickGold(nextX, nextY);
					isWalkable = true;	
				}
			}
		} 
	}
}

function spawnGold() {
	if (time % 10 === 0) {
		var maxY = level[0].length - 1;
		var maxX = level.length - 1;
		var isWalkable = false;
		
		while (isWalkable !== true) {
			posX = Math.floor((Math.random()*maxX)+1);
			posY = Math.floor((Math.random()*maxY)+1);
		
			if (level[nextX][nextY] > 0) {
				level[nextX][nextY] = 2;
				isWalkable = true;
			}
		}
	}
}

function pickGold(characterPositionX, characterPositionY) {
	if (level[characterPositionX][characterPositionY] === 2) {
		randomCharacter.gold++;
		level[characterPositionX][characterPositionY] = 1;
	}
}

setInterval(main, 500);
