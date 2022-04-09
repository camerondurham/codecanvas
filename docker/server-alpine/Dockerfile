FROM golang:1.17.7-alpine3.15 as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

FROM golang:1.17.6-alpine3.15

# TODO: install other runtime dependencies here
RUN apk add python3

WORKDIR /runner

# add process binary to a directory already in $PATH
COPY --from=builder /runner/process /usr/bin
COPY --from=builder /runner/runner-server ./
# TODO: do this in the server
RUN groupadd -g 1234 runner1 && useradd -u 1234 -g runner1 -d /tmp/runner1 runner1
EXPOSE 8080
ENTRYPOINT ["/runner/runner-server"]
