FROM node:alpine

ADD ./ /app

RUN cd /app && npm i --registry=https://registry.npm.taobao.org && npm run build && npm i --production --registry=https://registry.npm.taobao.org

CMD cd /app && npm start
