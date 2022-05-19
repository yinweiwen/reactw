
FROM repository.anxinyun.cn/base-images/nodejs12:20.10.12.2

MAINTAINER liuxinyi "liu.xinyi@free-sun.com.cn"

COPY . /var/app

WORKDIR /var/app

EXPOSE 8080

CMD ["-g", "postgres://FashionAdmin:123456@iota-m1:5433/SmartRiver", "--qnak", "5XrM4wEB9YU6RQwT64sPzzE6cYFKZgssdP5Kj3uu", "--qnsk", "w6j2ixR_i-aelc6I7S3HotKIX-ukMzcKmDfH6-M5", "--qnbkt", "anxinyun-test", "--qndmn", "http://test.resources.anxinyun.cn"]

ENTRYPOINT [ "node", "server.js" ]
