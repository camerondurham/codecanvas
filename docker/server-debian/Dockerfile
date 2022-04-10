FROM golang:1.17.7-buster as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

FROM golang:1.17.7-buster

WORKDIR /runner

# add process binary to a directory already in $PATH
COPY --from=builder /runner/process /usr/bin
COPY --from=builder /runner/runner-server ./
COPY docker/server-debian/entrypoint.sh /runner/entrypoint.sh
RUN apt-get update \
    && apt-get install -y python3
EXPOSE 10100
ENTRYPOINT ["/runner/entrypoint.sh", "server"]
