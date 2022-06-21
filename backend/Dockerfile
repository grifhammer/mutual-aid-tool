FROM node AS development
COPY . /src
COPY ./src/config/example.index.ts ./src/config/index.ts
RUN cd /src; npm install; npm i -g ts-node
CMD ["ts-node", "/src/index.ts"]