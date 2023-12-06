// this variable will hold our shader object
let shdr;
// this variable will hold our webcam video
let cam;

let vertSource, fragSource;
let img, tex1, tex2, tex3, tex4, tex5, tex6;

// Part 2 - Step 2.1
let control = {
  ParaX: 0.0,
  ParaY: 0.0,
  ParaZ: 1.0,
}
// Part 2 - Step 2.2
window.onload = function() {
  var gui = new dat.GUI();
  gui.domElement.id = 'gui';
  gui.add(control, 'ParaX', 0, 1).name("Red");
  gui.add(control, 'ParaY', 0, 1).name("Green");
  gui.add(control, 'ParaZ', 0, 1).name("Blue");
};

function preload() {
  img = loadImage('assets/MonaLisa.jpg');
  tex1 = loadImage('assets/hatch_0.jpg');
  tex2 = loadImage('assets/hatch_1.jpg');
  tex3 = loadImage('assets/hatch_2.jpg');
  tex4 = loadImage('assets/hatch_3.jpg');
  tex5 = loadImage('assets/hatch_4.jpg');
  tex6 = loadImage('assets/hatch_5.jpg');
  vertSource = loadStrings('shader.vert');
  fragSource = loadStrings('6_hatching.frag');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  //createCanvas(512, 512, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files. 
  // Check `index.html` to see how it's first added to the project. 
  // And then, the `shader.frag` file to how it's used.

  shdr = createShader(vertSource, fragSource);

  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();
}

function draw() {
  shader(shdr);
  
  shdr.setUniform('u_tex0', img);
  shdr.setUniform('u_tex1', tex1);
  shdr.setUniform('u_tex2', tex2);
  shdr.setUniform('u_tex3', tex3);
  shdr.setUniform('u_tex4', tex4);
  shdr.setUniform('u_tex5', tex5);
  shdr.setUniform('u_tex6', tex6);
  shdr.setUniform('u_resolution', [width, height] );
  shdr.setUniform('u_mouse', [mouseX, mouseY]);
  shdr.setUniform('u_time', millis() / 1000.0);

  // passing cam as a texture
  shdr.setUniform('u_tex8', cam);

  // Part 2 - Step 2.3
  shdr.setUniform("u_paraR", control.ParaX);
  shdr.setUniform("u_paraG", control.ParaY);
  shdr.setUniform("u_paraB", control.ParaZ);
    
  rect(0, 0, width, height);
  //rect(width * -0.5, height * -0.5, width, height);
}

function keyPressed() {
  if (keyCode == ESCAPE) { dat.GUI.toggleHide(); }
}