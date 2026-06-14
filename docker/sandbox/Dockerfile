ARG GO_BASE=golang:1-bookworm
FROM ${GO_BASE}

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash \
        ca-certificates \
        g++ \
        nodejs \
        python3 \
        rustc \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 65532 sandbox \
    && useradd -u 65532 -g 65532 -M -d /tmp -s /usr/sbin/nologin sandbox

WORKDIR /work
