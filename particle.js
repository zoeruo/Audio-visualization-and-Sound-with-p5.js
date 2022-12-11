//TODO 限制高度（依照波浪高度變化）
class Constellation {
    // setting the co-ordinates, radius and the
    // speed of a Constellation in both the co-ordinates axes.
    constructor(maxheight) {
        this.x = random(0, width);
        this.y = random(maxheight, height);
        this.r = random(1, 6);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
    }

    // creation of a Constellation.
    createConstellation() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        circle(this.x, this.y, this.r);
    }

    // setting the Constellation in motion.
    moveConstellation(mxh) {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < mxh || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // this function creates the connections(lines)
    // between Constellations which are less than a certain distance apart
    joinConstellations(Constellations) {
        Constellations.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 85) {
                stroke('rgba(255,255,255,0.02)');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }
}