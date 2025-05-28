function GameBoard(){
    let rows = 3;
    let cols = 3;
    let board = [];

    const winningLines = [

    ];

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
            if(board[row][0] != "." &&
                board[row][0] == board[row][1] &&
                board[row][0] == board[row][2]){
                    return board[row][0].getToken();
            }
        }

        for(let col = 0; col < cols;col++){
            if(board[0][col] != "." &&
                board[0][col] == board[1][col] &&
                board[0][col] == board[2][col]){
                    return board[0][col].getToken();
            }
        }

        if(board[0][0] != "." &&
            board[0][0] == board[1][1] &&
            board[0][0] == board[2][2]){
                return board[0][0].getToken();
            }

        if(board[0][2] != "." &&
            board[0][2] == board[1][1] &&
            board[0][2] == board[2][0]){
                return board[0][2].getToken();
            }
    };

    const isDraw = () => {

        for(let i = 0; i < rows;i++){
            for(let j = 0; j < cols;j++){
                if(board[i][j] == ".")
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

