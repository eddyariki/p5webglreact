#ifdef GL_ES
precision highp float;
#endif

varying vec2 var_vertTexCoord;

uniform sampler2D prevtex;
uniform vec2 texsize;


float random(vec2 st){
	return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))*46606.0);
}


void main() {
    vec2 uv = var_vertTexCoord;
    vec3 col = texture2D(prevtex, uv).rgb;
    vec3 total;
    
    for(int i=-1; i<2; i++){
        for(int j=-1; j<2; j++){
            vec4 offset = texture2D(prevtex, uv + vec2(1.0/texsize.x, 1.0/texsize.y) * vec2(i,j));
            total += offset.rgb;
        }
    }
    total /=9.0;
    float rn = random(uv);
    if(total.x > 0.08 && rn > 0.590){
        col = vec3(1.0);
    }else{
       col *=0.96;
    }
    gl_FragColor = vec4(col,1.0);
}


