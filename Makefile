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
	@echo "  test: run all tests in repo with coverage"
	@echo ""
	@echo "  fmt: run go fmt on the repository"
	@echo ""
	@echo "  clean: remove build directory"
	@echo ""
	@echo "  lint: run Docker golang-lint-ci for the repository"
	@echo ""
	@echo "  install-hooks: install git-hooks in the cloned repo .git directory"
	@echo ""
	@echo "  dkr-mock: build and run mock server using Docker"
	@echo ""
	@echo "  dkr-server: build and run server using Docker"
	@echo ""
	@echo "  dkr-stop-mock: stop and remove mock container"
	@echo ""
	@echo "  dkr-stop-server: stop and remove server container"
	@echo ""

dkr-mock: dkr-build-mock
	docker build -t ${MOCK_SERVER_NAME}:${VERSION} -f docker/mock-server/Dockerfile .
	docker run -d -p 10100:10100 --name ${MOCK_SERVER_NAME} ${MOCK_SERVER_NAME}:${VERSION}

dkr-server:
	docker build -t ${SERVER_NAME}:${VERSION} -f docker/server-debian/Dockerfile .
	docker run -d -p 10100:10100 -e DEBUG=1 --name ${SERVER_NAME} ${SERVER_NAME}:${VERSION}

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
	mockgen -source ./engine/controller/controller.go -package=mocks -destination ./engine/controller/mocks/Controller.go Controller
	mockgen -source ./engine/controller/writerremover/blobwriter.go -package=mocks -destination ./engine/controller/writerremover/mocks/Blobwriter.go BlobWriterRemover

build:
	mkdir -p build
	go build -v -o build/runner-server ./server/
	go build -v -o build/process ./engine/process/

test: build
	PATH=${PATH}:${PWD}/build go test -covermode=atomic ./...

fmt:
	go fmt ./...

clean:
	rm -rf build

install-hooks:
	@echo "installing git hooks"
	cp ./hack/hooks/* .git/hooks/
	@echo "done"

.PHONY: build lint test
