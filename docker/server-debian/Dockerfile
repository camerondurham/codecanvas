FROM golang:1.17.9 as builder
#FROM public.ecr.aws/bitnami/golang:1.17.9 as builder
WORKDIR /runner
COPY . .
RUN GOPROXY=direct go build -v -o /runner/process /runner/engine/process/ \
 && go build -v -o /runner/runner-server /runner/server/

FROM golang:1.17.9

WORKDIR /runner

# add process binary to a directory already in $PATH
COPY --from=builder /runner/process /usr/bin
COPY --from=builder /runner/runner-server ./
COPY docker/server-debian/entrypoint.sh /runner/entrypoint.sh
RUN apt-get update \
    && apt-get install -y python3 nodejs rustc
EXPOSE 10100
ENV NUM_RUNNERS=${NUM_RUNNERS:-100}
ENTRYPOINT ["/runner/entrypoint.sh", "server"]
