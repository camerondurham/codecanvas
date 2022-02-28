FROM golang:1.17.7-buster as builder
WORKDIR /runner
COPY . .
RUN go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

# TODO: use slimmer docker image like ubuntu:20.04
FROM golang:1.17.7-buster

# create non-root user, assign UID != 0
RUN useradd -u 1111 -ms /bin/bash runner

# define user to start up as
USER runner

WORKDIR /home/runner
COPY --from=builder /runner/process ./
COPY --from=builder /runner/runner-server ./
ENTRYPOINT ["/bin/bash"]
