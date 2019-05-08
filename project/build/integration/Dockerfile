FROM golang:1.8
FROM node:12

RUN mkdir /test
WORKDIR /test
ADD ./* /test/
RUN chmod -R 777 /test

CMD ["./test.sh"]
