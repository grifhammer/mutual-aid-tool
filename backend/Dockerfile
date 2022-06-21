FROM node:16
FROM build AS development
COPY . /src
RUN cd /src; npm install
CMD ["ts-node", "/src/index.ts"]