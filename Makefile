# runner
# General purpose Makefile for macos/Linux/WSL2 users
# macOS: `make` should be installed if you have xcode developer tools, if not: xcode-select --install
# Debian/Ubuntu including WSL2: sudo apt-get install build-essential
# Windows (non-WSL2): choco install make or http://gnuwin32.sourceforge.net/install.html

gen-mocks:
	mockgen -source ./engine/runtime/types.go -package=mocks -destination ./engine/runtime/mocks/Runtime.go Runtime

run-api:
	go run api/main.go

test:
	go test ./...