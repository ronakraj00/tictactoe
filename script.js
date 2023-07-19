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

function fillGameBoardArray(position,player){
    gameBoard.gameBoardArray[position-1]=currentPlayer(player);
}

function currentPlayer(player){
    if(player=="user"){
        return "cross";
    }
    if(player=="AI"){
        return "square";
    }
}

const gameBoard = (()=>{

    let gameBoardArray = [];

    let grids = document.querySelectorAll(".grid");
    grids=[...grids]
    console.log(grids);

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
        if(gameBoard.gameBoardArray[i]!="cross"&&gameBoard.gameBoardArray[i]!="square"){
            newArray.push(i);
        }
    }
    console.log(gameBoard.gameBoardArray);
    console.log(newArray);
    let randomPosition=Math.floor(Math.random()*newArray.length);
    console.log(randomPosition);
    if(newArray.length==0){
        return "over";
    }
    console.log("randomNO"+(newArray[randomPosition]+1));
    fillGameBoardArray(newArray[randomPosition]+1,"AI");

}

function game(clickedGrid){
    fillGameBoardArray(clickedGrid,"user");
    renderGameBoard();
    if(AIPlay()=="over"){
        endGame();
        console.log("it's over");
    };
    renderGameBoard();
}

function renderGameBoard(){
    for(let i=0;i<9;i++){
        if(gameBoard.gameBoardArray[i]=="square"){
            gameBoard.grids[i].classList.add("make-square");
        }
        else if(gameBoard.gameBoardArray[i]=="cross"){
            gameBoard.grids[i].classList.add("make-cross");
        }
        else{
            gameBoard.grids[i].classList.remove("make-square","make-cross");
        }
    }   
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
    renderGameBoard();
    
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