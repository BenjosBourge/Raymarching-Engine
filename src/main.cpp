/*
 *  Raymarching Engine - Benjamin Bourge
 */

#include <SFML/Graphics.hpp>
#include <iostream>

void init(sf::Shader &shader)
{
    float f[16] = {0.f, 0.f, 2.f, 1.f, 0.f, 0.f, 1.f, 1.f, -2.f, 1.f, 3.f, 1.f, 1.f, 1.f, 0.5f, 1.f};
    shader.setUniformArray("values", f, 16);

    float ff[3] = {2.f, 1.f, 3.f};
    shader.setUniformArray("values[8]", ff, 3);
}

int main()
{
    sf::Vector2f resolution(1200, 800);
    sf::RenderWindow window(sf::VideoMode((int)resolution.x, (int)resolution.y), "Raymarching Engine");
    sf::VertexArray quad(sf::Quads, 4);
    sf::Clock clock;
    sf::Clock clockDelta;

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

        window.clear(sf::Color::Black);
        window.draw(quad, &shader);
        window.display();
    }
    return 0;
}