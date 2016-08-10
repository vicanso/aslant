FROM mhart/alpine-node

ADD ./ /app

RUN cd /app && npm rebuild

CMD cd /app && npm run start
