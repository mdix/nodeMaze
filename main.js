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
	this.health = 100;
	this.monsterKilled = 0;
}

var randomCharacter = new character(4,4);
var time = 0;

function main() {
	if (randomCharacter.health >= 0) {
		time += 0.5;
	}
	
	render(randomCharacter);

	if (randomCharacter.health >= 0) {
		moveCharacter(randomCharacter);
    	spawnGold();
		spawnMonster();
		spawnHealth();
	}
}

function render(randomCharacter) {
	process.stdout.write('\u001B[2J\u001B[0;0f');
	
	if (randomCharacter.health <= 0) {
	    process.stdout.write("Aw snap, you died after " + time + " seconds in the maze! Your stats:");
		process.stdout.write("\n");
		process.stdout.write("\n");
	} else {
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
						} else if (level[x][y] === 3) {
							process.stdout.write("\033[31m☠\033[0m");
						} else if (level[x][y] === 4) {
							process.stdout.write("\033[32m♥\033[0m");
						} else {
							process.stdout.write('☐');	
						}
					}
				}
			}
			process.stdout.write("\n");
		}
	}
    process.stdout.write("gold: " + randomCharacter.gold);
	process.stdout.write("\n");
	var health = randomCharacter.health < 0 ? 0 : randomCharacter.health;
    process.stdout.write("health: " + health);
	process.stdout.write("\n");
    process.stdout.write("monster killed: " + randomCharacter.monsterKilled);
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
					fightMonster(nextX, nextY);
					pickHealth(nextX, nextY);
					
					isWalkable = true;	
				}
			}
		} 
	}
}

function spawnGold() {
	if (time % 5 === 0) {
		var maxY = level[0].length - 1;
		var maxX = level.length - 1;
		var isWalkable = false;
		
		while (isWalkable !== true) {
			posX = Math.floor((Math.random()*maxX)+1);
			posY = Math.floor((Math.random()*maxY)+1);
		
			if (level[posX][posY] > 0) {
				level[posX][posY] = 2;
				isWalkable = true;
			}
		}
	}
}

function spawnMonster() {
	if (time % 10 === 0) {
		var maxY = level[0].length - 1;
		var maxX = level.length - 1;
		var isWalkable = false;
		
		while (isWalkable !== true) {
			posX = Math.floor((Math.random()*maxX)+1);
			posY = Math.floor((Math.random()*maxY)+1);
		
			if (level[posX][posY] > 0) {
				level[posX][posY] = 3;
				isWalkable = true;
			}
		}
	}
}

function spawnHealth() {
	if (time % 30 === 0) {
		var maxY = level[0].length - 1;
		var maxX = level.length - 1;
		var isWalkable = false;
		
		while (isWalkable !== true) {
			posX = Math.floor((Math.random()*maxX)+1);
			posY = Math.floor((Math.random()*maxY)+1);
		
			if (level[posX][posY] > 0) {
				level[posX][posY] = 4;
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

function fightMonster(characterPositionX, characterPositionY) {
	if (level[characterPositionX][characterPositionY] === 3) {
		randomCharacter.health -= Math.floor((Math.random()*20)+1);;
		level[characterPositionX][characterPositionY] = 1;
		randomCharacter.monsterKilled++;
	}
}

function pickHealth(characterPositionX, characterPositionY) {
	if (level[characterPositionX][characterPositionY] === 4) {
		if (randomCharacter.health + 10 > 100) {
			randomCharacter.health = 100;
		} else {
			randomCharacter.health += 10;
		}
		level[characterPositionX][characterPositionY] = 1;
	}
}

setInterval(main, 500);
