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