FROM golang:1.17.2-alpine3.14 as builder
WORKDIR /engine-build/
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY main.go .
RUN mkdir -p /engine-build/build && go build -v -o /engine-build/build

FROM alpine:3.14.2 as cli
WORKDIR /cli/
COPY --from=builder /ch-build/build ./
ENTRYPOINT ["/cli/ch"]
