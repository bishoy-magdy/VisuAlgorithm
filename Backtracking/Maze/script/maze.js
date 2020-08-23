//////////////////////////////////////////////////////////////////
/*By : Bishoy Magdy Adeeb*/

/////////////////////////////////////////////////////////////////////
/* algorithm to generate maze using
                                                *** Recursive Backtracking ***
The depth-first search algorithm of maze generation is frequently implemented using backtracking. This can be described with a following recursive routine:

Given a current cell as a parameter,
Mark the current cell as visited
While the current cell has any unvisited neighbour cells
    Choose one of the unvisited neighbours
    Remove the wall between the current cell and the chosen cell
    Invoke the routine recursively for a chosen cell
which is invoked once for any initial cell in the area.

A disadvantage of this approach is a large depth of recursion – in the worst case, the routine may need to recur on every cell of the area being processed, which may exceed the maximum recursion stack depth in many environments. As a solution, the same backtracking method can be implemented with an explicit stack, which is usually allowed to grow much bigger with no harm.

Choose the initial cell, mark it as visited and push it to the stack
While the stack is not empty
    Pop a cell from the stack and make it a current cell
    If the current cell has any neighbours which have not been visited
        Push the current cell to the stack
        Choose one of the unvisited neighbours
        Remove the wall between the current cell and the chosen cell
        Mark the chosen cell as visited and push it to the stack

from Wiki: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
*/
/////////////////////////////////////////////////////////////////////////////////////////////
let grid=[];
let w=44;  //height and width of square
let colums;
let rows;
let current1,current2,current3,current4;  //four-point start for each aspect
let stack1=[],stack2=[],stack3=[],stack4=[]; //stack for each aspect
let slider;
function setup() {
    createCanvas(min(windowWidth,windowHeight),min(windowWidth,windowHeight));

    colums=floor(width/w)-1;
     rows= floor(height/w);
     for(let i=0;i<rows;i++){
        for(let j=0;j<colums;j++){
            grid.push(new cell(i,j));
        }

    }
     current1=grid[0];
     current2=grid[colums*(rows-1)];
     current3=grid[colums-1];
     current4=grid[(colums*rows-1)];
    let P=createP('Speed Frame Rate');
    let push_text=createP('[ Push ] : In The Stack  ---');
    let back_text=createP('--- [ Back ] : To The Previous Cell ');
    push_text.position(width/4,height-w);
    back_text.position(width/4+push_text.size().width,height-w);
    back_text.style('color','#FF0000');
    push_text.style('color','#00FF00');


    P.position(0,height-w);
    P.style('color','#f9c7db');

    slider=createSlider(1,60,3,1);
      slider.position(0,height-w);
     }


function draw() {

    frameRate(slider.value());
    background(0);

    for(let i=0;i<grid.length;i++){

        grid[i].show();
    }
//1th side

    current1.visited=true;
    let next=current1.my_neighbour(1);
    if(next){
        current1.removewall(next);
        stack1.push(next);
        current1.display(1);
        current1=next;

    }
    else if(stack1.length>0){
        current1=stack1.pop();
        current1.display(2);
    }
//////////////////////////////

    //2th side
    current2.visited=true;
    let next2=current2.my_neighbour(2);
    if(next2){
        current2.removewall(next2);
        stack2.push(next2);
        current2.display(1);
        current2=next2;

    }
    else if(stack2.length>0){
        current2=stack2.pop();
        current2.display(2);

    }
////////////////////////////

    //3th side

    current3.visited=true;
    let next3=current3.my_neighbour(3);
    if(next3){
        current3.removewall(next3);
        stack3.push(next3);
        current3.display(1);
        current3=next3;

    }
    else if(stack3.length>0){
        current3=stack3.pop();
        current3.display(2);

    }
////////////////////////////
    //4th side

    current4.visited=true;
    let next4=current4.my_neighbour(4);
    if(next4){
        current4.removewall(next4);
        stack4.push(next4);
        current4.display(1);
        current4=next4;

    }
    else if(stack4.length>0){
        current4=stack4.pop();
        current4.display(2);

    }

    ////////////////////////



}


class cell {

    constructor(i,j) {
        this.i=i;
        this.j=j;
        this.sides=[true,true,true,true];
        this.visited=false;
        this.RBG=[255,255,255];
    }
    show() {
        this.x = this.i * w;
        this.y = this.j * w;
        stroke(this.RBG[0],this.RBG[1],this.RBG[2]);
        strokeWeight(3);

        if (this.sides[0])
            line(this.x, this.y, this.x + w, this.y);
        if (this.sides[1])
            line(this.x + w, this.y, this.x + w, this.y + w);
        if (this.sides[2])
            line(this.x + w, this.y + w, this.x, this.y + w);
        if (this.sides[3])
            line(this.x, this.y + w, this.x, this.y);

    }
    index(i,j){
        if(i<0 || j<0 || i>=rows || j>=colums ){return -1;}
        else
            return (colums*i+j);

    }
    my_neighbour(side){


        if(side==1){this.RBG=[95,221,229];}
        else if(side==2){this.RBG=[243,113,33];}
        else if(side==3){this.RBG=[244,234,142];}
        else{this.RBG=[217,32,39];}
        this.neighbours=[];
        this.top=this.index(this.i-1,this.j);
        this.right=this.index(this.i,this.j+1);
        this.down=this.index(this.i+1,this.j);
        this.left=this.index(this.i,this.j-1);
        if(grid[this.top]&&!grid[this.top].visited){
            this.neighbours.push(grid[this.top]);
        }
        if(grid[this.right] && !grid[this.right].visited ){
            this.neighbours.push(grid[this.right]);
        }
        if(grid[this.down] && !grid[this.down].visited ){
            this.neighbours.push(grid[this.down]);
        }
        if(grid[this.left] && !grid[this.left].visited ){
            this.neighbours.push(grid[this.left]);
        }


        if(this.neighbours.length>0){   return this.neighbours[floor(random(0,this.neighbours.length))] ; }
        else
        {
            return undefined;
        }
         }

    removewall(next){

        if((this.i-next.i)==1){
            this.sides[3]=0;
            next.sides[1]=0;
        }

        else if((this.i-next.i)==-1){
            this.sides[1]=0;
            next.sides[3]=0;

        }

        if((this.j-next.j)==1){
            this.sides[0]=0;
            next.sides[2]=0;
        }


        if((this.j-next.j)==-1){
            this.sides[2]=0;
            next.sides[0]=0;
        }


    }

    display(n){

      if(n==1){
          fill(0,255,0);
          textAlign(CENTER);
          textSize(w/3);
          noStroke();
          text('Push',this.x+w/2,this.y+w/2)

      }
       else
      {
          fill(255,0,0);
          textAlign(CENTER);
          noStroke();
          textSize(w/3);
          text('Back',this.x+w/2,this.y+w/2)
      }


    }
}

