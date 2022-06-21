FROM node AS development
COPY . /src
RUN cd /src; npm install; npm i ts-node
CMD ["ts-node", "/src/index.ts"]