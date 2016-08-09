FROM mhart/alpine-node

ADD ./ /app

CMD cd /app && npm run install-all
  && npm run gulp

RUN node /app/app.js
