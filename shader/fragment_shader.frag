//Graphics Programming

uniform vec3 targetCamera;
uniform vec3 originCamera;
uniform vec2 iResolution;
uniform float iTime;

uniform float values[16];

float sdSphere(vec3 p, float r)
{
    return length(p) - r;
}

float map(vec3 p)
{
    /*float d = 10000.0;
    for (int i = 0; i < 2; i++) {
        if (values[i * 8 + 7] <= 0.1)
        continue;
        vec3 pos = vec3(values[i * 8 + 0], values[i * 8 + 1], values[i * 8 + 2]);
        float scale = values[i * 8 + 6];
        d = min(d, sdSphere(p - pos, scale));
    }

    float d2 = p.y + 1.;
    return min(d, d2);*/

    float d = sdSphere(p - vec3(0., 0., 0.), 1.0);
    float d2 = p.y + 1.;
    return min(d, d2);
}

vec3 calcNormal(in vec3 pos)
{
    vec2 e = vec2(0.0001, 0.);
    return normalize(vec3(map(pos+e.xyy)-map(pos-e.xyy),
    map(pos+e.yxy)-map(pos-e.yxy),
    map(pos+e.yyx)-map(pos-e.yyx)));
}

float castRay(vec3 ro, vec3 rd)
{
    float t = 0.0;
    for (int i = 0; i < 100; i++)
    {
        vec3 pos = ro + rd*t;

        float h = map(pos);

        if (h < 0.001) break;

        t += h;
        if (t >= 20.) break;
    }
    if (t > 20.)
        t = -1.;
    return t;
}

void main()
{
    // get the uvs
    vec2 uv = (2.*gl_FragCoord.xy - iResolution) / iResolution.y;

    float aspect = iResolution.x / iResolution.y;

    vec3 ta = targetCamera;
    vec3 ro = originCamera;

    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(vec3(0, 1, 0), ww));
    vec3 vv = normalize(cross(ww, uu));
    vec3 rd = normalize(uu*uv.x + vv*uv.y + ww*1.2);

    vec3 skyCol = vec3(.4, .75, 1.) - .7*rd.y;
    skyCol = mix(skyCol, vec3(.7, .75, .8), exp(-10. * rd.y));
    vec3 color = skyCol;

    // raymarching
    float t = castRay(ro, rd);
    if (t > 0.) {
        vec3 pos = ro + rd*t;
        vec3 normal = calcNormal(pos);
        vec3 mate = vec3(0.18);

        vec3 sun_dir = normalize(vec3(.8, .3, .2));
        float sun_dif = clamp(dot(normal, sun_dir), 0., 1.);
        float sun_sha = step( castRay(pos + normal * 0.001, sun_dir), 0.0);
        float sky_dif = clamp(0.5 + 0.5 * dot(normal, vec3(0., 1., 0.)), 0., 1.);
        float bou_dif = clamp(0.5 + 0.5 * dot(normal, vec3(0., -1., 0.)), 0., 1.);

        color = mate * vec3(7., 5., 3.) * sun_dif * sun_sha;
        color += mate * vec3(0.5, .8, 0.9) * sky_dif;
        color += mate * vec3(0.7, .3, 0.2) * bou_dif;
    }

    color = pow(color, vec3(0.4545));
    gl_FragColor = vec4(color, 1.0);
}