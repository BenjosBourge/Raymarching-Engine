//Graphics Programming

uniform float iTime;

uniform float values[16];

float sdSphere(vec3 p, float r)
{
    return length(p) - r;
}


float map(vec3 p)
{
    float d = 10000.0;
    for (int i = 0; i < 2; i++) {
        if (values[i * 8 + 7] <= 0.1)
        continue;
        vec3 pos = vec3(values[i * 8 + 0], values[i * 8 + 1], values[i * 8 + 2]);
        float scale = values[i * 8 + 6];
        d = min(d, sdSphere(p - pos, scale));
    }
    return d;
}


vec3 calcNormal(in vec3 pos)
{
    vec2 e = vec2(0.0001, 0.);
    return normalize(vec3(map(pos+e.xyy)-map(pos-e.xyy),
    map(pos+e.yxy)-map(pos-e.yxy),
    map(pos+e.yyx)-map(pos-e.yyx)));
}


void main()
{
    // get the uvs
    vec2 uv = gl_FragCoord.xy / vec2(800, 600);
    uv = uv * 2.0 - 1.0;
    vec3 color = vec3(0.5, 0.5, 0.5);
    float aspect = 800.0 / 600.0;
    float fov = 0.2;

    vec3 ro = vec3(0, 0, -8);
    vec3 rd = vec3(uv.x * aspect * fov, uv.y * fov, 1.0);

    // raymarching
    float t = 0.0;
    for (int i = 0; i < 100; i++)
    {
        vec3 p = ro + rd * t;

        float d = map(p);
        t += d;

        if (d > 100.0 || t > 100.0) break; // break the loop
        if (d < 0.001) {
            color = calcNormal(p);
            break;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}