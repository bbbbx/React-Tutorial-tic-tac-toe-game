var Local = function() {
	//游戏对象
	var game;
	//时间间隔
	var INTERVAL = 200;
	
	/**
	 * [timer 定时器]
	 * @type {[type]}
	 */
	var timer = null;
	/**
	 * [timeCount 时间计数器]
	 * @type {Number}
	 */
	var timeCount = 0;
	/**
	 * [time 时间]
	 * @type {Number}
	 */
	var time = 0;
	//绑定键盘事件
	var bindKeyEvent = function() {
		document.onkeydown = function(event) {
			// up
			if (event.keyCode == 38) {
				game.rotate();
			}
			// right
			if (event.keyCode == 39) {
				game.right();
			}
			// down
			if (event.keyCode == 40) {
				game.down();
			}
			//left
			if (event.keyCode == 37) {
				game.left();
			}
			// space
			if (event.keyCode == 32) {
				game.fall();
			}
		}
	}

	/**
	 * [move 移动方块]
	 * @return {[type]} [description]
	 */
	var move = function() {
		timeFunc();
		if (!game.down()) {
			game.fixed();
			var lines = game.checkClear();
			if (lines) {
				game.addScore(lines);
			}
			game.checkClear();
			var gameOver = game.checkGameOver();
			if (gameOver) {
				game.showResult(false);
				stop()
			} else {
				game.performNext(generateType(), generateDir());
			}
		}
	}

	/**
	 * [timeFunc 计时函数]
	 * @return {[type]} [description]
	 */
	var timeFunc = function() {
		timeCount++;
		if (timeCount == 5) {
			time++;
			timeCount = 0;
			game.setTime(time);
		}
	}

	/**
	 * [start 开始游戏]
	 * @return {[type]} [description]
	 */
	var start = function() {
		var doms = {
			gameDiv: document.getElementById("game"),
			nextDiv: document.getElementById("next"),
			timeDiv: document.getElementById("time"),
			scoreDiv: document.getElementById("score"),
			resultDiv: document.getElementById("result")
		}
		game = new Game();
		game.init(doms, generateType(), generateDir());
		bindKeyEvent();
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, INTERVAL);
	}

	/**
	 * [stop 停止游戏]
	 * @return {[type]} [description]
	 */
	var stop = function() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	}

	/**
	 * [generateType 随机生成一个方块类型]
	 * @return {[type]} [description]
	 */
	var generateType = function() {
		return Math.ceil(Math.random()*7) - 1;
	}

	/**
	 * [generateDir 随机生成一个旋转方向]
	 * @return {[type]} [description]
	 */
	var generateDir = function() {
		return Math.ceil(Math.random()*4) - 1;
	}
	//导出 API
	this.start = start;
}