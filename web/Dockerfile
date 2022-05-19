
FROM repository.anxinyun.cn/base-images/nodejs12:20.10.12.2

COPY . /var/app

WORKDIR /var/app

EXPOSE 8080

CMD ["-u", "http://localhost:8088"]

ENTRYPOINT [ "node", "server.js" ]