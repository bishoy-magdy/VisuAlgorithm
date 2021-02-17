
//the aim of the generator to build  sudoku has a "unique solution" and "valid"
var nsolution = 0,noway = 0,difficultyratio = 0;

//unique solution
function check(zero) {


    if (zero == 0) {
        nsolution++;
        return 1;
    }
    for (let i = 0; i < 9; i++) {

        for (let j = 0; j < 9; j++) {

            if (grid[i][j].value == 0) {

                for (let k = 1; k <= 9 && nsolution <= 1; k++) {

                    if (valid(i, j, k)) {

                        grid[i][j].value = k;
                        let F = check(zero - 1);

                        if (F == 1 && nsolution == 2) {

                            grid[i][j].value = 0;
                            noway = 1;
                            return F+1;
                        }

                        grid[i][j].value = 0;

                        if (noway)
                            return F+0;

                    }

                    if (noway)
                        return 0;


                }
                return 0;

            }

        }



    }



}





//to fill the remainder
function remainder(zero) {


    if (zero == 0) 
        return 1;
    
    for (let i = 0; i < 9; i++) {

        for (let j = 0; j < 9; j++) {

            if (grid[i][j].value == 0) {

                for (let k = 1; k <= 9; k++) {

                    if (valid(i, j, k)) {

                        grid[i][j].value = k;
                        let F = remainder(zero - 1);
                        if (F)
                            return 1;
                        grid[i][j].value = 0;

                    }

                }
                return 0;

            }

        }

    }


}

//number of zeros in grid
function nZero() {

    let numberzeros = 0;
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (grid[i][j].value == 0)
                numberzeros++;

    return numberzeros;

}



/*
this function fill the grid like that
   a b c 0 0 0 0 0 0
   d e f 0 0 0 0 0 0
   g h i 0 0 0 0 0 0
   0 0 0 j k l 0 0 0
   0 0 0 m n o 0 0 0
   0 0 0 z y S 0 0 0
   0 0 0 0 0 0 p q r
   0 0 0 0 0 0 s t u
   0 0 0 0 0 0 v w x
   We can observe that all 3 x 3 matrices
  which are diagonally present are independent of other 3 x 3 adjacent matrices initially, as others are empty
  then fill the remainder
 */
function sudokuGenerating(x, y) {
    //base case and fill the remainder in grid
    if (x == 9) {
        remainder(54);
        return;
    }

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            let val = floor(random(1, 10));
            //check valid in rect
            while (!valid(x + i, y + j, val)) {
                val = floor(random(1, 10));
            }
            grid[i + x][y + j].value = val;
        }
    sudokuGenerating(x + 3, y + 3);

}


function RemoveDigit() {


    nsolution = 0, noway = 0;
    let ii = floor(random(0, 9));
    let jj = floor(random(0, 9));

    while (grid[ii][jj].value == 0)
        ii = floor(random(0, 9)), jj = floor(random(0, 9));

    let val = grid[ii][jj].value;
    grid[ii][jj].value = 0;

    check(nZero());

    if (noway == 1 && difficultyratio > slider.value()) {
        grid[ii][jj].value = val;
        difficultyratio=0;

    } else if (noway == 0)
        difficultyratio++, RemoveDigit();
    else if (noway == 1)
        grid[ii][jj].value = val, difficultyratio++, RemoveDigit();


}

//////////////////////////////
