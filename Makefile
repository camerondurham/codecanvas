# runner
# General purpose Makefile for macos/Linux/WSL2 users
# macOS: `make` should be installed if you have xcode developer tools, if not: xcode-select --install
# Debian/Ubuntu including WSL2: sudo apt-get install build-essential
# Windows (non-WSL2): choco install make or http://gnuwin32.sourceforge.net/install.html

VERSION=v1
MOCK_SERVER_NAME=mock-server
SERVER_NAME=runner-server
DEV_NAME=runner-dev

all:
	@echo "runner Makefile targets"
	@echo ""
	@echo "  gen-mocks: create/recreate mocks for unit testing"
	@echo ""
	@echo "  run-api: run the API server"
	@echo ""
	@echo "  run-api-bg: run the API server in the background"
	@echo ""
	@echo "  run-mock: run the mock API server"
	@echo ""
	@echo "  run-mock-bg: run the mock API server in the background"
	@echo ""
	@echo "  kill-api: kill the API server"
	@echo ""
	@echo "  test: run all unit tests in the repo"
	@echo ""
	@echo "  fmt: run go fmt on the repository"
	@echo ""
	@echo "  lint: run Docker golang-lint-ci for the repository"
	@echo ""
	@echo "  install-hooks: install git-hooks in the cloned repo .git directory"
	@echo ""
	@echo "  dkr-mock: build and run mock server using Docker"
	@echo ""
	@echo "  dkr-server: build and run server using Docker"
	@echo ""
	@echo "  dkr-dev: build and run runtime processor using Docker"
	@echo ""
	@echo "  dkr-stop-mock: stop and remove mock container"
	@echo ""
	@echo "  dkr-stop-server: stop and remove server container"
	@echo ""
	@echo "  dkr-stop-dev: stop and remove dev container"
	@echo ""

dkr-build-mock:
	docker build -t ${MOCK_SERVER_NAME}:${VERSION} -f docker/mock-server/Dockerfile .

dkr-mock: dkr-build-mock
	docker run -d -p 8080:8080 --name ${MOCK_SERVER_NAME} ${MOCK_SERVER_NAME}:${VERSION}

dkr-build-server:
	docker build -t ${SERVER_NAME}:${VERSION} -f docker/server/Dockerfile .

dkr-build-dev:
	docker build -t ${DEV_NAME}:${VERSION} -f docker/runtime-dev/Dockerfile .

dkr-server: dkr-build-server
	docker run -d -p 8080:8080 -e DEBUG=1 --name ${SERVER_NAME} ${SERVER_NAME}:${VERSION}

dkr-dev: dkr-build-dev
	docker run -it -p 8080:8080 --rm -v ${PWD}:/runner --name ${DEV_NAME} ${DEV_NAME}:${VERSION}

dkr-stop-mock:
	docker stop ${MOCK_SERVER_NAME}
	docker rm ${MOCK_SERVER_NAME}

dkr-stop-server:
	docker stop ${SERVER_NAME}
	docker rm ${SERVER_NAME}

dkr-stop-dev:
	docker stop ${DEV_NAME}

gen-mocks:
	mockgen -source ./engine/runtime/types.go -package=mocks -destination ./engine/runtime/mocks/Runtime.go Runtime

run-api:
	go run server/main.go

run-api-bg:
	go run server/main.go &

run-mock:
	go run server/mock-server/main.go

run-mock-bg:
	go run server/mock-server/main.go &

kill-api:
	./hack/kill_server.sh

build:
	mkdir -p build
	go build -v -o build/runner-server ./server/
	go build -v -o build/process ./engine/process/

test: build
	PATH=${PATH}:${PWD}/build go test ./...

fmt:
	go fmt ./...

lint:
	docker run --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:v1.44.0 golangci-lint run  ./... -v

install-hooks:
	@echo "installing git hooks"
	cp ./hack/hooks/* .git/hooks/
	@echo "done"

.PHONY: build lint test