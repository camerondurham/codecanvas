# API

This document is a rough specification of the runner server API.
Eventually, this should be a Postman collection and/or Swagger
spec to generate documentation automatically.


## GET `/api/v1/languages`

Retrieve list of supported languages by the `/api/v1/run` endpoint.

Request Example:

```bash
$ curl --request GET localhost:8080/api/v1/languages
```

Response Example:

```bash
{ "languages" : ["python3", "cpp11"] }
```

## POST `/api/v1/run`

Submit code to the runner server to be executed.
These types are specified
[here](https://github.com/camerondurham/runner/blob/fa886db2072543fc99afab95ec2c9ebdfd79842a/engine/coderunner/types.go#L27-L36).

Required fields in body:

- `language`: a supported language from `/api/v1/languages` endpoint
- `source`: source code written as a string

Request Example:

```bash
$ curl --request POST \
  --data '{"language":"python3", "source" : "print(\"hello world\")" }'
  localhost:8080/api/v1/run
```

Response Example:
```bash
{ "stdout" : "hello world", "stderr" : "", "error": null }
```
