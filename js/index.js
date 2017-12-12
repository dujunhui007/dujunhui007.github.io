//宇宙特效
"use strict";
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 500;//星星数量

var canvas2 = document.createElement('canvas'),
  ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
  gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
  //星星移动范围，值越大范围越小，
}

var Star = function () {

  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 8;
  //星星大小
  this.orbitX = w / 4;
  this.orbitY = h / 4;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 500000;
  //星星移动速度
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function () {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.5; //尾巴
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
  ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  }
  window.requestAnimationFrame(animation);
}

animation();

//给首页详情加定时动画
function replaceAnimation() {
  var animations = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideInDown", "slideInLeft", "slideInRight", "slideOutLeft", "slideOutRight", "slideInDown", "slideOutUp", "slideInUp", "slideOutDown", "hinge", "rollIn", "rollOut", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown", "slideInDown"],

    introduceIndex = Math.round(Math.random() * (animations.length - 1)),
    aIndex = Math.round(Math.random() * (animations.length - 1));

  // console.log(aIndex);
  $(".homeContainer #myParticulars").addClass(animations[aIndex]);
  $(".homeContainer .introduce").addClass(animations[introduceIndex]);
  // console.log(animations[aIndex]);
  setTimeout(function () {
    $(".homeContainer #myParticulars").removeClass(animations[aIndex]);
    $(".homeContainer .introduce").removeClass(animations[introduceIndex]);
    replaceAnimation();
  }, 3600);
}

replaceAnimation();

//->音频的自动播放
~function () {
  var audioBox = document.getElementById('audioBox'),
    musicBox = document.getElementById('musicBox'),
    musicImg1=musicBox.getElementsByTagName('img')[0],
    musicImg2=musicBox.getElementsByTagName('img')[1];

  window.setTimeout(function () {
    audioBox.play();
    musicImg1.className = 'music musicMove';
    musicImg1.style.opacity = 1;
  }, 1500);
  musicBox.onclick = function () {
    if (audioBox.paused) {
      audioBox.play();
      musicImg1.className = 'music musicMove';
      musicImg2.style.opacity=1;
    } else {
      audioBox.pause();
      musicImg1.className = 'music';
      musicBox.style.opacity = 1;
      musicImg2.style.opacity=0;
    }
  };
}();


