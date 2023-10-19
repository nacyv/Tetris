/* List:
	Controls
	Render
	Game
	Init
*/

// Render
const
	tetris=document.createElement('div'),
	tetrisGrid=document.createElement("canvas"),
	ctx=tetrisGrid.getContext("2d"),
	scores=document.createElement('div'),
	scoreBoards={
		topScore: document.createElement('div'),
		score: document.createElement('div'),
		next: document.createElement('div'),
		level: document.createElement('div'),
	},
	nextGrid=document.createElement('canvas'),
	nCtx=nextGrid.getContext('2d'),
	controller=document.createElement('div'),
	controls={
		name:[
			'start',
			'left',
			'right',
			'rotate',
			'drop',
			'pause',
			'up',
			'change'
		],
		icons:[
			'Start',
			'arrow_left',
			'arrow_right',
			'autorenew',
			'arrow_drop_down',
			'pause',
			'expand_less',
			'window'
		]
	},
	cheatBtn=document.createElement('button'),
	gameOverText=document.createElement('h2'),
	score=document.createElement('div'),
	credit= document.createElement('span'),
	images = {e:[null], src:[
		null,
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Jz34T+Ifv3kGIOojBWYBgFkNlgADfTUeTEygjQLC3Iz3Li8G5sanGIauq5gPYwlTdvAtpMLwC6AORlkKjEA2bUYBvDxsYDN+PTpDwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Bb19cYRCW0EGNRrLCgBQXvH3/lQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQAfwJNr7nKi7AAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBgKD1y/D+Ifn7sCIOklQ2YBgFkNlgADSwpK2VkBGkW4udjuLp9GzY1OMW0Pb3AehhjurrBtpMLwC6AORlkKjEA2bUYBvBzcYPN+PjtKwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Br69fYxDV1EKNRrLCgBQXvPv4iQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQBReJAxJHOTqwAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Ly04z+IfnXhJoOYgTqYBgFkNlgADfTG5TMygjQL8/EzXD90CpsanGKadmZgPYzFiyaCbScXgF0AczLIVGIAsmsxDODj4gGb8enbFwYQG0SjAxQDkL0AcgEuTciGEHQBNltxGoDuApLDgFwD3tx+yCCiKo8ajWSFASkuePvpIwN6okNJSNjSAUwTiAYBmAE4vUBsIGI1ACRIDAAFHgyAvQDLGMRohqmBZyaQAKEMBXMuzIUwF4CyMwBvl5MXVeEacQAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg+D8l5T+I3vf0G4OTNBeYBgFkNlgADTi3L2NkBGsWFmfYd+k+NjU4xZz0FMF6GPdWRoFtJxeAXQB3sp4iUeYguxbTAH5hiCEf3zIwgNggGg2gGIDsBZC/cGlCNoOwC7DYitMADBcQEQr4vUCkARdefmUwEOdGjUaywoAkL7x9yYCe6FASEtgF6ACqiQFEgwA01eL2AiVhADKVGAAKPBgAewGWMYjRDFMDz0wgAUIZCuZfmAthLgBlZwBvBonjT09XegAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg2Fvy6T+IvvnlGIM6jxWYBgFkNlgADWTN8GBkBGnmE+FiOP1gDzY1OMVMFVzAehinZewA204uALsA5mSQqcQAZNdiGMAtwAw24+uHvwwgNohGBygGIHsB5AJcmpANIegCbLbiNADdBSSHAbkGPPh0hUGBTwc1GskKA1Jc8OnNNwb0RIeSkLClA5gmEA0CMANweoHYQMRqAEiQGAAKPBgAewGWMYjRDFMDz0wgAUIZCuZcmAthLgBlZwBQ3ZP3OaGtaAAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBgeJXf8h9EH/n4ksGGXxxMgwAyGyyABoIWTGZkBGnmExdj2HbrMjY1OMW81HTBehjXJeSCbScXgF0AczLIVGIAsmsxDGAXEQSb8fPNewYQG0SjAxQDkL0AcgEuTciGEHQBNltxGoDuApLDgFwDrnx8w6DDL4IajWSFASku+PTyFQN6okNJSNjSAUwTiAYBmAE4vUBsIGI1ACRIDAAFHgyAvQDLGMRohqmBZyaQAKEMBXMuzIUwF4CyMwBUFZC9raUyoQAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAw0lEQVQ4T2NkYGBg+Hln0n8QfeLSGwYLPREwDQLIbLAAGrAPamJkBGlm4+RjOHTyHjY1OMXszJXAehgPrqsD204uALsA5mSQqcQAZNdiGsDOAzHj5xcGBhAbRKMBFAOQvQB2AQ5NyGYQdgEWW3EagOECIgIBvxeINODK7bcMOqrCqNFIVhiQ4oVf3z8xoCc6lISELR3ANIFoEIAZgNsLlIQByFRiACjwYADsBVjGIEYzTA08M4EECGUomH9hLoS5AJSdASaukfnTt+kFAAAAAElFTkSuQmCC"
	]},
	drawGrid=function(width, height, thick = 1) {
		ctx.beginPath();
		ctx.fillStyle = '#333';
		for (let y = 0; y < height; y++) {
			ctx.rect(0, (tetrisGrid.height / height) * y - thick, tetrisGrid.width, thick);
		}
		for (let x = 0; x < width; x++) {
			ctx.rect((tetrisGrid.width / width) * x - thick, 0, thick, tetrisGrid.height);
		}
		ctx.fill();
		ctx.closePath();
	},
	drawMatrix=function(matrix=[[]], offset={x:0,y:0}, size={width:1, height:1}) {
		const h = tetrisGrid.height / size.height,
					w = tetrisGrid.width / size.width,
					o = offset;
		
		for(let y = 0; y < matrix.length; y++) {
			for(let x = 0; x < matrix[y].length; x++) {
				const v = matrix[y][x];
				if(v>0){
					ctx.drawImage(images.e[v],(x+o.x)* w, (y+o.y) * h, w, h);
				}
			}
		}
	},
	drawPieceNext=function(margin=0) {
		const w = (nextGrid.width/4)-(margin/2),
					h = (nextGrid.height/4)-(margin/2),
					n = player.matrix.next.length,
					o = w*(4 - n)/2;
		
		nCtx.clearRect(0, 0, nextGrid.width, nextGrid.height);
		for(var y = 0; y < n; y++) {
			for(var x = 0; x < n; x++) {
				
				const v = player.matrix.next[y][x];
				if(v>0){
					nCtx.drawImage(images.e[v],(x*w)+o+margin, (y*h)+o+margin, w, h);
				}
			}
		}
	},
	pieceGhost=function(matrix=[[]], offset={x:0}, size={width:1, height:1}) {
		let posY = player.pos.y;
		
		while(!collide(arena.matrix, player.matrix.current, {x:player.pos.x, y: posY+1})){
			posY++;
			if(posY > arena.matrix.length) {
				break;
			}
		}
		
		const h = tetrisGrid.height / size.height,
					w = tetrisGrid.width / size.width,
					o = {x:offset.x, y: posY};
		
		for(let y = 0; y < matrix.length; y++) {
			for(let x = 0; x < matrix[y].length; x++) {
				const v = matrix[y][x];
				if(v>0){
					ctx.fillStyle = '#555';
					ctx.fillRect((x+o.x)* w, (y+o.y) * h, w, h);
				}
			}
		}
		ctx.fillStyle = 'black';
	},
	updateDraw=function() {
		updateScore();
		ctx.clearRect(0, 0, tetrisGrid.width, tetrisGrid.height);
		drawGrid(arena.size.width, arena.size.height, 1);
		pieceGhost(player.matrix.current, player.pos, arena.size);
		drawMatrix(arena.matrix, {x:0,y:0}, arena.size);
		drawMatrix(player.matrix.current, player.pos, arena.size);
	}
;

tetris.id = 'tetris';
tetrisGrid.id = 'tetris-grid';
scores.id = 'score-boards';
scoreBoards.next.id= 'next';
cheatBtn.id= 'cheat';
gameOverText.id= 'gameOver-text';
controller.id = 'controller';
	
scores.append(scoreBoards.topScore, scoreBoards.score, scoreBoards.next, scoreBoards.level);
scoreBoards.next.append('Next:',nextGrid);
tetris.append(tetrisGrid, scores, gameOverText);
document.body.append(tetris, cheatBtn, controller, credit);

credit.classList.add('credit');
credit.innerHTML='credit by: @nucyv';
const className = 'material-symbols-outlined';
for(let i=0; i<controls.name.length; i++) {
	const n = controls.name[i];
	
	controls[n] = document.createElement('button');
	controls[n].id = n+'-button';
	(n ==='start')?
		controls[n].innerHTML= controls.icons[i]: 
		controls[n].innerHTML= '<span class="'+className+'">'+controls.icons[i]+'</span>';
	
	controller.appendChild(controls[n]);
}
for(let i = 1; i < images.src.length; i++) {
	images.e[i] = document.createElement('img');
	images.e[i].src = images.src[i];
}

// Game
const
	createMatrix=function(width= 0, height= 0, value = null) {
		const matrix = [];
		for(let y = 0; y < height; y++) {
			matrix[y]= [];
			for(let x = 0; x < width; x++) {
				matrix[y][x] = value || 0;
			}
		}
		return matrix;
	},
	updateScore=function() {
		if(player.score>player.topScore && !game.cheatMode) player.topScore = player.score;
		scoreBoards.topScore.innerHTML = 'Top Score:<br>'+player.topScore;
		scoreBoards.score.innerHTML = 'Score:<br>'+player.score;
		scoreBoards.level.innerHTML = 'Level:<br>'+game.level;
	},
	gameStart=function(){
		if(game.run && game.loop!==null) return;
		 
		gameOverText.style.display='none';
		controller.classList.replace('start','playing');
		player.matrix.next= player.matrix.current=[[0]];
		arena.matrix.forEach(row=>row.fill(0));
		playerReset();
		
		if(player.matrix.next.length<=1) {
			playerReset();
		}
		
		let isRapid=false,
				tRapid=0,
				isDrop=false,
				tDrop=0,
				interval=game.dropInterval;
		
		game.run=true;
		game.pause=false;
		const run = function(){
			if(game.run) {
				
				if(tDrop>=(interval/100)){
					isDrop=true;
				}
				
				if(player.drop) {
					if(tRapid>2) {
						if(!isRapid) isRapid=true;
					}else{
						tRapid++;
					}
				}else if(isRapid) {
					isRapid=false;
				}
				
				if((isDrop && !game.pause) || isRapid) {
					playerDrop(1, function(){
						console.log('test');
						marge(arena.matrix, player.matrix.current, player.pos);
						let lineCrash = 1;
						sweep(arena.matrix, () => {
							player.score += arena.size.width * lineCrash;
							player.sweep++;
							if (player.sweep >= 10) {
								game.level++;
								const t = interval / 10;
								interval -= t;
								player.sweep = 0;
							};
						
							lineCrash++;
							updateScore();
						});
						player.pos.y = 0;
						playerReset();
					});
				}
				
				if(isDrop) {
					isDrop=false;
					tDrop=0;
				}else {
					tDrop++;
				}
				setTimeout(run,interval/10);
			}
		}
		run();
		updateDraw();
	},
	gameOver=function(){
		game.run= false;
		controller.style.display = 'none';
		controls.start.innerHTML= 'Play Again';
		const tShow = setTimeout(()=>controller.style.display='flex',1000);
		controller.classList.replace('playing','start');
		
		gameOverText.style.display='block';
		
	},
	sweep=function(matrix=[[]], fn=function(){}) {
		outer: for(let y = matrix.length-1; y>=0; y--) {
			for(let x = 0; x < matrix[y].length; x++) {
				if(matrix[y][x]<=0) {
					continue outer;
				}
			}
			const row = matrix.splice(y, 1)[0].fill(0);
			matrix.unshift(row);
			++y;
			fn();
		}
	},
	collide=function(arena=[[0]], target=[[0]], offset={x:0,y:0}) {
		for(let y = 0; y < target.length; y++) {
			for(let x = 0; x < target[y].length; x++) {
				if (target[y][x]>0 && ((x+offset.x)>(arena[y].length-1) || (offset.y+y)>(arena.length-1))) {
					return true;
				}
				if(target[y][x]>0 && (arena[y+(offset.y)][x+offset.x]>0 || (offset.x+x)<0 || (offset.y+y)<0 )) {
					return true;
				}
			}
		}
	
	return false;
},
	marge=function(area=[[]], target=[[]], offset={x:0,y:0}) {
		for(let y = 0; y < target.length; y++) {
			for(let x = 0; x < target[y].length; x++) {
				if(target[y][x]>0)
					area[y+offset.y][x+offset.x]= target[y][x];
			}
		}
	},
	rotate=function(matrix=[[]], dir=0) {
		for(let y=0;y<matrix.length;++y) {
			for(let x=0;x<y;++x) {
				[
					matrix[x][y],
					matrix[y][x]
				]=[
					matrix[y][x],
					matrix[x][y]
				]
			}
		}
	
		if (dir>0) {
			for(let i = 0; i < matrix.length; i++) {
				for(let a = 0, b = matrix[i].length - 1; a < b; (a++, b--)) {
					[matrix[i][a], matrix[i][b]] = [matrix[i][b], matrix[i][a]];
				}
			}
		}else if(dir<0){
			for(let a = 0, b = matrix.length - 1; a < b; (a++, b--)) {
				[matrix[a], matrix[b]] = [matrix[b], matrix[a]];
			}
		}
	}
;

// Controls
const
	pieces=[
			//t:
			[
				[0,0,0],
				[5,5,5],
				[0,5,0]
			],
		//o:
			[
				[7,7],
				[7,7]
			],
		//l:
			[
				[0,4,0],
				[0,4,0],
				[0,4,4]
			],
		//j:
			[
				[0,1,0],
				[0,1,0],
				[1,1,0]
			],
		//i:
			[
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0]
			],
		//s:
		[
				[0,3,3],
				[3,3,0],
				[0,0,0]
			],
		//z:
		[
				[6,6,0],
				[0,6,6],
				[0,0,0]
			]
		
	],
	
	playerMove=function(x=0) {
		if(!game.run) return; //stops move when game ends
		
		const {pos}=player;
		if(!collide(arena.matrix, player.matrix.current, {x:x+pos.x, y: pos.y})){
			player.pos.x += x;
		}
		updateDraw();
	},
	playerDrop=function(y=0,fn=function(n){}) {
		if(!game.run) return;
		
		const {pos} = player;
		if(!collide(arena.matrix, player.matrix.current, {x:pos.x, y: y+pos.y})) {
			player.pos.y += y;
		}else {
			if(pos.y<=0) {
				gameOver();
				player.pos.y=0;
			}else if(y>0) {
				fn();
			}
		}
		updateDraw();
	},
	playerRotate=function(matrix=[[0]], dir=0){
		if (!game.run) return;
		
		let offset=1,
				pos=1,
				x=player.pos.x;
		rotate(matrix,dir); 
		while(collide(arena.matrix, player.matrix.current, player.pos)){
			x+=offset;
			offset=-(offset+(offset>0?1:-1));
			if(offset>matrix[0].length){
				x=pos;
				rotate(matrix,-dir);
				break;
			}
		}
		updateDraw();
	},
	playerChange=function() {
		game.cheatMode? playerReset(): null;
	},
	playerReset=function() {
		player.matrix.current = player.matrix.next;
		if(player.matrix.current.length <= 1)
			player.matrix.current = pieces[Math.floor(pieces.length * Math.random())];
		
		player.matrix.next = pieces[Math.floor(pieces.length * Math.random())];
		player.pos.x = Math.floor((arena.matrix[0].length / 2) - (player.matrix.current[0].length / 2));
		for(let i = 0; i < Math.floor(Math.random()* 3); i++) {
			playerRotate(player.matrix.next, 1, player.pos.x);
		}
		drawPieceNext();
		updateDraw();
	},
	playerStart=function() {
		if(!game.run) arena.matrix.forEach(row=> row.fill(0));
		player.matrix= {current: [[0]], next:[[0]]};
		player.pos.y=0;
		player.score=0;
		gameStart(1);
	},
	playerPause=function() {
		if(!game.cheatMode) return;

		if(!game.pause) {
			game.pause =true;
			controls.pause.innerHTML = '<span class="'+className+'">play_arrow</span>'; // start button
		}else if(game.pause) {
			game.pause=false;
			controls.pause.innerHTML = '<span class="'+className+'">pause</span>';
		}
	},
	enableCheat=function() {
		if(game.run) 
			return;
		
		game.cheatMode= true;
		document.body.classList.remove('cheatOff');
	},
	disableCheat=function() {
		if(game.run) 
			return;
			
		game.cheatMode= false;
		document.body.classList.add('cheatOff');
	}
;
cheatBtn.addEventListener('click', ()=>game.cheatMode? disableCheat(): enableCheat());
controls.start.addEventListener('click',()=>gameStart());
controls.left.addEventListener('click',()=>playerMove(-1));
controls.right.addEventListener('click',()=>playerMove(1));
controls.rotate.addEventListener('click',()=>playerRotate(player.matrix.current,1));
controls.drop.addEventListener('touchstart',()=>(playerDrop(1),player.drop=true));
controls.drop.addEventListener('touchend',()=>(player.drop=false));
controls.up.addEventListener('click',()=>playerDrop(-1));
controls.change.addEventListener('click',()=>playerChange());
controls.pause.addEventListener('click',()=>playerPause());
document.addEventListener('keydown',function(e){
	//for Keyboard
	
	if(e.keyCode===37){
		playerMove(-1);
	}
		else if(e.keyCode===39){
			playerMove(1);
		}
		else if(e.keyCode===40){
			playerDrop(1);
		}
		else if(e.keyCode===38){
			playerRotate(1);
		}
	});


// Init

const
	arena = {
		size: {
			width: 12,
			height: 20
		},
		matrix: createMatrix(12, 20, 0)
	},
	game = {
		cheatMode: false,
		level: 1,
		pause: false,

		loop: null,
		run: false,
		time: 0,
		ready: 0,
		dropInterval: 1000

	},
	player = {
		pos: {
			x: 0,
			y: 0
		},
		drop: false,
		matrix: {
			current: [[0]],
			next: [[0]]
		},
		topScore: 0,
		score: 0,
		sweep: 0
	}
	
;

const { clientHeight, clientWidth } = document.body;
tetrisGrid.height = (tetris.clientHeight + 10);
tetrisGrid.width = (arena.size.width * (tetrisGrid.height / arena.size.height));
nextGrid.height = nextGrid.width = 80;
	
gameOverText.innerHTML= 'Game Over';
cheatBtn.innerHTML= '<span class="text">Cheat</span>';

controller.classList.add('start');
document.body.classList.add('cheatOff');
gameOverText.style.display = 'none';

updateScore();
updateDraw();
