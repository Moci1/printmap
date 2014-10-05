function drawAt(item, color, clearRect) {
	if (clearRect != null)
		ctx.clearRect(clearRect.X, clearRect.Y, clearRect.W, clearRect.H);
	ctx.fillStyle = "rgba("+color.r+","+color.g+","+color.b+", "+color.a+")";
	ctx.fillRect(item.X, item.Y, item.W, item.H);
}
function drawMap() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < map.length; i++) {
		if (map[i].Value == 'wall') {
			ctx.fillStyle = "rgba(140,70,20, 1.0)";
			ctx.fillRect(map[i].X, map[i].Y, map[i].W, map[i].H);
		}
	}
}
function drawPlayers() {
	for (var i = 0; i < bots.length; i++) {
//	ctx.fillStyle = "rgba("+Math.random()*100+","+Math.random()*100+","+Math.random()*100+", 1.0)";
		ctx.fillStyle = "rgba(40,230,20, 1.0)";
		ctx.fillRect(bots[i].X, bots[i].Y, bots[i].W, bots[i].H);
	}
}
