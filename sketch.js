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
let button;

//TODO nicer UI

function preload() {
  song = loadSound('source/The Christmas song.mp4');
}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); //window size

  // button = createButton("play");
  // button.style('font-size', '20px');
  // button.style('background-color', "white");
  // button.style('padding', "6px 10px");
  // button.position(10,10);
  // button.mousePressed(togglePlaying);

  background(49, 88, 141);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  waveform = fft.waveform();
  peakDetect = new p5.PeakDetect(2000, 4000); //2500-4000 frequency as peak
  //cnv.mousePressed(canvasPressed);
  time = millis();
  wavecolor = color(0, 37, 106);
  //cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  let spand = 0.1;

  //pause text
  //textFont(font);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
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
    textNeon(
      'And see what happens with key "Z" and "X"',
      width / 2,
      height / 2 + 100,
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
    for (let x = 0; x <= width + 20; x += 10) {
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
    starcolor = color(253, 255, 170);
    starcolor.setAlpha(128 + 128 * sin(millis() / 1000));
    shiningsign(diameter, starcolor);

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

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
      amplitude.setInput(song);
    }
  } else if (keyCode === 90) {
    // keyboard Z
    let stardiameter = amplitude.getLevel() * 100;
    star1(mouseX, mouseY, stardiameter, "left");

  } else if (keyCode === 88) {
    // keyboard X
    let stardiameter = amplitude.getLevel() * 100;
    // setTimeout(star1(mouseX, mouseY, stardiameter, "right"),1000);
    star1(mouseX, mouseY, stardiameter, "right");
  }
}

//play/pause song
function togglePlaying() {
  if (song.isPlaying()) {
    background(0, 37, 106);
    song.pause();
    isdrawing = false;
  } else {
    background(0, 37, 106);
    isdrawing = true;
    song.play();
    amplitude.setInput(song);
  }
}

function mousePressed() {
  randomstars(mouseX, mouseY);
  //star1(mouseX, mouseY, 2); 
  playOscillator();
}

// function keyPressed() {
//   if (keyCode === 90) {
//     star1(diameter);
//   } else if (keyCode === 88) {

//   }
// }

//TODO comes back up when it reaches the bottom
//change mapping height of waves
function changeHeight() {
  if (waveheight > windowHeight) {
    waveheight = 200;
  }
  waveheight += 20;
}

//change filled color of waves
function changeWaveColor() {
  h = 215;
  //s = Math.floor(Math.random() * 100);
  l = random(20, 60);
  let color = 'hsl(' + h + ', 80%, ' + l + '%)';
  return color;
}

// TODO decide how to present the stars with line
//stars with line connected expand from mouse
function star1(x, y, diameter, direction) {
  locationx = [x];
  locationy = [y];
  if (direction == "right") {
    for (i = 0; i < 5; i++) {
      let valuex = random(5, 20);
      locationx.push(locationx[i] + valuex);
    }
  } else {
    for (i = 0; i < 5; i++) {
      let valuex = random(-5, -20);
      locationx.push(locationx[i] + valuex);
    }
  }
  for (i = 0; i < 5; i++) {
    let valuey = random(-30, 30);
    locationy.push(y + valuey)
  }
  stroke(251, 255, 138);
  for (i = 0; i < 6; i++) {
    starcolor = color(246, 231, 47);
    //starcolor.setAlpha(128 + 128 * sin(millis() / 1000));
    stroke(starcolor);
    line(locationx[i], locationy[i], locationx[i + 1], locationy[i + 1]);
    fill(starcolor);
    noStroke();
    circle(locationx[i], locationy[i], diameter);
  }
}

function shiningsign(diameter, c) {
  x = random(-50, width);
  y = random(0, 300);
  locationx = [x];
  locationy = [y];
  for (i = 0; i < 5; i++) {
    let valuex = random(5, 20);
    locationx.push(locationx[i] + valuex);
  }
  for (i = 0; i < 5; i++) {
    let valuey = random(-30, 30);
    locationy.push(y + valuey)
  }
  fill(c);
  noStroke();
  circle(locationx[i], locationy[i], diameter);
}

//random stars with spreading from mouse
function randomstars(x, y) {
  let positionx = [];
  let positiony = [];
  positionx[0] = x;
  positiony[0] = y;
  stroke(251, 255, 138);
  //set stars positions
  for (i = 1; i < 3; i++) {
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

// TODO find out how to make a burning star moving with mouse
function shiningstar(x, y, diameter) {
  stroke(253, 221, 42);
  circle(x, y, diameter);
}


// TODO vary the sound(cello sound maybe)
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

// instructions text
function textNeon(glowText, x, y, glowColor, spand) {
  fill(0, 0, 0)
  glow(glowColor, spand);
  text(glowText, x, y);
  glow(glowColor, 2);
  text(glowText, x, y);
}

// glow text
function glow(glowColor, blurriness) {
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}



