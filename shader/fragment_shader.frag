void main()
{
    // get the uvs
    vec2 uv = gl_FragCoord.xy / vec2(800, 600);
    gl_FragColor = vec4(uv, 0.0, 1.0);
}