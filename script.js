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
    const playersTurnText = document.getElementById('players-turn-name');
    const playersTurnIcon = document.getElementById('player-turn-icon');
    const restartButton = document.getElementById('restart-button');
    const squares = document.querySelectorAll('.square');
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
        if (chosenSquares[index] === '') {
            if (turn %2 === 0) {
                squares[index].firstChild.classList.add('fa-o');
                chosenSquares[index] = 'o'; 
            }
            else {
                squares[index].firstChild.classList.add('fa-x');
                chosenSquares[index] = 'x';          
            }
            checkWinner();
            updateTurn();
        };
    };

    function updateTurn() {
        if (turn <= 8 && checkWinner !== true) {
            turn++;
            if (turn %2 === 0) {
                playersTurnText.textContent = player2.name;
                playersTurnIcon.classList = 'fa-solid fa-o'; 
            }
            else {
                playersTurnText.textContent = player1.name;
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
                gameOver(player1.name);
            }
            else if (chosenSquares[winningCombos[a][0]] === 'o' && chosenSquares[winningCombos[a][1]] === 'o' && chosenSquares[winningCombos[a][2]] === 'o') {
                gameOver(player1.name);
               }
        };
    };

    function gameOver(winner) {
        console.log(winner);
        return true;
        // resetBoard();
    }

    function resetBoard() {
        chosenSquares = ['','','','','','','','',''];
        for(let i = 0; i < squares.length; i++) {
            squares[i].firstChild.classList = 'fa-solid';
        };
        playersTurnText.textContent = player1.name;
        playersTurnIcon.classList = 'fa-solid fa-x';
        turn = 1;        
    };
})();

