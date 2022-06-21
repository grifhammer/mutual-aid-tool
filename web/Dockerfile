FROM alpine:3.16
WORKDIR .
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "watch"]