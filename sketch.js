let yoff = 0.0; // 2nd dimension of perlin noise
let song;
let amplitude;
let waveform;

function preload() {
  song = loadSound('source/The Christmas song.mp4');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); //window size
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  waveform = fft.waveform();
  background(0,37,106);
  cnv.mousePressed(canvasPressed);
}

function draw() {
  //background(0,37,106);

  fill(255);
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  let level = amplitude.getLevel() * 5;
  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = map(noise(xoff, level), 0, 1, 200, 400); //let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
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

  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function canvasPressed() {
  // is equivalent to `userStartAudio()`
  if(song.isPlaying()){
    song.pause();
  }else{
    song.play();
    amplitude = new p5.Amplitude();
	  amplitude.setInput(song);
  }
  
}