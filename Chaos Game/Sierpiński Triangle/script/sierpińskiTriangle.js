let ax, ay, bx, by, cx, cy, rx, ry, slider;

function setup() {
    createCanvas(750, 750);
    background(0);

    ax = width / 2;
    ay = 0;

    bx = 0;
    by = height;

    cx = height;
    cy = height;

    stroke(255, 255, 50);
    strokeWeight(20);

    point(ax, ay);
    point(bx, by);
    point(cx, cy);

    rx = random(width);
    ry = random(height);

    slider = createSlider(1, 500, 0.5, 0.5);
    let frameRateP = createP('Frame Rate');
    frameRateP.position(width / 2, height);
    frameRateP.style('font-size', '19px');
    slider.position(width / 2, height);
}

function draw() {
    stroke(255, 255, 50);
    strokeWeight(1);

    for (let i = 0; i < slider.value(); i++) {
        point(rx, ry);
        let r = floor(random(3));

        if (r == 0) {
            stroke(255, 0, 0);
            rx = (ax + rx) / 2;
            ry = (ay + ry) / 2;
        } else if (r == 1) {
            stroke(0, 255, 0);
            rx = (bx + rx) / 2;
            ry = (by + ry) / 2;
        } else {
            stroke(0, 0, 255);
            rx = (cx + rx) / 2;
            ry = (cy + ry) / 2;

        }
    }
}
