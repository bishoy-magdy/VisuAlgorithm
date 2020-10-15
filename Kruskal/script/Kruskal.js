
//by Bisho_O 15/oct/2020
/*
                                         Pseudocode
algorithm Kruskal(G) is
    F:= ∅
    for each v ∈ G.V do
        MAKE-SET(v)
    for each (u, v) in G.E ordered by weight(u, v), increasing do
        if FIND-SET(u) ≠ FIND-SET(v) then
           F:= F ∪ {(u, v)}
           UNION(FIND-SET(u), FIND-SET(v))
    return F

*/

var nodes=[], AdjList=[];
//map draw each node
var NODE=new Map();
//number of Vertex
var n=70;
var star=0,solved=0,test=0;
var slider;


function setup() {

    createCanvas(windowWidth*(90/100),900);
    background(121, 122, 126);
    //initialization  
    INIT(n);

   var P= createP ('Frame Rate');
   P.position(0,height);
   slider=createSlider(5,60,2,1);

}
function draw() {


    frameRate(int(slider.value()));

    if(star<AdjList.length && !solved){
        
        var NOW=AdjList[star++];
         
        if(link(NODE[JSON.stringify(NOW.x)],NODE[JSON.stringify(NOW.y)])){
            test++;
            strokeWeight(5); 
            stroke(20, 83, 116);
            line (NOW.x.x,NOW.x.y,NOW.y.x,NOW.y.y);

            noStroke();
            fill (191, 220, 174);
            textSize(15);
            textAlign(CENTER);
            text(NOW.d,(NOW.x.x+NOW.y.x)/2,(NOW.x.y+NOW.y.y)/2);
           
            NOW.x.Display(145, 209, 139);
            NOW.y.Display(145, 209, 139);
        
           

        }
    
  
    }
    
    if(solved){
        alert("MST Done :)");
        noLoop();
      }
    
    if(test==(n-1))
            solved=1;           
        


}

    class node{


        constructor(x,y,r){

                var x,y,r,root;
                this.x=x,this.y=y,this.r=r,root=this;

        }
        Display(r,g,b){
            
            fill (r,g,b);
            circle (this.x,this.y,this.r);

        }

     

    }


    ///Disjoint-set data structure

    var parent=[],rank=[];

    function set_parent(n){

        if(parent[n]==n){
            return n;
        
        }
        else{
        
            return parent[n]=set_parent(parent[n]);
        }
    }
    
    function check_parent(x,y){

        return set_parent(x)==set_parent(y);
    }

    function link(x,y){

            if(!check_parent(x,y)){


                var X=set_parent(x),Y=set_parent(y);

                if(rank[X]<rank[Y])
                    parent[X]=Y;
                else
                parent[Y]=X;
                
                if(rank[X]==rank[Y])rank[X]++;

                return 1;
            }
            else
            return 0;



    }

    //////////////////////////////////////////////

//initialization
  function INIT(N){
    star=0;
    parent=[];
    nodes=[];
    rank=[];
    NODE.clear();
    AdjList=[];
    for(let i=0;i<N;i++){
        //init parent
        parent[i]=i;
        //init Rank
        rank[i]=0;
        //////
        nodes.push(new node(random(width),random(height),20));
        //map node->n
        NODE[JSON.stringify(nodes[i])]=i;
    }
     
       
       for(let j=0;j<N;j++){
    
        for(let k=j+1;k<N;k++){
    
                  
             let d = int(dist(nodes[j].x, nodes[j].y, nodes[k].x, nodes[k].y));
             
             AdjList.push({x:nodes[j],y:nodes[k],d:d});
            
    
        }
    
    
    
    }
        //show
    
    
        for(let i=0;i<AdjList.length;i++){
    
            strokeWeight(0.2);
            line (AdjList[i].x.x,AdjList[i].x.y,AdjList[i].y.x,AdjList[i].y.y);
    
            AdjList[i].x.Display(225, 29, 116);
            AdjList[i].y.Display(225, 29, 116);
           
            //text(dis[i].d,(dis[i].x.x+dis[i].y.x)/2,(dis[i].x.y+dis[i].y.y)/2);
    
        }
    
    //sort by weight
    AdjList.sort((a,b)=>a.d-b.d);
    

  }

  
