FROM alpine:3.9

ARG VERSION

ENV AWS_CLI_VERSION ${VERSION}
ENV PIP_CERT /etc/ssl/certs/ca-certificates.crt

RUN apk update && \
    apk add --no-cache make bash python3 jq git openssh-client dos2unix gettext moreutils && \
    pip3 install --upgrade pip && \
    pip3 install awscli==${VERSION}

ENV AWS_CA_BUNDLE /etc/ssl/certs/ca-certificates.crt

VOLUME ["/src", "/root/.aws" ]

WORKDIR /src

CMD ["aws", "--version"]
