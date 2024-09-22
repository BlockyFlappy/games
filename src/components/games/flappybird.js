function isPC() {
  var a = navigator.userAgent,
    b = ["Android", "iPhone", "iPad", "Mobile"],
    c = !0;
  for (var d = 0; d < b.length; d++) {
    if (a.indexOf(b[d]) > 0) {
      c = !1;
      break;
    }
  }
  return c;
}
function addEvent(a, b, c) {
  a.addEventListener
    ? a.addEventListener(b, c, !1)
    : a.attachEvent
      ? a.attachEvent("on" + b, c)
      : (a["on" + b] = c);
}
function removeEvent(a, b, c) {
  a.removeEventListener
    ? a.removeEventListener(b, c, !1)
    : a.detachEvent
      ? a.detachEvent("on" + b, c)
      : (a["on" + b] = null);
}
function getEventPosition(a) {
  var b, c;
  a.touches
    ? ((b = a.touches[0].pageX), (c = a.touches[0].pageY))
    : a.layerX || a.layerX === 0
      ? ((b = a.layerX), (c = a.layerY))
      : (a.offsetX || a.offsetX === 0) && ((b = a.offsetX), (c = a.offsetY));
  return { x: b, y: c };
}
function getRandom(a, b) {
  return Math.round(Math.random() * (b - a) + a);
}
var images = {
    bg_day: { x: 0, y: 748, w: 288, h: 512 },
    bg_night: { x: 104, y: 236, w: 288, h: 512 },
    bird: { x: 0, y: 0, w: 34, h: 24 },
    bird1_0: { x: 0, y: 48, w: 48, h: 48 },
    button_pause: { x: 34, y: 0, w: 26, h: 28 },
    button_play: { x: 0, y: 110, w: 116, h: 70 },
    button_resume: { x: 60, y: 0, w: 26, h: 28 },
    medals_0: { x: 174, y: 0, w: 44, h: 44 },
    medals_1: { x: 86, y: 0, w: 44, h: 44 },
    medals_2: { x: 218, y: 0, w: 44, h: 44 },
    medals_3: { x: 130, y: 0, w: 44, h: 44 },
    pipe_down: { x: 52, y: 236, w: 52, h: 320 },
    pipe_up: { x: 0, y: 236, w: 52, h: 320 },
    score_panel: { x: 231, y: 108, w: 238, h: 126 },
    text_game_over: { x: 48, y: 48, w: 204, h: 54 },
    text_ready: { x: 252, y: 48, w: 196, h: 62 },
    title: { x: 262, y: 0, w: 178, h: 48 },
    tutorial: { x: 116, y: 110, w: 114, h: 98 },
  },
  Shape = function c(a, b) {
    this.ctx = a;
    this.img = b;
  };
Shape.prototype.draw = function f(a, b, c, d, e) {
  var g = images[a],
    h = g.x,
    i = g.y,
    j = g.w,
    k = g.h;
  this.ctx.drawImage(this.img, h, i, j, k, b, c, d, e);
};
var Bird = function b(a) {
  this.gameIns = a;
  this.shape = a.shape;
  this.width = 34;
  this.height = 24;
  this.left = (a.width - this.width) / 2;
  this.top = (a.height - this.height) / 2 - 100;
  this.g = 1;
  this.rotate = 0;
  this.timer = null;
  this.timer2 = null;
};
Bird.prototype.draw = function a() {
  this.gameIns.ctx.save();
  this.gameIns.ctx.translate(
    this.left + this.width / 2,
    this.top + this.height / 2
  );
  this.gameIns.ctx.rotate((this.rotate * Math.PI) / 180);
  this.gameIns.ctx.translate(
    -this.left - this.width / 2,
    -this.top - this.height / 2
  );
  this.shape.draw("bird", this.left, this.top, this.width, this.height);
  this.gameIns.ctx.restore();
};
Bird.prototype.setPosition = function a() {
  var b = this;
  this.timer = setInterval(function () {
    b.top -= 5;
    b.rotate > -45 && (b.rotate > 10 ? (b.rotate -= 5) : (b.rotate -= 3));
  }, 16.666666666666668);
  this.timer2 = setTimeout(function () {
    clearInterval(b.timer);
  }, 300);
};
Bird.prototype.gravity = function a() {
  this.g *= 1.05;
  this.top += this.g;
  this.rotate < 60 &&
    (this.rotate < 10 ? (this.rotate += 2) : (this.rotate += 1.3));
};
Bird.prototype.reset = function a() {
  clearInterval(this.timer);
  clearTimeout(this.timer2);
};
Bird.prototype.isCollision = function b(a) {
  if (this.top < 0 || this.top > this.gameIns.height) this.gameIns.gameOver();
  else {
    for (var c = 0, d = a.length; c < d; c++) {
      var e = a[c];
      e &&
        e.isPass == !1 &&
        (e.left <= this.left + this.width && e.left > this.left - e.width
          ? (this.top < e.height ||
              this.top > e.height + this.gameIns.gapHeight - this.height) &&
            this.gameIns.gameOver()
          : e.left < this.left - e.width &&
            (this.gameIns.s_point.play(),
            (this.gameIns.score += 1),
            (e.isPass = !0)));
    }
  }
};
var Pipe = function c(a, b) {
  this.gameIns = b;
  this.id = a;
  this.isPass = !1;
  this.ctx = b.ctx;
  this.left = b.width;
  this.top = 0;
  this.width = 50;
  this.height = getRandom(b.height / 2 - 200, b.height / 2 + 100);
};
Pipe.prototype.draw = function a() {
  this.gameIns.shape.draw(
    "pipe_down",
    this.left,
    this.top,
    this.width,
    this.height
  );
  this.gameIns.shape.draw(
    "pipe_up",
    this.left,
    this.gameIns.gapHeight + this.height,
    this.width,
    this.gameIns.height - this.height - this.gameIns.gapHeight
  );
};
Pipe.prototype.move = function a() {
  this.left -= this.gameIns.SpeedX;
  this.left < -50 && (this.gameIns.pipeList[this.id] = null);
};
var Game = function c(a, b) {
  this.gameOverCallback = b;
  this.canvas = a;
  this.ctx = this.canvas.getContext("2d");
  this.width = document.body.clientWidth;
  this.height = document.body.clientHeight;
  this.gapHeight = 200;
  this.gapPipe = 2500;
  this.SpeedX = 2;
  this.intval = 16.666666666666668;
  this.score = 0;
  this.bestScore = 0;
  this.lastScore = 0;
  this.id = 0;
  this.pipeList = [];
  this.isCover = !0;
  this.isReady = !1;
  this.timer = null;
  this.pipe_timer = null;
  this.bird = null;
  this.handler1 = null;
  this.handler2 = null;
  this.s_click = null;
  this.s_die = null;
  this.s_wing = null;
  this.s_point = null;
  this.s_hit = null;
  this.eventType = { start: isPC() ? "mousedown" : "touchstart" };
  var d = window.devicePixelRatio || 1;
  this.canvas.style.width = this.width + "px";
  this.canvas.style.height = this.height + "px";
  this.canvas.width = this.width * d;
  this.canvas.height = this.height * d;
  this.ctx.scale(d, d);
};
Game.prototype.init = function a() {
  var b = this;
  this.img = new Image();
  this.img.src = "/flappybird.png";
  this.img.onload = function () {
    b.shape = new Shape(b.ctx, b.img);
    b.drawBg();
    b.drawCover();
    b.coverListener();
    b.initSound();
  };
};
Game.prototype.initSound = function a() {
  this.s_click = new Audio("/sfx_point.ogg");
  this.s_wing = new Audio("/sfx_wing.ogg");
  this.s_point = new Audio("/sfx_point.ogg");
  this.s_hit = new Audio("/sfx_hit.ogg");
};
Game.prototype.getTime = function a() {
  return new Date().getHours();
};
Game.prototype.drawBg = function a() {
  this.getTime() < 19 && this.getTime() > 6
    ? this.shape.draw("bg_day", 0, 0, this.width, this.height)
    : this.shape.draw("bg_night", 0, 0, this.width, this.height);
};
Game.prototype.drawCover = function a() {
  var b = this.height / 2 - 300;
  this.btnX = (this.width - 116) / 2;
  this.btnY = 350 + b;
  this.shape.draw("title", (this.width - 178) / 2, 100 + b, 178, 48);
  this.shape.draw("button_play", this.btnX, this.btnY, 116, 70);
  this.shape.draw("tutorial", (this.width - 114) / 2, 200 + b, 114, 98);
};
Game.prototype.coverListener = function a() {
  var b = this;
  this.handler2 = function (a) {
    var c = window.event || a,
      d = getEventPosition(c);
    d.x > b.btnX &&
      d.x < b.btnX + 116 &&
      d.y > b.btnY &&
      d.y < b.btnY + 70 &&
      ((b.isControl = !0),
      (b.bird = new Bird(b)),
      b.s_click.play(),
      removeEvent(b.canvas, b.eventType.start, b.handler2),
      b.ctx.clearRect(0, 0, b.width, b.height),
      b.drawBg(),
      b.shape.draw(
        "text_ready",
        (b.width - 178) / 2,
        b.height / 2 - 100,
        204,
        54
      ),
      setTimeout(function () {
        b.reset();
        b.run();
        b.startPipe();
        b.initListener();
      }, 1500));
  };
  addEvent(this.canvas, this.eventType.start, this.handler2);
};
Game.prototype.drawScore = function f(a, b, c, d, e) {
  this.ctx.save();
  this.ctx.font = "Bold " + b + "px Arial";
  this.ctx.textAlign = "right";
  this.ctx.fillStyle = e;
  this.ctx.shadowOffsetX = 3;
  this.ctx.shadowOffsetY = 3;
  this.ctx.shadowBlur = 3;
  this.ctx.shadowColor = "black";
  this.ctx.fillText(a, c, d);
  this.ctx.restore();
};
Game.prototype.drawScorePanel = function a() {
  this.shape.draw(
    "score_panel",
    (this.width - 238) / 2,
    this.height / 2 - 100,
    238,
    126
  );
};
Game.prototype.getScore = function a() {
  return this.score;
};
Game.prototype.drawMedal = function a() {
  this.score < 20
    ? this.shape.draw(
        "medals_0",
        (this.width - 44) / 2 - 66,
        this.height / 2 - 54,
        44,
        44
      )
    : this.score < 50
      ? this.shape.draw(
          "medals_3",
          (this.width - 44) / 2 - 66,
          this.height / 2 - 54,
          44,
          44
        )
      : this.score < 100
        ? this.shape.draw(
            "medals_2",
            (this.width - 44) / 2 - 66,
            this.height / 2 - 54,
            44,
            44
          )
        : this.shape.draw(
            "medals_1",
            (this.width - 44) / 2 - 66,
            this.height / 2 - 54,
            44,
            44
          );
};
Game.prototype.run = function a() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.drawBg();
  for (var b = 0, c = this.pipeList.length; b < c; b++) {
    var d = this.pipeList[b];
    d && (d.draw(), d.move());
  }
  this.drawScore(this.score, 50, this.width - 20, 50, "#fff");
  this.bird.draw();
  this.bird.gravity();
  this.bird.isCollision(this.pipeList);
  this.timer = requestAnimationFrame(this.run.bind(this));
};
Game.prototype.drawGameOver = function a() {
  this.shape.draw(
    "text_game_over",
    (this.width - 178) / 2,
    this.height / 2 - 100,
    204,
    54
  );
};
Game.prototype.gameOver = function a() {
  var b = this;
  this.s_hit.play();
  this.stop();
  setTimeout(function () {
    b.drawGameOver();
    b.gameOverCallback(b.score);
  }, 1000);
  setTimeout(function () {
    b.drawBg();
    b.shape.draw("title", (b.width - 178) / 2, b.height / 2 - 200, 178, 48);
    b.drawScorePanel();
    b.drawMedal();
    b.drawScore(
      b.score,
      20,
      (b.width - 178) / 2 + 170,
      b.height / 2 - 50,
      "#fff"
    );
    b.drawScore(
      b.bestScore,
      20,
      (b.width - 178) / 2 + 170,
      b.height / 2 - 4,
      "#fff"
    );
    b.shape.draw("button_play", b.btnX, b.btnY, 116, 70);
    b.bestScore < b.score && (b.bestScore = b.score);
    b.lastScore = b.score;
    removeEvent(b.canvas, b.eventType.start, b.handler1);
    addEvent(b.canvas, b.eventType.start, b.handler2);
  }, 2000);
};
Game.prototype.startPipe = function a() {
  var b = this;
  this.pipe_timer = setInterval(function () {
    var a = b.pipeList.length;
    b.drawPipe(a);
  }, this.gapPipe);
};
Game.prototype.drawPipe = function b(a) {
  var c = new Pipe(a, this);
  this.pipeList.push(c);
};
Game.prototype.initListener = function a() {
  var b = this;
  this.handler1 = function (a) {
    b.s_wing.play();
    b.bird.reset();
    b.bird.setPosition();
    b.bird.g = 1;
  };
  addEvent(this.canvas, this.eventType.start, this.handler1);
};
Game.prototype.stop = function a() {
  var b = this;
  setTimeout(function () {
    window.cancelAnimationFrame(b.timer);
    clearInterval(b.pipe_timer);
  }, 0);
};
Game.prototype.reset = function a() {
  this.pipeList = [];
  this.score = 0;
  this.timer = null;
  this.pipe_timer = null;
};
export default Game;
