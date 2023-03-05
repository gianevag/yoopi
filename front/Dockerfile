FROM node:16.15.0
WORKDIR /front-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "build:preview"]