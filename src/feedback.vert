
#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

// attributes, in
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// attributes, out
varying vec4 var_vertCol;
varying vec2 var_vertTexCoord;

// matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    var_vertTexCoord = aTexCoord; //Sending to frag
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}