
function GameBoard(){
    let rows = 3;
    let cols = 3;
    let board = [];

    //let a period denote an empty space
    for(let i = 0; i < rows;i++){
        board[i] = [];
        for(let j = 0; j < cols;j++){
            //each coord on board is a cell object
            board[i][j] = Cell();
        }
    }

    const getBoard = () => board;

    const setCell = (row,col,player) => {
        board[row][col].setToken(player);
    };

    //we hard code win conditions here instead of using DFS because hard coding will be more performant in this case.
    //return the token type of the winner
    const checkWinCondition = (player) => {
        for(let row = 0; row < rows;row++){
            if(board[row][0].getToken() != "." &&
                board[row][0].getToken() == board[row][1].getToken() &&
                board[row][0].getToken() == board[row][2].getToken()){
                    return board[row][0].getToken();
            }
        }

        for(let col = 0; col < cols;col++){
            if(board[0][col].getToken() != "." &&
                board[0][col].getToken() == board[1][col].getToken() &&
                board[0][col].getToken() == board[2][col].getToken()){
                    return board[0][col].getToken();
            }
        }

        if(board[0][0].getToken() != "." &&
            board[0][0].getToken() == board[1][1].getToken() &&
            board[0][0].getToken() == board[2][2].getToken()){
                return board[0][0].getToken();
            }

        if(board[0][2].getToken() != "." &&
            board[0][2].getToken() == board[1][1].getToken() &&
            board[0][2].getToken() == board[2][0].getToken()){
                return board[0][2].getToken();
            }

        return ".";
    };

    const isDraw = () => {

        for(let i = 0; i < rows;i++){
            for(let j = 0; j < cols;j++){
                if(board[i][j].getToken() == ".")
                    return false;
            }
        }

        return true;
    }


    return {getBoard,setCell,checkWinCondition,isDraw}
}

//token is either "." for empty, or O/X depending on the player
function Cell(){
    let value = "."

    const setToken = (playerToken) => {
        value = playerToken;
    };

    const getToken = () => value;

    return {setToken, getToken};

}

function DOM(board){
    const boardContainer = document.querySelector(".board-container");
    const windowContainer = document.querySelector(".window-container");
    const grid = [];
    const currBoard = board.getBoard();
    

    let rows = currBoard.length;
    let cols = currBoard[0].length;

    function initBoard(){

        
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < cols; c++){
                const newCell = document.createElement("div");

                if(currBoard[r][c].getToken() != ".")
                    newCell.innerHTML = currBoard[r][c].getToken();

                newCell.classList.add("cell");
                newCell.dataset.row = r;
                newCell.dataset.col = c;

                newCell.addEventListener("click", () => {
                    updateBoard(r,c,newCell);

                });

                grid.push(newCell);

                boardContainer.appendChild(newCell);
            }
        }
    }

    function updateBoard(r,c,cell){

        //only update if empty cell
        if(currBoard[r][c].getToken() == "."){
            board.setCell(r,c,currPlayer);
            cell.innerHTML = currBoard[r][c].getToken();
            swapPlayer();
        }

        if(board.checkWinCondition() != "."){
            displayWinner(board.checkWinCondition());
        }
        
    }

    function displayWinner(winner){
        const winnerText = document.createElement("p");
        winnerText.innerHTML = winner + " won the game!";
        winnerText.classList.add("winner-text")
        windowContainer.appendChild(winnerText);
    }

    function swapPlayer(){
        console.log("Swapping Player to " + currPlayer);
        if(currPlayer == "X"){
            currPlayer = "O"
        } else{
            currPlayer = "X";
        }
    }

    function clearBoard(){
        boardContainer.innerHTML = "";
        grid.length = 0;
    }

    return {initBoard,clearBoard,updateBoard}
}


let newBoard = GameBoard();
let newDOM = DOM(newBoard);
let currPlayer = "X";
newDOM.initBoard();



//console.log(newBoard.checkWinCondition());