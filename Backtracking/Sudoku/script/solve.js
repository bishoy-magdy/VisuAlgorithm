//pair of the index in the grid i j
var index = [];
//list of list carry each possible in cell
var state = [];
//shift back
var undo_stack = [];

//solve with backtrack technique
function solve() {


    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

           
            if (grid[i][j].value == 0) {
                let flag = 0;
                let now = [];
                for (let k = 1; k <= 9; k++) {

                    if (valid(i, j, k)) {
                        now.push(k);
                        flag = 1;
                    }

                }
                if (now.length)
                    index.push({
                        first: i,
                        second: j
                    }), state.push(now);

                if (flag)
                    return 1;

                return 0;
            }

        }
    }




}
//check all 9 sub matrices 3×3 the elements should be 1-9, without repetition
// & all rows there should be elements between 1-9 , without repetition
// & all columns there should be elements between 1-9 , without repetition
function valid(i, j, k) {

    for (let t = 0; t < 9; t++)
        if (grid[i][t].value == k || grid[t][j].value == k)
            return 0;

    for (let I = 0; I < 3; I++) {

        for (let J = 0; J < 3; J++) {
            let nowr = i - i % 3,
                nowc = j - j % 3;
            if (grid[nowr + I][nowc + J].value == k)
                return 0;

        }

    }

    return 1;

}

function solvewithAnimation() {


    //the remainder of undo state
    if (undo_stack.length >= 1) {

        let i = undo_stack[0].first,
            j = undo_stack[0].second;
        undo_stack.shift();
        if (grid[i][j].state > 0) {
            grid[i][j].state = 2;
            grid[i][j].value = 0;

        } else {

            grid[i][j].value = grid[i][j].state * -1;
            grid[i][j].state = 1;


        }
        return;
    }
    //next zero state
    let s = solve();
    //do
    if (s == 1) {

        let temp = state[state.length - 1];
        let I = index[index.length - 1].first,
            J = index[index.length - 1].second;
        grid[I][J].value = temp[temp.length - 1];
        grid[I][J].state = 1;
    }
    //undo
    else if (s == 0) {

        let temp = state[state.length - 1];
        let I = index[index.length - 1].first,
            J = index[index.length - 1].second;

        if (temp.length > 1) {
            //undo
            state[state.length - 1].pop();
            temp = state[state.length - 1];
            grid[I][J].value = temp[temp.length - 1];
            grid[I][J].state = 1;

        } else if (temp.length == 1) {

            // shift back Rem
            while (temp.length == 1) {

                let II = index[index.length - 1].first,
                    JJ = index[index.length - 1].second;
                //undo push state in the stack to animate it
                undo_stack.push({
                    first: II,
                    second: JJ
                });
                grid[II][JJ].state = 2;
                state.pop();
                index.pop();
                temp = state[state.length - 1];

                //invalid sudoku
                if (temp == undefined)
                {
                    invalid=1;
                    return;}

            }
            I = index[index.length - 1].first, J = index[index.length - 1].second;
            state[state.length - 1].pop();
            x = state[state.length - 1];

            grid[I][J].state = temp[temp.length - 1] * -1;
            undo_stack.push({
                first: I,
                second: J
            });
        }


    }
    //finish
    else
    autoSolve=0;


}

function valid2(i, j, k) {

    for (let t = 0; t < 9; t++)
        if ( (grid[i][t].value == k && grid[i][t].state==0) || (grid[t][j].value == k && grid[t][j].state==0) )
            return 0;

    for (let I = 0; I < 3; I++) {

        for (let J = 0; J < 3; J++) {
            let nowr = i - i % 3,
                nowc = j - j % 3;
            if (grid[nowr + I][nowc + J].value == k && grid[nowr + I][nowc + J].state==0)
                return 0;

        }

    }

    return 1;

}