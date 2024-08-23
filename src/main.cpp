/*
 *  Raymarching Engine - Benjamin Bourge
 */

#include <SFML/Graphics.hpp>
#include <iostream>

int main()
{
    sf::RenderWindow window(sf::VideoMode(800, 600), "Raymarching Engine");
    sf::VertexArray quad(sf::Quads, 4);

    quad[0].position = sf::Vector2f(0, 0);
    quad[1].position = sf::Vector2f(0, 600);
    quad[2].position = sf::Vector2f(800, 600);
    quad[3].position = sf::Vector2f(800, 0);

    sf::Shader shader;

    if (!shader.loadFromFile("shader/fragment_shader.frag", sf::Shader::Fragment))
    {
        std::cout << "Error loading shader" << std::endl;
    }

    while (window.isOpen()) {
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