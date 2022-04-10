FROM golang:1.17.6-alpine3.15 as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/mock-server /runner/server/mock-server

# TODO: make this from scratch
FROM golang:1.17.6-alpine3.15
# FROM scratch
WORKDIR /runner
COPY --from=builder /runner/mock-server ./
EXPOSE 10100
ENTRYPOINT ["/runner/mock-server"]
