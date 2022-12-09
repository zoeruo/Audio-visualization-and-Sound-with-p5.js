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
let cnv;
let lineX = 0;
let speed = 10;


//TODO nicer UI
function preload() {
  song = loadSound('source/The Christmas song.mp4');
}

// let canvas1 = function(p){
//   p.setup = function(){
//     p.createCanvas(windowWidth, 500); //window size
//     bgcolor = color(6, 47, 103);
//     p.background(bgcolor);



//   }
//   p.draw = function(){
//     bgcolor_r = map(mouseY, 0, height, 104, 19);
//     bgcolor_g = map(mouseY, 0, height, 190, 35);
//     bgcolor_b = map(mouseY, 0, height, 255, 47);
//     bgcolor = color(bgcolor_r, bgcolor_g, bgcolor_b);
//     //wave
//     let xoff = 0;
//     p.fill(bgcolor);//fill(wavecolor);;
//     p.stroke(0, 0, 0);
//     p.strokeWeight(1);
//     fft.analyze();
//     peakDetect.update(fft);
//     if (peakDetect.isDetected) {
//       wavecolor = changeWaveColor();
//       // TODO when it reaches the bottom change direction
//       changeHeight();
//     }
//     // We are going to draw a polygon out of the wave points
//     p.beginShape();
//     let level = amplitude.getLevel() * 5;
//     for (let x = 0; x <= width + 20; x += 10) {
//       let y = map(noise(xoff, level), 0, 1, waveheight, waveheight + 200);
//       p.vertex(x, y);
//       xoff += 0.05;
//     }

//     p.vertex(width, height);
//     p.vertex(0, height);
//     endShape(CLOSE);

//     // 1024
//     let spectrum = fft.analyze();
//     //noStroke();
//     fill(255, 225, 140);
//     for (let i = 0; i < spectrum.length; i++) {
//       let x = map(i, 0, spectrum.length, 0, width);
//       let h = -height + map(spectrum[i], 0, 255, height, 0);
//       circle(windowWidth / 4, 200, spectrum[i] * 0.1);
//       circle(windowWidth / 3, 120, spectrum[i] * 0.08);
//       circle(windowWidth / 3 * 2, 30, spectrum[i] * 0.04);
//       circle(windowWidth / 5 * 4, 190, spectrum[i] * 0.11);
//       circle(windowWidth / 2, 130, spectrum[i] * 0.08);
//       circle(windowWidth / 9, 230, spectrum[i] * 0.08);
//       //rect(x, height, width / spectrum.length, h )
//     }


//     let diameter = map(level, 0, 1, 0, 40);
//     starcolor = color(253, 255, 170);
//     starcolor.setAlpha(128 + 128 * sin(millis() / 1000));

//   }

// }

function setup() {
  cnv = createCanvas(windowWidth, 500); //window size
  cnv.parent("c1");
  bgcolor = color(6, 47, 103);
  background(bgcolor);

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  waveform = fft.waveform();
  peakDetect = new p5.PeakDetect(2000, 4000); //2500-4000 frequency as peak
  time = millis();
  wavecolor = color(0, 37, 106);
  osc = new p5.Oscillator('sine');
  let spand = 0.1;

  //textFont(font);
  // textAlign(CENTER, CENTER);
  // textSize(14);

  //instruction div 12/7
  let divinstruction = createDiv('');
  divinstruction.html('Play / Pause with Space Key&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;Add sounds with Clicking&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;Move your Mouse');
  divinstruction.position(0, 0);
  divinstruction.style('font-family', 'Zen Dots');
  divinstruction.style('font-size', '12px');
  divinstruction.style('width', '100%');
  divinstruction.style('text-align', 'center');
  divinstruction.style('color', 'white');
  divinstruction.style('background-color', 'rgba(253, 182, 166, .2)');
  divinstruction.style('padding', '15px 0');
  divinstruction.style('opacity', 0.6);

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
    // textNeon(
    //   'Play/Pause with Space key',
    //   width / 2,
    //   height / 2,
    //   color(255, 250, 157),
    //   spand
    // );
    // textNeon(
    //   '&',
    //   width / 2,
    //   height / 2 + 40,
    //   color(255, 250, 157),
    //   spand
    // );
    // textNeon(
    //   'Add sounds with clicking',
    //   width / 2,
    //   height / 2 + 70,
    //   color(255, 250, 157),
    //   spand
    // );
    // textNeon(
    //   'And see what happens with key "Z" and "X"',
    //   width / 2,
    //   height / 2 + 100,
    //   color(255, 250, 157),
    //   spand
    // );
  } else {

    frameRate(24);
    //change background color with mouseY(day to night) 12/7
    bgcolor_r = map(mouseY, 0, height, 104, 19);
    bgcolor_g = map(mouseY, 0, height, 190, 35);
    bgcolor_b = map(mouseY, 0, height, 255, 47);
    bgcolor = color(bgcolor_r, bgcolor_g, bgcolor_b);
    //background(bgcolor);

    //meteor(0);

    //wave
    let xoff = 0;
    fill(bgcolor);//fill(wavecolor);
    //remove blur from waves
    drawingContext.shadowBlur = 0;
    //drawingContext.shadowColor = none;
    stroke(0, 0, 0);
    strokeWeight(1);
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
    let spectrum = fft.analyze();
    //noStroke();
    fill(255, 225, 140);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      circle(windowWidth / 4, 200, spectrum[i] * 0.1);
      circle(windowWidth / 3, 120, spectrum[i] * 0.08);
      circle(windowWidth / 3 * 2, 30, spectrum[i] * 0.04);
      circle(windowWidth / 5 * 4, 190, spectrum[i] * 0.11);
      circle(windowWidth / 2, 130, spectrum[i] * 0.08);
      circle(windowWidth / 9, 230, spectrum[i] * 0.08);
      //rect(x, height, width / spectrum.length, h )
    }


    let diameter = map(level, 0, 1, 0, 40);
    starcolor = color(253, 255, 170);
    starcolor.setAlpha(128 + 128 * sin(millis() / 1000));
    //shiningsign(diameter, starcolor);





    //circle(windowWidth/4, 200, diameter);

    // if (keyIsPressed == true) {
    //   if (keyCode === 39) {
    //     setInterval(meteor(0), 1000);
    //   }
    // }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 500);
  bgcolor = color(6, 47, 103);
  background(bgcolor);
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
  } else if (keyCode === 39) {

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
  if (waveheight > 500) {
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
    starcolor = color("black");//color(246, 231, 47);
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
  // ellipse(200, 200, (frameCount % 30)*10, 50);
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

function startmeteor() {
  setInterval(meteor(0), 1000);
}

// function meteor(type) {
//   background(6, 47, 103);
//   if (type === 0) {
//     strokeCap(ROUND);
//     strokeWeight(6);
//     stroke(239, 227, 243);
//     line(lineX, 200, lineX + 100, 200);
//     lineX = lineX + speed;
//     if (lineX > width) {
//       speed = -(speed);
//     } else if (lineX + 100 < 0) {
//       speed = 10;
//     }
//   }
// }



