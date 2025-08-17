# See Earthfile reference here: https://docs.earthly.dev/docs/earthfile
# This is effectively a Dockerfile + Makefile so you can run reproducible tests
# locally and in continuous integration (e.g. Github Actions)

VERSION 0.6
FROM golang:1.17.9
WORKDIR /runner
ARG dependencies="python3 g++ nodejs"
COPY . .

build-dev:
  FROM mcr.microsoft.com/vscode/devcontainers/go:1.17-bullseye

  # add more runtime dependencies here
  RUN apt-get update -y \
  && apt-get install -y ${dependencies} \
  && go install github.com/spf13/cobra/cobra@v1.3.0 \
  && go install github.com/golang/mock/mockgen@v1.6.0

  EXPOSE 10100
  ENTRYPOINT ["/bin/bash"]
  SAVE IMAGE runner-devcontainer

build-server:
  RUN go build -v -o /runner/process /runner/engine/process/ \
   && go build -v -o /runner/runner-server /runner/server/
  SAVE ARTIFACT process
  SAVE ARTIFACT runner-server

server:
  FROM golang:1.17.9
  WORKDIR /runner
  # add process binary to a directory already in $PATH
  COPY +build-server/runner-server ./
  COPY +build-server/process /usr/bin
  COPY docker/server-debian/entrypoint.sh /runner/entrypoint.sh
  RUN apt-get update \
      && apt-get install -y ${dependencies}
  EXPOSE 10100
  ENV NUM_RUNNERS=${NUM_RUNNERS:-100}
  ENTRYPOINT ["/runner/entrypoint.sh", "server"]
  SAVE IMAGE runner-server

run-server:
  COPY +build-server/process /usr/bin
  COPY +build-server/runner-server /usr/bin

build-mock:
  FROM golang:1.17.9
  WORKDIR /runner
  COPY . .
  RUN go build -v -o /runner/mock-server /runner/server/mock-server
  SAVE ARTIFACT server/mock-server

mock:
  FROM golang:1.17.9
  WORKDIR /runner
  COPY +build-mock/mock-server ./
  EXPOSE 10100
  ENTRYPOINT ["/runner/mock-server"]
  SAVE IMAGE mock-runner-server

vet:
  # copy source into container and then run the go vet tool
  RUN go vet ./...

lint-sourcecode:
  SAVE ARTIFACT .

lint:
  FROM golangci/golangci-lint:v1.45.2
  WORKDIR /app
  COPY +lint-sourcecode/ .
  RUN cd /app/runner && golangci-lint run ./... -v

test-go:
  # runner-server tests require that the process binary can be built
  COPY +build-server/process /usr/bin
  RUN UNIT_TEST=1 DEBUG=1 go test -covermode=atomic ./...
  RUN cd server && ./test_server_startup.sh

test-web:
  # make sure webpack builds
  # TODO: this build takes a while it might be hard to do this as a test
  RUN cd web-frontend \
  && apt-get update -y \
  && apt-get install -y nodejs npm \
  && npm install \
  && npm run build

test-bundle-size:
  # Test bundle sizes and generate analysis report
  RUN cd web-frontend \
  && apt-get update -y \
  && apt-get install -y nodejs npm \
  && npm install \
  && npm run build:analyze \
  && npm run validate-bundle
  SAVE ARTIFACT web-frontend/dist/bundle-report.html AS LOCAL ./bundle-report.html
  SAVE ARTIFACT web-frontend/dist/bundle-stats.json AS LOCAL ./bundle-stats.json

test-server-image-build:
  FROM DOCKERFILE -f ./docker/server-debian/Dockerfile .

run-ci:
  BUILD +test-go
  BUILD +lint
  BUILD +test-server-image-build
  BUILD +test-web
  BUILD +test-bundle-size

build-frontend:
  FROM public.ecr.aws/debian/debian:buster-slim
  WORKDIR /frontend
  COPY ./web-frontend .
  RUN apt-get update -y \
    && apt-get install -y npm \
    && npm install
  SAVE ARTIFACT /frontend

frontend:
  FROM pierrezemb/gostatic
  COPY +build-frontend/frontend/ /srv/http/
  SAVE IMAGE runner-frontend
