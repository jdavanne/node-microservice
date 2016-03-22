FROM node:5

WORKDIR /app
COPY package.json /app/
RUN npm install

COPY app /app/app

# server app
EXPOSE 3000

CMD [ "npm" , "start"]
