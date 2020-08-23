class node {

    constructor(i, j) {

        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.visited = false;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;
        this.color_node = [239, 255, 251];



    }
    show(R, G, B) {


        fill(R, G, B);
        strokeWeight(0.5);
        rect(this.j * rectvalue, this.i * rectvalue, rectvalue, rectvalue);


    }
    my_neighbors() {

        for (let k = 0; k < 4; k++) {

            let new_i = dx[k] + this.i;
            let new_j = dy[k] + this.j;

            if (this.valid(new_i, new_j)) {
                this.neighbors.push(grid[new_i][new_j]);
            }

        }

    }

    valid(x, y) {

        return x >= 0 && y >= 0 && x < h && y < w;
    }


}