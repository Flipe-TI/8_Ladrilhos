window.onload = function Teste() {
    let squares = [],
        answer = [];
    let startScreen = document.querySelector('#startScreen');
        startScreen.addEventListener("click",startGame,false);
    let overScreen = document.querySelector('#overScreen');
    var temporizador = document.getElementById('temporizador');

    function init() {
        for(let i = 1;i < 9;i++) {
            let square = document.querySelector('#n' + i);
            square.addEventListener("click",movesquare,false);

            squares.push(square);
        }
        squares.push(null);
        answer = squares;
        
        render();
    }

    function render() {
        for(let i in squares) {
            let square = squares[i];
            // Para verificar se uma variável não é nula deixe ela só num if
            if(square) {
                square.style.left = (i%3) * 100 + "px";
                if(i < 3) {
                    square.style.top = "0px";
                } else {
                    if(i < 6) {
                        square.style.top = "105px";
                    } else {
                        square.style.top = "205px";
                    }
                }
            }
        }
    }

    function movesquare() {
        let index = squares.indexOf(this);
        if(index % 3 !== 0){
            if(!squares[index-1]) {
                squares[index-1] = this;
                squares[index] = null;
            }
        }
        if(index % 3 !== 2){
            if(!squares[index+1]) {
                squares[index+1] = this;
                squares[index] = null;
            }
        }
        if(index > 2){
            if(!squares[index-3]) {
                squares[index-3] = this;
                squares[index] = null;
            }
        }
        if(index < 6){
            if(!squares[index+3]) {
                squares[index+3] = this;
                squares[index] = null;
            }
        }
        render();
        if(chkWin()) {
            wingame();
        }
    }

    function chkWin() {
        for(let i in squares) {
            let a = squares[i];
            let b = answer[i];
            if(a !== b){
                return false;
            }
        }
        return true;
    }

    function wingame() {
        overScreen.style.background = "url('img/win.png')";
        overScreen.style.opacity = "1";
        overScreen.style.zIndex = "1";
        
        setTimeout(function(){
            overScreen.addEventListener("click", startGame, false);
        },500);
    }

    function Gameover() {
        overScreen.style.background = "url('img/Gameover.png')";
        overScreen.style.opacity = "1";
        overScreen.style.zIndex = "1";
        setTimeout(function(){
            overScreen.addEventListener("click", startGame, false);
        },500);
    }

    function randomSort(oldArray) {
        let newArray;

        do {
            newArray = [];
            while (newArray.length < oldArray.length) {
                let i = Math.floor(Math.random()*oldArray.length);
                if(newArray.indexOf(oldArray[i]) < 0) {
                    newArray.push(oldArray[i]);
                }
            }
        }while(!validGame(newArray));
        return newArray;
    }

    function validGame(array) {
        let inversions = 0;
        let len = array.length;

        for(i = 0;i < len -1;i++) {
            for(let j = i+1;j < len;j++) {
                if(array[i] && array[j] && array[i].dataset.value < array[j].dataset.value) {
                    inversions++;
                }
            }
        }
        return inversions%2 === 0;
    }

    function startGame() {
        squares = randomSort(squares);
        this.style.opacity = "0";
        this.style.zIndex = "-1";
        this.removeEventListener("click",startGame,false);
        ativerIntervalo();
        render();
    }

    

    var ativerIntervalo = function() {
        temporizador.innerHTML = 120;
        var intervalo = setInterval(function() {
        var novoValor = parseInt(temporizador.innerHTML, 10) - 1;
        temporizador.innerHTML = novoValor;
    
        if (novoValor === 0) {
            Gameover();
            clearInterval(intervalo);
        }
        }, 1000);
    };
    
    

    init();
}