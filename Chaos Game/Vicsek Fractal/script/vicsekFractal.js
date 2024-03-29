// when the jump is 2/3 and the point can also jump towards the center of the square,

let ax, ay, bx, by, cx, cy, dx, dy, ex, ey, rx, ry, slider;
let div = (2 / 3);

function setup() {
    createCanvas(750, 750);
    background(56, 62, 86);
    
    ax = width / 2;
    ay = 0;

    bx = width;
    by = height / 2;

    cx = 0;
    cy = height / 2;

    dx = width / 2;
    dy = height;

    ex = width / 2;
    ey = height / 2;

    stroke(255, 255, 50);
    strokeWeight(20);
  
    rx = random(width);
    ry = random(height);

    slider = createSlider(1, 250, 0.5, 0.5);
    let frameRateP = createP('Frame Rate');
    frameRateP.position(width / 2, height);
    frameRateP.style('font-size', '19px');
    slider.position(width / 2, height);
}

function draw() {
    stroke(255, 255, 50);
    strokeWeight(5);

    for (let i = 0; i <= slider.value(); i++) {
        let r = floor(random(5));

        if (r == 0) {
            stroke(95, 221, 229);
            rx = lerp(rx, ax, div);
            ry = lerp(ry, ay, div);
            point(rx, ry);
        } else if (r == 1) {
            stroke(243, 113, 33);
            rx = lerp(rx, bx, div);
            ry = lerp(ry, by, div);
            point(rx, ry);

        } else if (r == 2) {
            stroke(244, 234, 142);
            rx = lerp(rx, cx, div);
            ry = lerp(ry, cy, div);
            point(rx, ry);

        } else if (r == 3) {
            stroke(217, 32, 39);
            rx = lerp(rx, dx, div);
            ry = lerp(ry, dy, div);
            point(rx, ry);

        } else {
            stroke(0, 0, 255);
            rx = lerp(rx, ex, div);
            ry = lerp(ry, ey, div);
            point(rx, ry);
        }
    }
}