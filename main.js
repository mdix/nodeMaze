var level = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,1,1,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var character = function(x, y) {
	this.x = x;
	this.y = y;
	this.symbol = '♖';
}

var randomCharacter = new character(1, 1);


function main() {
	render(randomCharacter);
	moveCharacter(randomCharacter);
}

function render(randomCharacter) {
	process.stdout.write('\u001B[2J\u001B[0;0f');
	
	for (var x = 0; x < level.length; x++) {
		for (var y = 0; y < level[x].length; y++) {
			if (level[x][y] === 1) {
				if (randomCharacter.x === x && randomCharacter.y === y) {
					process.stdout.write(randomCharacter.symbol);
				} else {
					process.stdout.write('❖');
				}
			} else {
				if (randomCharacter.x === x && randomCharacter.y === y) {
					process.stdout.write(randomCharacter.symbol);
				} else {
					process.stdout.write('☐');
				}
			}
		}
		process.stdout.write("\n");
	}
}

function moveCharacter(randomCharacter) {
	var maxY = level[0].length - 1;
	var maxX = level.length - 1;
	var isWalkable = false;
	
	while (isWalkable !== true) {
		nextX = Math.floor((Math.random()*maxX)+1);
		nextY = Math.floor((Math.random()*maxY)+1);
		
		if (level[nextX][nextY] === 0) {
			if (!(randomCharacter.x === nextX && randomCharacter.y === nextY)) {
				if ((!(nextX > randomCharacter.x + 1 || nextX < randomCharacter.x - 1) && !(nextY > randomCharacter.y + 1 || nextY < randomCharacter.y - 1))) {
					randomCharacter.x = nextX;
					randomCharacter.y = nextY;
					isWalkable = true;	
				}
			}
		} 
	}
}

setInterval(main, 500);
