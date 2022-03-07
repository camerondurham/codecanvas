FROM golang:1.17.7-alpine3.15 as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

FROM golang:1.17.6-alpine3.15

# TODO: install other runtime dependencies here
RUN apk add python3

WORKDIR /runner
COPY --from=builder /runner/process ./
COPY --from=builder /runner/runner-server ./
EXPOSE 8080
ENTRYPOINT ["/runner/runner-server"]
