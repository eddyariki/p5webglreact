#ifdef GL_ES
precision highp float;
#endif

varying vec2 var_vertTexCoord;

uniform sampler2D prevtex;
uniform float time;
uniform vec2 texsize;
uniform vec2 mouse;


float random(vec2 st){
	return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))*46606.0);
}
vec2 N22 (vec2 p){
    vec3 a = fract(p.xyx*vec3(123.34, 322.34, 435.65));
    a += dot(a,a+21.22);
    return fract(vec2(a.x*a.y, a.y*a.z));
}

float noise (vec2 st){
	vec2 i = floor(st);
	vec2 f = fract(st);
    //Four corners in 2d of a tile 
    float a  = random(i);
    float b = random(i+vec2(1.0,0.0));
    float c = random(i+vec2(0.0,1.0));
    float d = random(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float scale(float s){
    return s;
}
void main() {
    vec2 uv = var_vertTexCoord;
    uv.x *=texsize.x/texsize.y;
    float minDist = 100.;
    vec2 cellIndex = vec2(0.0);

    vec3 col = texture2D(prevtex, var_vertTexCoord).rgb;

    uv*=12.;
    vec2 gv = fract(uv) - 0.5;
    vec2  id = floor(uv);
    vec3 total;
    for(float y=-1.0;y<2.0; y++){
        for(float x=-1.0;x<2.0; x++){
            vec2 offset = vec2(x,y);
            vec4 offset2 = texture2D(prevtex, var_vertTexCoord + vec2(1.0/texsize.x, 1.0/texsize.y) * vec2(y,x));
            total += offset2.rgb;
            vec2 n = N22(id + offset);
            vec2 p = offset + sin(n*0.5 + time*n*2.)*0.5;
            float d = length(gv-p);
            if(d<minDist){
                minDist = d;
                cellIndex = id + offset;
            }
        }
    }
    total/=9.0;
    float rn = random(uv);

    if(total.x > 0.01 && rn>0.56  &&2.0*noise(1.0*uv + time*0.5)-rn*noise(3.0*uv - time*0.5)>0.83){
        col = vec3(1.2-1.9*minDist);

    }else{
        col=col*0.99-vec3(0.05);
    }

    gl_FragColor = vec4(col*0.99,1.0);
}


