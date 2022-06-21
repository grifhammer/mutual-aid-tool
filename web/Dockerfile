FROM alpine:3.16
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "watch"]