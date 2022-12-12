//TODO 限制高度（依照波浪高度變化）
class Constellation {
    // setting the co-ordinates, radius and the
    // speed of a Constellation in both the co-ordinates axes.
    constructor(maxheight) {
        this.x = random(0, width);
        this.y = random(maxheight, height);
        this.r = random(1, 4);
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-0.5, 1);
        this.color_r = 160;
        this.color_g = 103;
        this.color_b = 103;
        this.coloradd = 1;

    }

    // creation of a Constellation.
    createConstellation() {
        noStroke();
        fill('rgba(' + this.color_r + ',' + this.color_g + ',' + this.color_b + ',0.7)');
        //fill('rgba(200,169,169,0.5)');
        circle(this.x, this.y, this.r);
    }

    // setting the Constellation in motion and change color.
    moveConstellation(mxh, trigger) {
        if (trigger == 1) {
            this.xSpeed += 10;
            this.ySpeed += 10;
        }
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < mxh || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.color_r < 160 || this.color_r > 250) {
            this.coloradd *= -1;
        }
        this.color_r += this.coloradd;
        this.color_g += this.coloradd;
        this.color_b += this.coloradd;


        //console.log(this.color_r);
    }

    // this function creates the connections(lines)
    // between Constellations which are less than a certain distance apart
    joinConstellations(Constellations) {
        Constellations.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 40) {
                stroke('rgba(255,255,255,0.03)');
                line(this.x, this.y, element.x, element.y);
            }
        });
    }


}

class Meteor {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = this.x + (8);
        this.y = this.y + (-4);

        let v = createVector(this.x, this.y);

        this.history.push(v);
        //console.log(this.history.length);

        if (this.history.length > 20) {
            this.history.splice(0, 1);
        }
    }

    show() {
        stroke(161,245,254);
        //stroke(148, 255, 253, 240);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            noFill();
            vertex(pos.x, pos.y);
            endShape();
        }

        noStroke();
        fill(161,245,254);
        //fill(148, 255, 253, 240);
        ellipse(this.x, this.y, 1, 1);
    }
}

class Ripple {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.outerDiam = 0
    }

    show() {
        for (var i = 0; i < 10; i++) {
            var diam = this.outerDiam - 30 * i;
            if (diam > 0) {
                var fade = map(diam, 0, width, 0.2, 0);
                //console.log(fade);
                stroke("rgba(225,225,225," + fade + ")");
                noFill();
                ellipse(this.x, this.y, diam);
            }
        }
        this.outerDiam = this.outerDiam + 2;
    }


}