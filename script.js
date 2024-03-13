document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const playAgainButton = document.getElementById('playAgainButton');
    const privacyPolicyButton = document.getElementById('privacyPolicyButton');
    const privacyPolicyContent = document.getElementById('privacyPolicyContent');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                resultMessage.innerText = `${currentPlayer} wins!`;
                resultScreen.style.display = 'flex';
                break;
            }
        }

        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            resultMessage.innerText = `It's a draw!`;
            resultScreen.style.display = 'flex';
        }
    };

    const handleCellClick = (e) => {
        const cellIndex = e.target.getAttribute('data-cell-index');

        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        e.target.innerText = currentPlayer;

        checkWin();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const handleRestart = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        resultScreen.style.display = 'none';
        resultMessage.innerText = '';
        cells.forEach(cell => cell.innerText = '');
    };

    const handlePlayAgain = () => {
        handleRestart();
    };

    const togglePrivacyPolicy = () => {
        privacyPolicyContent.classList.toggle('show');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestart);
    playAgainButton.addEventListener('click', handlePlayAgain);
    privacyPolicyButton.addEventListener('click', togglePrivacyPolicy);
});
