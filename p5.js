const s = (p) => {

    let isdrawing = false;
    let yoff = 0.0; // 2nd dimension of perlin noise
    let song;
    let amplitude;
    let waveform;
    let waveheight = 200;
    let wavecolor;
    let osc;
    let freq;
    let spand = 1;

    p.preload = function () {
        song = loadSound('source/The Christmas song.mp4');
    };


    p.setup = function () {
        p.createCanvas(500, 500); //window size

        p.background(49, 88, 141);
        amplitude = new p5.Amplitude();
        fft = new p5.FFT();
        waveform = fft.waveform();
        peakDetect = new p5.PeakDetect(2000, 4000); //2500-4000 frequency as peak
        //cnv.mousePressed(canvasPressed);
        time = millis();
        wavecolor = p.color(0, 37, 106);
        //cnv.mousePressed(playOscillator);
        osc = new p5.Oscillator('sine');
        let spand = 0.1;

        //pause text
        //textFont(font);
        p.textAlign(CENTER, CENTER);
        p.textSize(30);
    };

    p.draw = function () {
        if (!isdrawing) {
            // TODO change instructions style
            frameRate(10);
            background(6, 47, 103);
            if (spand > 50) {
                spand = 1;
            } else {
                spand += 3;
            }
            textNeon(
                'Play/Pause with Space key',
                width / 2,
                height / 2,
                color(255, 250, 157),
                spand
            );
            textNeon(
                '&',
                width / 2,
                height / 2 + 40,
                color(255, 250, 157),
                spand
            );
            textNeon(
                'Add sounds with clicking',
                width / 2,
                height / 2 + 70,
                color(255, 250, 157),
                spand
            );
        } else {
            frameRate(24);
            let xoff = 0;
            fill(wavecolor);
            //remove blur from waves
            drawingContext.shadowBlur = 0;
            //drawingContext.shadowColor = none;
            stroke(0, 0, 0);
            fft.analyze();
            peakDetect.update(fft);
            if (peakDetect.isDetected) {
                //console.log('peak');
                wavecolor = changeWaveColor();
                // TODO when it reaches the bottom change direction
                changeHeight();
            }
            // We are going to draw a polygon out of the wave points
            beginShape();
            let level = amplitude.getLevel() * 5;
            // Iterate over horizontal pixels
            for (let x = 0; x <= width; x += 10) {
                // Calculate a y value according to noise, map to

                let y = map(noise(xoff, level), 0, 1, waveheight, waveheight + 200); //let y = map(noise(xoff, yoff), 0, 1, 200, 300);

                // Set the vertex
                vertex(x, y);
                // Increment x dimension for noise
                xoff += 0.05;
            }

            // increment y dimension for noise
            //yoff += 0.01;
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);
            
            let diameter = map(level, 0, 1, 0, 40);
            //star1(mouseX, mouseY, diameter,"right");
        }
    };
};

let myp5 = new p5(s);