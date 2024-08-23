//Graphics Programming

uniform float iTime;

uniform float values[16];

float sdSphere(vec3 p, float r)
{
    return length(p) - r;
}

vec3 mapColor(vec3 p)
{
    return vec3(0.5, 0., 0.);

    /*int index = 0;
    float d = 10000.0;
    for (int i = 0; i < 10; i++) {
        if (!spheres[i].enabled)
        continue;
        d = min(d, sdSphere(p - spheres[i].position, spheres[i].scale));
        if (d == sdSphere(p - spheres[i].position, spheres[i].scale))
            index = i;
    }
    return spheres[index].color;*/
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

void main()
{
    // get the uvs
    vec2 uv = gl_FragCoord.xy / vec2(800, 600);
    uv = uv * 2.0 - 1.0;
    vec3 color = vec3(0.5, 0.5, 0.5);
    float aspect = 800.0 / 600.0;

    vec3 ro = vec3(0, 0, 0);
    vec3 rd = vec3(uv.x * aspect, uv.y, 1.0);

    // raymarching
    float t = 0.0;
    for (int i = 0; i < 100; i++)
    {
        vec3 p = ro + rd * t;

        float d = map(p);
        t += d;

        if (d > 100.0 || t > 100.0) break; // break the loop
        if (d < 0.001) {
            color = mapColor(p);
            break;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}