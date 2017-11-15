define(['helper/food','helper/snake'],function (Food,Snake) {
    function Game (options) {
        options = options || {};
        this.intervers = options.intervers || 200;
        this.boss = document.getElementById('boss');
        this.btn = document.getElementById('btn');
        this.newScore = document.getElementById('newScore');
        this.hisScore = document.getElementById('hisScore');
        this.tips = document.getElementById('tips');
        this.level = document.getElementById('level');
        this.hard = document.getElementById('hard');
        this.spans = document.getElementsByClassName('spans');
        this.beishu = options.beishu || 1;
        this.food = new Food({game : this});
        this.snake = new Snake({game : this});
        this.timer = options.timer || null;
    }

    var methods = Game.prototype;

    methods.init = function () {

        this.timerGo();
    };

    methods.controller = function () {
        document.onkeydown = (function (e) {
            e = e || event;
            switch (e.keyCode) {
                case 37 : 
                    this.snake.direction = (this.snake.direction !== 'right') ? (this.snake.direction = 'left') : 'right';
                break;
                case 38 :
                    this.snake.direction = (this.snake.direction !== 'down') ? (this.snake.direction = 'up') : 'down';
                break;
                case 39 :
                     this.snake.direction = (this.snake.direction !== 'left') ? (this.snake.direction = 'right') : 'left';
                break;
                case 40 :
                    this.snake.direction = (this.snake.direction !== 'up') ? (this.snake.direction = 'down') : 'up';
                break;                
            }
        }).bind(this)
        this.snake.moveBody();
    }
    
    methods.timerGo = function () {
        var that = this;
        var speed = that.intervers; // 200
        function go () {
            if (that.snake.stopIt) {
                return;
            }
            clearTimeout(that.timer);
            that.timer = window.setTimeout(function () {
                speed = that.intervers - that.snake.score*that.beishu;
                speed = speed <= 20 ? 20 : speed;
                that.controller();
               
                go();
            },speed)

        }
        go();
    }
    return Game;
});