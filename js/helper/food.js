define(function (){
    function Food (options) {
        options = options || {};
        this.game = options.game;
        this.w = options.w || 20;
        this.h = options.h || 20;
        this.x = options.x || 200;
        this.y = options.y || 200;
        this.ele = document.createElement('div');


        this.init();
    }

    var methods = Food.prototype;
    
    // 初始化 将 食物渲染到页面 
    methods.init = function () {    
        var div = this.ele;
        div.classList.add('blinkFood');
        div.style.width = this.w + 'px';
        div.style.height = this.h + 'px';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.position = 'absolute';
        div.style.backgroundColor = 'orangered';
        div.style.borderRadius = '50%';
        this.game.boss.appendChild(div);
    }
    // 食物被吃掉之后 随机刷新 
    methods.reload = function () {
        var div = this.ele;
        div.classList.add('blinkFood');
        div.style.width = this.w + 'px';
        div.style.height = this.h + 'px';
        // 刷新的位置 
        div.style.left = this.randomPosition().x + 'px';
        div.style.top = this.randomPosition().y + 'px';
        div.style.position = 'absolute';
        div.style.backgroundColor = 'orangered';
        div.style.borderRadius = '50%';
        this.game.boss.appendChild(div);
    }
    // 随机刷新 食物的位置 
    methods.randomPosition = function () {
        var bossW = this.game.boss.offsetWidth; // 蛇场的宽度
        var bossH = this.game.boss.offsetHeight; // 蛇场的高度
        var numX = bossW/this.w; // 食物占 一格  水平方向上一共有多少个格子
        var numY = bossH/this.h;
        var x = Math.floor(Math.random() * numX) * this.w;
        var y = Math.floor(Math.random() * numY) * this.h;
        return {
            x : x,
            y : y
        }     
    }


    return Food;
});