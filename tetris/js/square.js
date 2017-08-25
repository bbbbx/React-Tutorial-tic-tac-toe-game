var Square = function() {
	this.data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	this.origin = {
		x: 0,
		y: 0
	}
	//方向
	this.dir = 0;
}

Square.prototype.canRotate = function(isValue) {
	var d = (this.dir + 1) % 4;
	var test = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data[0].length; j++) {
			test[i][j] = this.rotates[d][i][j];
		}
	}
	return isValue(this.origin, test);
}
Square.prototype.rotate = function(num) {
	if (!num) {
		num = 1;
	}
	this.dir = (this.dir + num) % 4;
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data[0].length; j++) {
			this.data[i][j] = this.rotates[this.dir][i][j];
		}
	}
}

Square.prototype.canDown = function(isValue) {
	var test = {
		x: this.origin.x + 1,
		y: this.origin.y
	};
	return isValue(test, this.data);
}
Square.prototype.down = function() {
	this.origin.x++;
}

Square.prototype.canLeft = function(isValue) {
	var test = {
		x: this.origin.x,
		y: this.origin.y - 1
	};
	return isValue(test, this.data);
}
Square.prototype.left = function() {
	this.origin.y--;
}

Square.prototype.canRight = function(isValue) {
	var test = {
		x: this.origin.x,
		y: this.origin.y + 1
	};
	return isValue(test, this.data);
}
Square.prototype.right = function() {
	this.origin.y++;
}