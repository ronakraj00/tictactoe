function tapgrid(){
    let click=0;
   const grids = document.querySelectorAll(".grid");

   grids.forEach(grid=>{
    grid.addEventListener("click",(e)=>{
        click++;
        (click%2==0)?grid.classList.add("make-circle"):
                     grid.classList.add("make-square");
        
        e.stopPropagation();

   })});
}

tapgrid();