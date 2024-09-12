# Projects Settings
cmake_minimum_required (VERSION 3.1)
project (RaymarchingEngine)

# The main executable
add_executable(RaymarchingEngine
  src/main.cpp
)

set_property(TARGET RaymarchingEngine PROPERTY CXX_STANDARD 11)
target_compile_options(RaymarchingEngine PRIVATE -Wall)

add_definitions(-DGLEW_STATIC)
add_subdirectory(lib/glfw EXCLUDE_FROM_ALL)
add_subdirectory(lib/glew EXCLUDE_FROM_ALL)
add_subdirectory(lib/glm EXCLUDE_FROM_ALL)

target_link_libraries(RaymarchingEngine
  PRIVATE glfw
  PRIVATE libglew_static
  PRIVATE glm
)

target_include_directories(RaymarchingEngine
  PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src
  PRIVATE ${CMAKE_CURRENT_BINARY_DIR}/src
)
