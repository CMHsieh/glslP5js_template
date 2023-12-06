// Author: CMH
// Title: Learning Shaders
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0; //MonaLisa
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform sampler2D u_tex3;
uniform sampler2D u_tex4;
uniform sampler2D u_tex5;
uniform sampler2D u_tex6;
uniform sampler2D u_tex8; //Webcam

uniform float       u_paraR;
uniform float       u_paraG;
uniform float       u_paraB;
varying vec2        v_texcoord;

void main()
{
    //vec2 uv= gl_FragCoord.xy/u_resolution.xy;
    vec2 uv= v_texcoord;
    vec2 vUv=fract(6.0*uv);                        //key
    float shading= texture2D(u_tex8, uv).g; //取MonaLisa綠色版作為明亮值
    float breathing=(exp(sin(u_time*2.0*3.14159/5.0)) - 0.36787944)*0.42545906412; //[0~1]
    shading += 0.1*breathing;

    vec4 c;
                float step = 1. / 6.;
                if( shading <= step ){   
                    c = mix( texture2D( u_tex6, vUv ), texture2D( u_tex5, vUv ), 6. * shading );
                }
                if( shading > step && shading <= 2. * step ){
                    c = mix( texture2D( u_tex5, vUv ), texture2D( u_tex4, vUv) , 6. * ( shading - step ) );
                }
                if( shading > 2. * step && shading <= 3. * step ){
                    c = mix( texture2D( u_tex4, vUv ), texture2D( u_tex3, vUv ), 6. * ( shading - 2. * step ) );
                }
                if( shading > 3. * step && shading <= 4. * step ){
                    c = mix( texture2D( u_tex3, vUv ), texture2D( u_tex2, vUv ), 6. * ( shading - 3. * step ) );
                }
                if( shading > 4. * step && shading <= 5. * step ){
                    c = mix( texture2D( u_tex2, vUv ), texture2D( u_tex1, vUv ), 6. * ( shading - 4. * step ) );
                }
                if( shading > 5. * step ){
                    c = mix( texture2D( u_tex1, vUv ), vec4( 1. ), 6. * ( shading - 5. * step ) );
                }
                
     vec4 inkColor = vec4(u_paraR, u_paraG, u_paraB, 1.0);
     vec4 src = mix( mix( inkColor, vec4( 1. ), c.r ), c, .5 );
     gl_FragColor = src;
}
