FROM golang:1.17.6-alpine3.15 as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

# TODO: make this from scratch
FROM golang:1.17.6-alpine3.15
# FROM scratch
WORKDIR /runner
COPY --from=builder /runner/process ./
COPY --from=builder /runner/runner-server ./
EXPOSE 8080
ENTRYPOINT ["/runner/runner-server"]
