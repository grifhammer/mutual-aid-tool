FROM node AS development
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
CMD ["npm", "run", "watch"]