define(function () {
    function Snake(options) {
        options = options || {};
        this.game = options.game;
        this.w = options.w || 20;
        this.h = options.h || 20;
        this.score = 0;
        this.direction = options.direction || 'right';
        this.body = [
            {
                x: 2,
                y: 2,
                color: 'green',
                ele: document.createElement('div')
            },
            {
                x: 3,
                y: 2,
                color: 'green',
                ele: document.createElement('div')
            },
            {
                x: 4,
                y: 2,
                color: 'orangered',
                ele: document.createElement('div')
            }

        ];

        this.init();
    }
    var methods = Snake.prototype;

    methods.init = function () {
        // 将 渲染好的蛇身子放到页面上 
        this.drawSnakeBody();
    }

    // 渲染蛇的函数 
    methods.drawSnakeBody = function () {
        for (var i = 0; i < this.body.length; i++) {
            var div = this.body[i].ele;
            div.style.width = this.w + 'px';
            div.style.height = this.h + 'px';
            div.style.backgroundColor = this.body[i].color;
            div.style.position = 'absolute';
            div.style.left = this.body[i].x * this.w + 'px';
            div.style.top = this.body[i].y * this.h + 'px';
            this.game.boss.appendChild(div);
        }
    }
    // 让蛇动起来 
    methods.moveBody = function () {
        // 撞墙之前也要看看 临死前吃到了好吃的没有 
        this.eatFood();
        // 在迈出下一步之前 判断 他的方向 以及 位置 ==> 如果执迷不悟 ==> 停止函数并返回 ==> otherwise ==> 不返回的话会多走一步
        if (!this.checkCrash()) {
            // 死亡之后清除定时器 
            clearInterval(this.game.timer);
            // 将 得分 存储到 本地存储 
            var history = JSON.parse(window.localStorage.getItem('historyScore') || '[]');
            if (this.score > history.score) {
                window.localStorage.setItem('historyScore',JSON.stringify({score : this.score}));
            }
            this.game.tips.style.display = 'block';
            document.addEventListener('keyup',function (e) {

                if (e.keyCode === 32) {
                    window.location.reload();
                }
            })
           

            return;
        };
        // 身体的移动
        for (var i = 0; i < this.body.length - 1; i++) {
            this.body[i].x = this.body[i + 1].x;
            this.body[i].y = this.body[i + 1].y;
        }
        // 蛇头配合着 键盘移动
        switch (this.direction) {
            case 'right': this.body[this.body.length - 1].x++; break;
            case 'left': this.body[this.body.length - 1].x--; break;
            case 'up': this.body[this.body.length - 1].y--; break;
            case 'down': this.body[this.body.length - 1].y++; break;
        }
        this.drawSnakeBody();
    }

    // 边界检测 吃自己 检测
    methods.checkCrash = function () {
        var onOff = true
        var Head = this.body[this.body.length - 1].ele;
        var head = this.body[this.body.length - 1];        
        var largestX = this.game.boss.offsetWidth;
        var largestY = this.game.boss.offsetHeight;
        if (this.direction === 'right' && Head.offsetLeft + this.w >= largestX) {
             onOff = false;
        }
        if (this.direction === 'left' && Head.offsetLeft <= 0) {
             onOff = false;
        }
        if (this.direction === 'up' && Head.offsetTop <= 0) {
             onOff = false;
        }
        if (this.direction === 'down' && Head.offsetTop + this.w >= largestY) {
            onOff = false;
        }

        for (var i = 0; i < this.body.length-1; i++) { 
            if (head.x == this.body[i].x && head.y == this.body[i].y) {
                return onOff = false;
            } 
         }
         return onOff
    }

    // 检测是否吃到了食物 
    methods.eatFood = function () {
        var Head = this.body[this.body.length - 1].ele;
        // console.log(this.body)
        // 吃到了东西没有 ==> 吃到了
        if (Head.offsetLeft === this.game.food.ele.offsetLeft && Head.offsetTop === this.game.food.ele.offsetTop) {
            // 刷新食物的位置 
            this.game.food.reload();
            // 蛇 长身体
            var last = this.body[0];
            this.body.unshift({
                x: last.x,
                y: last.y,
                color: 'green',
                ele: document.createElement('div')
            });
            // 身体长长了 ==> 通知函数 换一件长一点的衣服 
            this.drawSnakeBody();
            // addPoints
            this.addPoints();
            // 
            var nandu =  Math.floor(this.score/2) > 100 ? 100 :  Math.floor(this.score/2);
            this.game.level.value  = nandu;
            this.game.hard.innerText = "当前难度: " + nandu;
        }
    }

    methods.addPoints = function () {
        // 得分 ++
        this.score++;
        this.game.newScore.innerText = "当前得分为: " + this.score + "分";
        var history = JSON.parse(window.localStorage.getItem('historyScore') || '[]');
        if (history.score) {
            history.score = this.score > history.score ? this.score : history.score;
            this.game.hisScore.innerText = "历史最高分为: " + history.score + '分';
        }
    }

    return Snake;
})