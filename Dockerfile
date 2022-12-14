FROM node:16 as builder

WORKDIR /app

COPY . .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ARG PORT
ENV PORT ${PORT}

ARG GRAPH_API
ENV GRAPH_API ${GRAPH_API}

ARG API_BASE_URL
ENV API_BASE_URL ${API_BASE_URL}

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn generate

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 8000

CMD [ "yarn", "start" ]