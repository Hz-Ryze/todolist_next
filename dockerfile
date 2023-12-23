FROM node:18.18

ENV TZ Asia/Shanghai

WORKDIR /app

COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
