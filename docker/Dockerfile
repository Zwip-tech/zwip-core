FROM oven/bun:1 as base
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun run build

FROM ubuntu:22.04

WORKDIR /app

COPY --from=base /usr/src/app/dist/Zwip /app/Zwip
CMD ["/app/Zwip"]