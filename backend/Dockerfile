FROM 16-alpine:3.16
ENV NODE_VERSION 16.15.1
FROM build AS development
COPY . /src
RUN cd /src; npm install
CMD ["ts-node", "/src/index.ts"]