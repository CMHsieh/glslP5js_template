#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

varying vec2   v_texcoord;

void main() { 
  v_texcoord = aPosition.xy;
  //v_texcoord.y = 1.0-v_texcoord.y;
  v_texcoord = 1.0-v_texcoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0); 
}