cmake_minimum_required(VERSION 3.23)
project(Raymarching-Engine)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_EXE_LINKER_FLAGS "-static")

file( GLOB SRC src/*.cpp)

add_executable(RaymarchingEngine
        ${SRC})

set(SFML_STATIC_LIBRARIES TRUE)
set(SFML_DIR C:/SFML/lib/cmake/SFML)
find_package(SFML COMPONENTS system window graphics audio network REQUIRED)

include_directories(C:/SFML/include)
target_link_libraries(RaymarchingEngine sfml-system sfml-window sfml-graphics sfml-audio sfml-network)

