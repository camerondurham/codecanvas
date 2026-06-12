# runner
# General purpose Makefile for macos/Linux/WSL2 users
# macOS: `make` should be installed if you have xcode developer tools, if not: xcode-select --install
# Debian/Ubuntu including WSL2: sudo apt-get install build-essential
# Windows (non-WSL2): choco install make or http://gnuwin32.sourceforge.net/install.html

VERSION=v1
MOCK_SERVER_NAME=mock-server
SERVER_NAME=runner-server
DEV_NAME=runner-dev
SANDBOX_IMAGE=codecanvas-sandbox

all:
	@echo "runner Makefile targets"
	@echo ""
	@echo "  ci: run the CI validation set"
	@echo ""
	@echo "  gen-mocks: create/recreate mocks for unit testing"
	@echo ""
	@echo "  test: run all tests in repo with coverage"
	@echo ""
	@echo "  vet: run go vet on the repository"
	@echo ""
	@echo "  fmt: run go fmt on the repository"
	@echo ""
	@echo "  clean: remove build directory"
	@echo ""
	@echo "  lint: run Docker golang-lint-ci for the repository"
	@echo ""
	@echo "  test-web: build the legacy webpack frontend"
	@echo ""
	@echo "  test-server-startup: smoke test server startup"
	@echo ""
	@echo "  install-hooks: install git-hooks in the cloned repo .git directory"
	@echo ""
	@echo "  dkr-build-mock: build mock server image using Docker"
	@echo ""
	@echo "  dkr-mock: build and run mock server using Docker"
	@echo ""
	@echo "  dkr-build-server: build server image using Docker"
	@echo ""
	@echo "  dkr-server: build and run server using Docker"
	@echo ""
	@echo "  dkr-build-sandbox: build local all-tools sandbox image"
	@echo ""
	@echo "  dkr-stop-mock: stop and remove mock container"
	@echo ""
	@echo "  dkr-stop-server: stop and remove server container"
	@echo ""

dkr-mock: dkr-build-mock
	docker run -d -p 10100:10100 --name ${MOCK_SERVER_NAME} ${MOCK_SERVER_NAME}:${VERSION}

dkr-build-mock:
	docker build -t ${MOCK_SERVER_NAME}:${VERSION} -f docker/mock-server/Dockerfile .

dkr-server: dkr-build-server
	docker run -d -p 10100:10100 -e DEBUG=1 --name ${SERVER_NAME} ${SERVER_NAME}:${VERSION}

dkr-build-server:
	docker build -t ${SERVER_NAME}:${VERSION} -f docker/server-debian/Dockerfile .

dkr-build-sandbox:
	docker build -t ${SANDBOX_IMAGE}:local -f docker/sandbox/Dockerfile .

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
	UNIT_TEST=1 DEBUG=1 PATH="$(CURDIR)/build:${PATH}" go test -covermode=atomic ./...

vet:
	go vet ./...

lint:
	docker run --rm -v "$(CURDIR):/app" -w /app golangci/golangci-lint:v1.45.2 golangci-lint run ./... -v

test-web:
	cd web-frontend && npm ci && npm run build

test-server-startup: build
	cd server && PATH="$(CURDIR)/build:${PATH}" ./test_server_startup.sh

ci: test vet lint test-server-startup dkr-build-server test-web

fmt:
	go fmt ./...

clean:
	rm -rf build

install-hooks:
	@echo "installing git hooks"
	cp ./hack/hooks/* .git/hooks/
	@echo "done"

.PHONY: all build ci clean dkr-build-mock dkr-build-sandbox dkr-build-server dkr-mock dkr-server dkr-stop-dev dkr-stop-mock dkr-stop-server fmt gen-mocks install-hooks lint test test-server-startup test-web vet
