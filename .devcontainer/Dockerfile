FROM mcr.microsoft.com/vscode/devcontainers/go:1.17-bullseye

# add more runtime dependencies here
ARG dependencies="python3 g++"
RUN apt-get update -y \
&& apt-get install -y ${dependencies} \
&& go install github.com/spf13/cobra/cobra@v1.3.0

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
