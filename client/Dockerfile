FROM node:16-alpine3.14
RUN mkdir /cliente
WORKDIR /cliente
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
