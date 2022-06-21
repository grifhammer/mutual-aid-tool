FROM node AS development
COPY . /src
RUN cd /src; yarn install
CMD ["ts-node", "/src/index.ts"]