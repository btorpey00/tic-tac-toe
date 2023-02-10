const Player = (name, symbol) => {
    return {
        name,
        symbol
    }
}
const player1 = Player('Player 1', 'x');
const player2 = Player('Player 2', 'o');

const playGame = (function() {
    const gameBoard = document.getElementById('game-board');
    const playersTurnName = document.getElementById('players-turn-name');
    const playersTurnIcon = document.getElementById('player-turn-icon');
    const restartButton = document.getElementById('restart-button');
    const squares = document.querySelectorAll('.square');
    const playersTurnText = document.querySelector('.players-turn-text');
    const gameOverWinner = document.getElementById('game-over-winner');
    const gameOverDraw = document.getElementById('game-over-draw');
    let isGameOver = false;
    let chosenSquares = ['','','','','','','','',''];
    let turn = 1;

    //event listeners
    restartButton.addEventListener('click', resetBoard);
    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            placeSymbol(i);
        });
    };

    function placeSymbol(index) {
        if (chosenSquares[index] === '' && isGameOver !== true) {
            if (turn %2 === 0) {
                squares[index].firstChild.classList.add('fa-o');
                squares[index].firstChild.setAttribute('title', 'O')
                chosenSquares[index] = 'o'; 
            }
            else {
                squares[index].firstChild.classList.add('fa-x');
                squares[index].firstChild.setAttribute('title', 'X')
                chosenSquares[index] = 'x';          
            }
            checkWinner();
            if (isGameOver !== true) {
                updateTurn();
            }
        };
    };

    function updateTurn() {
        if (turn <= 8) {
            turn++;
            if (turn %2 === 0) {
                playersTurnName.textContent = player2.name;
                playersTurnIcon.classList = 'fa-solid fa-o'; 
            }
            else {
                playersTurnName.textContent = player1.name;
                playersTurnIcon.classList = 'fa-solid fa-x';           
            }
        }
        else {
            gameOver('Draw');
        }
    };

    function checkWinner() {
            const winningCombos = [
            //rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            //columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            //diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let a = 0; a < winningCombos.length; a++) {
            if (chosenSquares[winningCombos[a][0]] === 'x' && chosenSquares[winningCombos[a][1]] === 'x' && chosenSquares[winningCombos[a][2]] === 'x') {
                squares[winningCombos[a][0]].classList.add('winning-square');
                squares[winningCombos[a][1]].classList.add('winning-square');
                squares[winningCombos[a][2]].classList.add('winning-square');
                gameOver(player1.name);
                isGameOver = true;
            }
            else if (chosenSquares[winningCombos[a][0]] === 'o' && chosenSquares[winningCombos[a][1]] === 'o' && chosenSquares[winningCombos[a][2]] === 'o') {
                squares[winningCombos[a][0]].classList.add('winning-square');
                squares[winningCombos[a][1]].classList.add('winning-square');
                squares[winningCombos[a][2]].classList.add('winning-square');
                gameOver(player2.name);
                isGameOver = true;
               }
        };
    };

    function gameOver(winner) {
        playersTurnText.style.display = 'none';

        if (winner === 'Draw'){
            gameOverDraw.style.display = 'block';
        }

        else {
            const winnerName = document.getElementById('winner-name');
            const winnerIcon = document.getElementById('winner-icon');
            winnerName.textContent = winner;
            if(winner === 'Player 1') {
                winnerIcon.classList = 'fa-solid fa-x';
            }
            else {
                winnerIcon.classList = 'fa-solid fa-o';
            }
            gameOverWinner.style.display = 'block';
        }
        
        console.log(winner);
    }

    function resetBoard() {
        chosenSquares = ['','','','','','','','',''];
        for(let i = 0; i < squares.length; i++) {
            squares[i].firstChild.classList = 'fa-solid';
            squares[i].firstChild.setAttribute('title', 'Blank');
            squares[i].classList.remove('winning-square');
        };
        gameOverDraw.style.display = 'none';
        gameOverWinner.style.display = 'none';
        playersTurnText.style.display = 'block';
        playersTurnName.textContent = player1.name;
        playersTurnIcon.classList = 'fa-solid fa-x';
        turn = 1;
        isGameOver = false;        
    };
})();

