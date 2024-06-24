#!/bin/bash

set -ex

curl -X GET 0.0.0.0:10100/api/v1/languages

curl -X POST 0.0.0.0:10100/api/v1/run -d '{"language": "bash", "source": "echo hello world"}'

curl -X POST 0.0.0.0:10100/api/v1/run -d \
'{"language": "c++", "source": "#include <iostream>\nint main() { int* nullPtr = nullptr;  try { *nullPtr = 42;  std::cout << \"Value at null pointer: \" << *nullPtr << std::endl; } catch (const std::exception& e) { std::cerr << \"Exception caught: \" << e.what() << std::endl; } return 0; }" }'
