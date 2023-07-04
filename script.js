
function fillGrid(gridPositon,sign){
    gridPositon.classList.add(`make-${sign}`);
    const gridNo=gridPositon.getAttribute("data-gridNo")
    gameBoard.fillGameBoard(gridNo,sign);
}

const gameBoard = (()=>{
    const grids = document.querySelectorAll(".grid");
    let click=0;
    grids.forEach(grid=>{
        grid.addEventListener("click",(e)=>{
            game(grid,++click);
            e.stopPropagation();
    },{once:true});
    });

    let gameBoardArray = [null,null,null,null,null,null,null,null,null];

    const fillGameBoard = (grid,sign)=>{
        gameBoardArray[grid-1]=sign;
        whoWon();
    }
    return {gameBoardArray,fillGameBoard,grids};
})();

const Player = (name,sign)=>{
    let play = (grid)=>{
        fillGrid(grid,sign);
    }
    return {play}; 
}

const ronak = Player("ronak","cross");

function AIPlay(){
    
    let newArray=[];
    for(let i=0;i<9;i++){
        if(gameBoard.gameBoardArray[i]==null){
            newArray.push(i);
        }
    }
    let randomPosition=Math.floor(Math.random()*newArray.length);
    console.log("randomNO"+newArray[randomPosition]);
    
    fillGrid(gameBoard.grids[newArray[randomPosition]],"square")

}

function game(grid,click){
    checkDraw();
    ronak.play(grid);
    whoWon();
    checkDraw();
    if(click<5){
        AIPlay();
        whoWon();
        checkDraw();
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
    setTimeout(()=>{location.reload()},2000)

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