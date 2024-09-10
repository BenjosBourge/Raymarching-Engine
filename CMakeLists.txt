cmake_minimum_required(VERSION 3.23)
project(RaymarchingEngine)

set(CMAKE_CXX_STANDARD 14)

file( GLOB SRC src/*.cpp)

add_executable(RaymarchingEngine
        ${SRC})

find_package(OpenGL REQUIRED)
find_package(GLUT REQUIRED)

target_link_libraries(RaymarchingEngine ${OPENGL_LIBRARIES} ${GLUT_LIBRARIES})
target_link_libraries(RaymarchingEngine -lopengl32 -lfreeglut)
