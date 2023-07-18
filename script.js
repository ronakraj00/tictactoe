class Player{
    constructor(name,sign){
        this.name=name;
        this.sign=sign;
    }
}

function createPlayer(name,sign){
    const newPlayer=new Player(name,sign);
    return newPlayer;
}

function fillGameBoardArray(position){
    gameBoard.gameBoardArray[position-1]=currentPlayer();
}

function currentPlayer(){
    return "square";
}

const gameBoard = (()=>{

    let gameBoardArray = [];

    const grids = document.querySelectorAll(".grid");

    grids.forEach(grid=>{

        grid.addEventListener("click",(e)=>{
            
            const clickedGrid=e.target.getAttribute("data-gridNo");
            game(clickedGrid);
            // fillGameBoardArray(clickedGrid);
            e.stopPropagation();

    },{once:true});

    });

    return {gameBoardArray,grids};
})();



function AIPlay(){
    
    let newArray=[];

    for(let i=0;i<9;i++){
        if(gameBoard.gameBoardArray[i]==undefined){
            newArray.push(i);
        }
    }

    let randomPosition=Math.floor(Math.random()*newArray.length);
    console.log("randomNO"+newArray[randomPosition]);
    
    fillGrid(gameBoard.grids[newArray[randomPosition]],"square")

}

function game(clickedGrid){
    fillGameBoardArray(clickedGrid);
    renderGameBoard();
}

function renderGameBoard(){

    gameBoard.gameBoardArray.forEach(grid=>{
        if(grid==="square"){
            //working on this
        }
    })
}

function whoWon(){
    const winning_Array = [
        [4,3,5],
        [4,1,7],
        [4,0,8],
        [4,6,2],
        [3,0,6],
        [1,0,2],
        [5,2,8],
        [7,6,8]
    ]

    winning_Array.forEach(array=>{
        if((gameBoard.gameBoardArray[array[0]]==gameBoard.gameBoardArray[array[1]])&&
        (gameBoard.gameBoardArray[array[1]]==gameBoard.gameBoardArray[array[2]])&&
        (gameBoard.gameBoardArray[array[0]]!==null)){
            winnerMessage(gameBoard.gameBoardArray[array[0]])
            
        }
    })
}

function endGame(){
    gameBoard.gameBoardArray=[];
}

function winnerMessage(name){
    const winnerMessageText=document.querySelector(".winnerMessage");
    winnerMessageText.classList.add("show");
    winnerMessageText.textContent=`${name} has won`;
    endGame();
}

function checkDraw(){
    for(let i=0;i<9;i++){
        if(gameBoard.gameBoardArray[i]==null){
            return
        }
    }
    whoWon();
    winnerMessage("noOne");
}