function intersect(colors, rect, offset) {
	var xMaxLength = (rect.X+rect.W+offset.X - (rect.X-offset.X)) * 4;
			
	for (var i = 0; i < xMaxLength * offset.Y; i++) {
		if (colors[i] != 0)
			return true;
	}
	var sc = 0, c = -1;
	for (var i = xMaxLength * offset.Y; i < colors.length;) {
		if (colors[i] != 0)
			return true;
		if (++sc == 4 || ++c == 8) {
			if (i + xMaxLength - 7 != colors.length - 4)
				i += xMaxLength - 7;
			else
				i++;
			c = 0;
		}
		else
			i++;
	}
	return false;
}
function checkCollision(rectangleA, rectangleB) {
	var top = Math.max(rectangleA.Y, rectangleB.Y);
	var bottom = Math.min(rectangleA.Y + rectangleA.H, rectangleB.Y + rectangleB.H);
	var left = Math.max(rectangleA.X, rectangleB.X);
	var right = Math.min(rectangleA.X + rectangleA.W, rectangleB.X + rectangleB.W);

	if (top < bottom && left < right) {
		var v =  { X: rectangleB.X - rectangleA.X, Y: rectangleB.Y - rectangleA.Y };
		var x = right - left, y = bottom - top;
		if (x < y)
			v.Y = 0;
		else if (x > y) // top, bottom, 
			v.X = 0;
		else {
			v.X = 0;
			v.Y = 0;
		}
		return true;
	}
	else {
		return false;
	}
}
