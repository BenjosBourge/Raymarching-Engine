/*
 *  Raymarching Engine - Benjamin Bourge
 */

/*void createSphere(sf::Shader &shader, int index, sf::Vector3f position, float radius, sf::Color color)
{
    float ff[5] = {1.f, 0.f, 0.f, 0.f, 0.f};

    //position
    ff[0] = position.x;
    ff[1] = position.y;
    ff[2] = position.z;
    //radius
    ff[3] = radius;

    std::string indexStr = std::to_string(index * 16);
    shader.setUniformArray("values[" + indexStr + "]", ff, 5);
}

void init(sf::Shader &shader)
{
    createSphere(shader, 0, sf::Vector3f(0, 0, 0), 0.5f, sf::Color::Red);
    createSphere(shader, 1, sf::Vector3f(1, 1, 0), 0.25f, sf::Color::Green);
}

int main()
{
    sf::Vector2f resolution(1200, 800);
    sf::RenderWindow window(sf::VideoMode((int)resolution.x, (int)resolution.y), "Raymarching Engine");
    sf::VertexArray quad(sf::Quads, 4);
    sf::Clock clock;
    sf::Clock clockDelta;
    sf::Clock clockFPS;
    int fps = 0;

    quad[0].position = sf::Vector2f(0, 0);
    quad[1].position = sf::Vector2f(0, resolution.y);
    quad[2].position = sf::Vector2f(resolution.x, resolution.y);
    quad[3].position = sf::Vector2f(resolution.x, 0);

    sf::Shader shader;

    if (!shader.loadFromFile("shader/fragment_shader.frag", sf::Shader::Fragment))
    {
        std::cout << "Error loading shader" << std::endl;
    }

    if (!sf::Shader::isAvailable()) {
        std::cout << "shader not available" << std::endl;
        return 84;
    }

    //initializing the shader
    shader.setUniform("iResolution", resolution);
    init(shader);

    while (window.isOpen()) {
        if (clockFPS.getElapsedTime().asSeconds() >= 1) {
            std::cout << "FPS: " << fps << std::endl;
            fps = 0;
            clockFPS.restart();
        }
        float time = clock.getElapsedTime().asSeconds();
        shader.setUniform("iTime", time);
        float deltaTime = clockDelta.restart().asSeconds();

        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Escape)) {
            window.close();
            break;
        }

        //update
        shader.setUniform("targetCamera", sf::Vector3f(0, 0.5, 0));
        shader.setUniform("originCamera", sf::Vector3f(sin(time) * 3, 1, cos(time) * 3));

        window.clear(sf::Color::Black);
        window.draw(quad, &shader);
        window.display();
        fps++;
    }
    return 0;
}*/

#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("OpenGL FreeGLUT Window");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
