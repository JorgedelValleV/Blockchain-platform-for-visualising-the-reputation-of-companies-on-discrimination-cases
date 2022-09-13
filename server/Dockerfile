FROM node:16-alpine3.14
RUN mkdir /server
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
