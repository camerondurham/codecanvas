# runner
# General purpose Makefile for macos/Linux/WSL2 users
# macOS: `make` should be installed if you have xcode developer tools, if not: xcode-select --install
# Debian/Ubuntu including WSL2: sudo apt-get install build-essential
# Windows (non-WSL2): choco install make or http://gnuwin32.sourceforge.net/install.html

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

gen-mocks:
	mockgen -source ./engine/runtime/types.go -package=mocks -destination ./engine/runtime/mocks/Runtime.go Runtime

run-api:
	go run api/main.go

run-api-bg:
	go run api/main.go &

run-mock:
	go run api/mock-api/main.go

run-mock-bg:
	go run api/mock-api/main.go &

kill-api:
	./hack/kill_server.sh

test:
	go test ./...

fmt:
	go fmt ./...

lint:
	docker run --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:v1.44.0 golangci-lint run  ./... -v

install-hooks:
	@echo "installing git hooks"
	cp ./hack/hooks/* .git/hooks/
	@echo "done"