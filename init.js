var canvas;
var ctx;
var map = [];
var bots = []; // X, Y, W, H
var directions = [ { X:-1,Y:0 }, { X:1,Y:0 }, { X:0,Y:-1 }, { X:0,Y:1 }, { X:-1,Y:-1 }, { X:-1,Y:1 }, { X:1,Y:-1 }, { X:1,Y:1 } ];
var lastDirs = [];
var oPlayersNum = 41;

function initBody(cvs) {
	var i = 0;
 	var size = 20;
 	var lastDownTarget;
 	var me;
 	var meColor = { r: 30, g: 190, b: 120, a: 1.0 };
 	var meIntersect = false;
 	var wallColor = { r: 140, g: 70, b: 20, a: 1.0 };
 	var keys = { 37: false, 38: false, 39: false, 40: false };
 	var o = 0;

  canvas = cvs;
 	if (canvas.getContext)
		ctx = canvas.getContext('2d');
    	
 	for (var x = 0; x < canvas.width; x+=size) {
		for (var y = 0; y < canvas.height; y+=size) {
			var r = Math.random();
			map[i] = { 
				Value: (r < 0.3) ? 'wall' : 'empty',
				W: size + r*size, 
				H: size + r*size, 
				X: x, 
				Y: y };
			//setTimeout(drawAt, 1000);	
			//if (map[i].Value == 'wall')
			//	drawAt(map[i], wallColor, null);
			if (map[i].Value == 'empty') {
				if (me == null)
					me = { X: map[i].X+8, Y: map[i].Y+8, W: 10, H: 10 };
				else {
					var rnd = Math.random();
					if (rnd < 0.05 && o < oPlayersNum) {
						bots[o++] = { X: map[i].X+8, Y: map[i].Y+8, W: 10, H: 10 };
						lastDirs[o] = 0;
					}
				}
			}
			i++;
		}
	}
 		
	document.addEventListener('mousedown', function(event) {
		lastDownTarget = event.target;
	}, false);
	document.addEventListener('keydown', function(e) {
		if(lastDownTarget == canvas) {
			var oldMe = { X: me.X, Y: me.Y, W: me.W, H: me.H };
			var colors = null;
			var offset = { X: 1, Y: 1 };
			keys[e.keyCode] = true;
			
				// ezt majd írd át mert left&up = up&left
			if (keys[38]) { // Up arrow
				if (keys[37]) { // Left arrow
					me.Y--;
					me.X--;
				} else if (keys[39]) { // Right arrow
					me.Y--;
					me.X++;
				} else
					me.Y--;
			} else if (e.keyCode == 40) { // Down arrow
				if (keys[37]) { // Left arrow
					me.Y++;
					me.X--;
				} else if (keys[39]) {  // Right arrow
					me.Y++;
					me.X++;
				} else
					me.Y++;
			} else if (e.keyCode == 37) { // Left arrow
				if (keys[38]) { // Up arrow
					me.Y--;
					me.X--;
				} else if (keys[40]) {  // Down arrow
					me.Y++;
					me.X--;
				} else
					me.X--;
			} else if (e.keyCode == 39) { // Right arrow
				if (keys[38]) { // Up arrow
					me.Y--;
					me.X++;
				} else if (keys[40]) {  // Down arrow
					me.Y++;
					me.X++;
				} else
					me.X++;
			}
			
			var colors = null;
			drawAt(me, meColor, oldMe);
			colors = ctx.getImageData(me.X-offset.X, me.Y-offset.Y, me.W+offset.X+1, me.H+offset.Y+1).data;
			if (intersect(colors, me, offset)) {
				drawAt(oldMe, meColor, me); // rect, fillStyle,  clearRect
				me = { X: oldMe.X, Y: oldMe.Y, W: oldMe.W, H: oldMe.H };
			}
		}
	}, false);
 	document.addEventListener('keyup', function(e) {
 		if(lastDownTarget == canvas)
 			keys[e.keyCode] = false;
 	}, false);
 	
 	drawMap();
 	drawPlayers();
	drawAt(me, meColor, null);

	var timer1 = setInterval(function() {
		var r = Math.round(Math.random() * 10);
		//randomMoving(r, lastDirs[r] );
		randomMoving(3, lastDirs[3]); // a tömb kezdetben 0 0 0 0 ... és a func feltölti
	}, 10);
}
