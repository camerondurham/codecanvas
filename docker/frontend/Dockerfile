FROM public.ecr.aws/debian/debian:buster-slim as builder
WORKDIR /frontend
COPY ./web-frontend .
RUN apt-get update -y \
  && apt-get install -y npm \
  && npm install \
  && npm run build


FROM pierrezemb/gostatic as frontend
COPY --from=builder /frontend/dist/ /srv/http/

