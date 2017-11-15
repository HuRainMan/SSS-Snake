require(['helper/game'],function (Game) {
    var game = new Game();
    game.btn.onclick = function () {
        start();
    }

    document.addEventListener('keyup',function (e) {
            if (e.keyCode === 13) {
                start();
            }
        })  

    for (var i = 0; i < game.spans.length; i++) { 
            game.spans[i].index = i;
            game.spans[i].addEventListener('click',function () {
                game.snake.stopIt = true;
                for (var i = 0; i < game.spans.length; i++) { 
                    game.spans[i].parentNode.classList.remove('slected');
                 }

                 this.parentNode.classList.add('slected');
                 game.beishu = this.index + 8;

                 var nandu =  (this.index+1) * 33;
                 game.level.value  = nandu;
                 game.hard.innerText = "当前难度: " + nandu;
                 game.snake.stopIt = false;
                 start();
                 
            })
         }


    function start() {
       game.btn.style.display = 'none';
        game.boss.style.display = 'block';
        // 开始游戏的时候 获取本地存储 获取历史最高分
        var history = JSON.parse(window.localStorage.getItem('historyScore') || '[]');
        if (history.score) {
        }else{
            history.score = 0;
        }
        game.hisScore.innerText = "历史最高分为: " + history.score + "分";
        
        game.init();
    }
});