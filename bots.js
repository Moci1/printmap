function randomMoving(botIndex, dir) {
	var rnd;
	if (dir == 0) {
		rnd = Math.round(Math.random() * 10);
	}
	else
		rnd = dir;
	if (rnd > 7) rnd -= 3;
	lastDirs[botIndex] = rnd;
	var res = scanRect(bots[botIndex], { W: 1, H: 1 }, directions[rnd]);
	if (!res) {
		var counter = 1;
		while (counter < Math.random() * 10) {
			var oldBot = { X:bots[botIndex].X, Y:bots[botIndex].Y, W:bots[botIndex].W, H:bots[botIndex].H };
			bots[botIndex].X += directions[rnd].X;
			bots[botIndex].Y += directions[rnd].Y;
			var colors = null;
			drawAt(bots[botIndex], { r: 40, g: 250, b: 20, a: 1.0 }, oldBot);
			colors = ctx.getImageData(bots[botIndex].X-1, bots[botIndex].Y-1, bots[botIndex].W+1+1, bots[botIndex].H+1+1).data;
			if (intersect(colors, bots[botIndex], { X:1, Y:1 })) {
				drawAt(oldBot, { r: 40, g: 250, b: 20, a: 1.0 }, bots[botIndex]); // rect, fillStyle,  clearRect
				bots[botIndex] = { X: oldBot.X, Y: oldBot.Y, W: oldBot.W, H: oldBot.H };
				rnd = Math.round(Math.random() * 10);
				if (rnd > 7) rnd -= 3;
				lastDirs[botIndex] = rnd;
			}
			counter++;
		}
	}
	else {
		rnd = Math.round(Math.random() * 10);
		if (rnd > 7) rnd -= 3;
		lastDirs[botIndex] = rnd;
	}
}
function scanColors(pxs) {
 	for (var x = 0; x < pxs.length; x += 4) {
		var c = 0;
		while (c != 3) {
			if (pxs[x+c] != 0)
				return { R: x - c, G: x - c + 1, B: x - c + 2, A: x - c + 3 };
			c++;
		}		
 	}
 	return false;
}
function scanRect(sourceRect, destSize, dir) {
	var pxs;
	switch (dir.X) { // nem mukodik
		case -1:
			if (dir.Y == 0) {
				pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y, destSize.W, destSize.H); break;
			}
			else if (dir.Y == -1) {
				pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y - 11, destSize.W, destSize.H); break;
			}
			else if (dir.Y == 1) {
				pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y + 11, destSize.W, destSize.H); break;
			}
		case 1:
			if (dir.Y == 0) {
				pxs = ctx.getImageData(sourceRect.X+sourceRect.W + 1, sourceRect.Y, destSize.W, destSize.H); break;
			}
			else if (dir.Y == -1) {
				pxs = ctx.getImageData(sourceRect.X + 11, sourceRect.Y - 11, destSize.W, destSize.H); break;
			}
			else if (dir.Y == 1) {
				pxs = ctx.getImageData(sourceRect.X + 11, sourceRect.Y + 11, destSize.W, destSize.H); break;
			}
		case 0:
			if (dir.Y == -1) {
				pxs = ctx.getImageData(sourceRect.X, sourceRect.Y-sourceRect.H - 1, destSize.W, destSize.H); break;
			}
			else if (dir.Y == 1) {
				pxs = ctx.getImageData(sourceRect.X, sourceRect.Y + sourceRect.H + 1, destSize.W, destSize.H); break;
			}
		//case { X:-1,Y:0 }: pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y, destSize.W, destSize.H); break;
		//case { X:1,Y:0 }: pxs = ctx.getImageData(sourceRect.X+sourceRect.W + 1, sourceRect.Y, destSize.W, destSize.H); break;
		//case { X:0,Y:-1 }: pxs = ctx.getImageData(sourceRect.X, sourceRect.Y-sourceRect.H - 1, destSize.W, destSize.H); break;
		//case { X:0,Y:1 }: pxs = ctx.getImageData(sourceRect.X, sourceRect.Y + sourceRect.H + 1, destSize.W, destSize.H); break;
		//case { X:-1,Y:-1 }: pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y - 11, destSize.W, destSize.H); break;
		//case { X:1,Y:-1 }: pxs = ctx.getImageData(sourceRect.X + 11, sourceRect.Y - 11, destSize.W, destSize.H); break;
		//case { X:-1,Y:1 }: pxs = ctx.getImageData(sourceRect.X - 11, sourceRect.Y + 11, destSize.W, destSize.H); break;
		//case { X:1,Y:1 }: pxs = ctx.getImageData(sourceRect.X + 11, sourceRect.Y + 11, destSize.W, destSize.H); break;
		default: break;
	}
	return scanColors(pxs.data);
}
