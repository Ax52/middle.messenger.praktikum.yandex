FROM alpine:latest

RUN apk add --no-cache --update bash nodejs npm
ADD ./ /var/www/

WORKDIR /var/www
RUN npm install && npm run build

# RUN adduser -D myuser
# USER myuser

EXPOSE 3000

CMD node server.js port=$PORT
