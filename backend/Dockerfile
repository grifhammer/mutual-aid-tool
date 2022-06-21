FROM node AS development
COPY . /src
RUN cd /src; npm install; npm i -g ts-node
CMD ["ts-node", "/src/src/index.ts"]