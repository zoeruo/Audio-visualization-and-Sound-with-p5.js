let isdrawing = false;
let yoff = 0.0; // 2nd dimension of perlin noise
let song;
let amplitude;
let waveform;
let waveheight = 200;
let wavecolor;
let osc;
let freq;

function preload() {
  song = loadSound('source/The Christmas song.mp4');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); //window size
  background(0, 37, 106);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  waveform = fft.waveform();
  peakDetect = new p5.PeakDetect(2000, 4000); //2500-4000 frequency as peak
  //cnv.mousePressed(canvasPressed);
  time = millis();
  wavecolor = color(0, 37, 106);
  //cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

  //pause text
  //textFont(font);
  textAlign(CENTER, CENTER);
  textSize(30);
}

function draw() {
  if (!isdrawing) {
    // frameRate(24);
    textNeon(
      'Press the Space key and Play with clicking',
      width / 2,
      height / 2,
      color(253, 221, 42)
    );
  } else {
    //background(0,37,106);
    let xoff = 0;
    fill(wavecolor);
    //remove blur from waves
    drawingContext.shadowBlur = 0;
    //drawingContext.shadowColor = none;
    stroke(0, 0, 0);
    fft.analyze();
    peakDetect.update(fft);
    if (peakDetect.isDetected) {
      console.log('peak');
      wavecolor = changeWaveColor();
      changeHeight();
    }
    // We are going to draw a polygon out of the wave points
    beginShape();

    let level = amplitude.getLevel() * 5;
    // Iterate over horizontal pixels
    for (let x = 0; x <= width; x += 10) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let y = map(noise(xoff, level), 0, 1, waveheight, waveheight + 200); //let y = map(noise(xoff, yoff), 0, 1, 200, 300);

      // Set the vertex
      vertex(x, y);
      // Increment x dimension for noise
      xoff += 0.05;
    }

    // increment y dimension for noise
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    // 1024
    // let spectrum = fft.analyze();
    // noStroke();
    // fill(255, 225, 140);
    // for (let i = 0; i< spectrum.length; i++){
    // let x = map(i, 0, spectrum.length, 0, width);
    // let h = -height + map(spectrum[i], 0, 255, height, 0);
    // rect(x, height, width / spectrum.length, h )
    // }

    let diameter = map(level, 0, 1, 0, 40);
  }
}
// wave as circle 1017
// for (var i = 0; i < wave.length; i++) {
//   //for each element of the waveform map it to screen
//   //coordinates and make a new vertex at the point.
//   var x = map(i, 0, wave.length, 0, width) * cos(i);
//   var y = map(wave[i], -1, 1, 0, height) * sin(i);

//   vertex(x, y);
// }
// wave as circle 1017

//Start & Pause
function keyPressed() {
  if (keyCode === 32) {
    if (song.isPlaying()) {
      background(0, 37, 106);
      song.pause();
      isdrawing = false;
    } else {
      background(0, 37, 106);
      isdrawing = true;
      song.play();
      //amplitude = new p5.Amplitude();
      amplitude.setInput(song);
      //fft = new p5.FFT();
      //peakDetect = new p5.PeakDetect(2500,4000);
    }
  }
}

function mousePressed() {
  star2(mouseX, mouseY);
  playOscillator();
}

// function keyPressed() {
//   if (keyCode === 90) {
//     star1(diameter);
//   } else if (keyCode === 88) {

//   }
// }

//change mapping height of waves
function changeHeight() {
  waveheight += 20;
}

//change filled color of waves
function changeWaveColor() {
  h = 240;
  s = Math.floor(Math.random() * 100);
  l = Math.floor(Math.random() * 100);
  let color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  return color;
}

//startpoint change into where mouse press
function star1(x1, y1, diameter) {
  //x1 = windowWidth * 0.1;
  //y1 = windowHeight * 0.1;
  x2 = windowWidth * 0.12;
  y2 = windowHeight * 0.12;
  x3 = windowWidth * 0.15;
  y3 = windowHeight * 0.07;
  stroke(251, 255, 138);
  //stroke(255, 255, 142, 1);
  line(x1, y1, x2, y2);
  line(x2, y2, x3, y3);
  circle(x1, y1, diameter * 0.5);
  circle(x2, y2, diameter);
  //line(x1,y1,x2,y2)
  //stroke(stroke-color)
  //circle(x,y,diameter)
}


function star2(x, y) {
  let positionx = [];
  let positiony = [];
  positionx[0] = x;
  positiony[0] = y;
  stroke(251, 255, 138);
  //set positions
  for (i = 1; i < 8; i++) {
    positionx[i] = x * Math.random();
    positiony[i] = x * Math.random();
  }
  //draw line and circle
  for (i = 0; i < 7; i++) {
    diameter = Math.random() * 4;
    //line(positionx[i], positiony[i], positionx[i+1], positiony[i+1]);
    circle(positionx[i], positiony[i], diameter);
  }
}


function shiningstar(x, y, diameter) {
  stroke(253, 221, 42);
  circle(x, y, diameter);

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  osc.freq(freq);
  osc.amp(amp, 0.1);
  osc.start();
  osc.amp(0, 0.5);
  osc.stop(1);
}


function textNeon(glowText, x, y, glowColor) {
  glow(glowColor, 10);
  text(glowText, x, y);

  glow(glowColor, 5);
  text(glowText, x, y);
  text(glowText, x, y);
  text(glowText, x, y);
}


function glow(glowColor, blurriness) {
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}



