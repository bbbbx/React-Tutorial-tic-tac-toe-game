var Game = function() {
	var gameDiv,		//游戏 DOM
			nextDiv,		//下一个方块 DOM
			timeDiv,		//时间 DOM
			scoreDiv,		//分数 DOM
			score = 0,	//分数
			resultDiv,
			gameData = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			],
			nextDivs = [],
			gameDivs = [];

	//当前的方块
	var cur;

	//下一个方块
	var next;

	var initDiv = function(container, data, divs) {
		for (var i = 0; i < data.length; i++) {
			var div = [];
			for (var j = 0; j < data[0].length; j++) {
			 	var newNode = document.createElement("div");
			 	newNode.className = 'none';
			 	newNode.style.top = (i*20) + 'px';
			 	newNode.style.left = (j*20) + 'px';
			 	container.appendChild(newNode);
			 	div.push(newNode);
			}
			divs.push(div);
		}
	};

	var refreshDiv = function(data, divs) {
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[0].length; j++) {
				if (data[i][j] == 0) {
					divs[i][j].className = "none";
				}
				if (data[i][j] == 1) {
					divs[i][j].className = "done";
				}
				if (data[i][j] == 2) {
					divs[i][j].className = "current";
				}
			}
		}
	};

	/**
	 * [init 初始化游戏]
	 * @param  {Node} doms [description]
	 * @param  {[type]} type [description]
	 * @param  {[type]} dir  [description]
	 * @return {[type]}      [description]
	 */
	var init = function(doms, type, dir) {
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		timeDiv = doms.timeDiv;
		scoreDiv = doms.scoreDiv;
		resultDiv = doms.resultDiv;
		next = SquareFactory.prototype.make(type, dir);
		initDiv(gameDiv, gameData, gameDivs);
		initDiv(nextDiv, next.data, nextDivs);
		refreshDiv(next.data, nextDivs);
	};

	/**
	 * [check 检测点是否合法]
	 * @param  {[type]} pos [description]
	 * @param  {[type]} x   [description]
	 * @param  {[type]} y   [description]
	 * @return {Boolean}     [方块目前的位置是否合法]
	 */
	var check = function(pos, x, y) {
		if (pos.x + x < 0) {
			return false;
		} else if (pos.x + x >= gameData.length) {
			return false;
		} else if (pos.y + y < 0) {
			return false;
		} else if (pos.y + y >= gameData[0].length) {
			return false;
		} else if (gameData[pos.x + x][pos.y + y] == 1) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * [isValue 检测方块的数据是否合法]
	 * @param  {Number}  pos  [点的位置]
	 * @param  {Number}  data [点的数据]
	 * @return {Boolean}      [是否合法]
	 */
	var isValue = function(pos, data) {
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j <data[0].length; j++) {
				if (data[i][j] != 0 && !check(pos, i, j)) {
					return false;
				}
			}
		}
		return true;
	}
	/**
	 * [clearData 清除数据]
	 * @return {[type]} [description]
	 */
	var clearData = function() {
		for (var i = 0; i < cur.data.length; i++) {
			for (var j = 0; j < cur.data[0].length; j++) {
				//如果点是合法的
				if (check(cur.origin, i, j)) {
					gameData[cur.origin.x + i][cur.origin.y + j] = 0;
				}
			}
		}
	}
	/**
	 * [setData 设置数据]
	 */
	var setData = function() {
		for (var i = 0; i < cur.data.length; i++) {
			for (var j = 0; j < cur.data[0].length; j++) {
				//如果点是合法的
				if (check(cur.origin, i, j)) {
					gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
				}
			}
		}
	}

	//下移
	var down = function() {
		if(cur.canDown(isValue)) {
			clearData();
			cur.down();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
		} else {
			return false;
		}
	}
	//左移
	var  left = function() {
		if(cur.canLeft(isValue)) {
			clearData();
			cur.left();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	//右移
	var right = function() {
		if(cur.canRight(isValue)) {
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	//上移旋转
	var rotate = function() {
		if(cur.canRotate(isValue)) {
			clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	/**
	 * [fixed 方块移动到底部时固定]
	 * @return {[type]} [description]
	 */
	var fixed = function() {
		for (var i = 0; i < cur.data.length; i++) {
			for (var j = 0; j < cur.data[0].length; j++) {
				if (check(cur.origin, i, j) && gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
					gameData[cur.origin.x + i][cur.origin.y + j] = 1;
				}
			}
		}
		refreshDiv(gameData, gameDivs);
	}

	/**
	 * [performNext 使用下一个方块]
	 * @return {[type]} [description]
	 */
	var performNext = function(type, dir) {
		cur = next;
		setData();
		next = SquareFactory.prototype.make(type, dir);
		refreshDiv(gameData, gameDivs);
		refreshDiv(next.data, nextDivs);
	}

	/**
	 * [checkClear 消行]
	 * @return {Number} [消除的行数]
	 */
	var checkClear = function() {
		var lines = 0;
		for (var i = gameData.length-1; i >= 0; i--) {
			var clear = true;
			for (var j = 0; j < gameData[0].length; j++) {
				if (gameData[i][j] != 1) {
					clear = false;
					break;
				}
			}
			if (clear) {
				lines++;
				for (var k = i; k > 0; k--) {
					for (var n = 0; n < gameData[0].length; n++) {
						gameData[k][n] = gameData[k-1][n];
					}	
				}
				for (var n = 0; n < gameData[0].length; n++) {
					gameData[0][n] = 0;
				}
				i++;
			}
		}
		return lines;
	}

	/**
	 * [gameover 判断游戏是否结束]
	 * @return {[type]} [description]
	 */
	var checkGameOver = function() {
		var gameOver = false;
		for (var i = 0; i < gameData[0].length; i++) {
			if (gameData[1][i] == 1) {
				gameOver = true;
			}
		}
		return gameOver;
	}

	/**
	 * [setTime 设置时间]
	 */
	var setTime = function(time) {
		timeDiv.innerHTML = time;
	}

	/**
	 * [addScore 加分]
	 */
	var addScore = function(lines) {
		var s = 0;
		switch(lines) {
			case 1:
				s = 10;
				break;
			case 2:
				s = 30;
				break;
			case 3:
				s = 60;
				break;
			case 4:
				s = 100;
				break;
			default :
				break;
		}
		score += s;
		scoreDiv.innerHTML = score;
	}

	/**
	 * [showResult 显示游戏结果]
	 * @return {[type]} [description]
	 */
	var showResult = function(isWin) {
		if (isWin) {
			resultDiv.innerHTML = "游戏结束，你赢了！";
		} else {
			resultDiv.innerHTML = "游戏结束，你输了！";
		}
	}
	/**
	 * 导出 API
	 */
	this.init = init;
	this.down = down;
	this.left = left;
	this.right = right;
	this.rotate = rotate;
	this.fall = function() {
		while(down()) {	}
	};
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.setTime = setTime;
	this.addScore = addScore;
	this.showResult = showResult;
}