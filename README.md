## Build your dream

### 服务器Aliyun

环境准备

```
106.15.89.47 root/P******tgU6R2LdU@M9EqZ
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service

 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release


curl -fsSL test.docker.com -o get-docker.sh && sh get-docker.sh
usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```



构建发布到aliyun容器仓库

```
# 拉取
$ docker login --username=yww3571373 registry.cn-hangzhou.aliyuncs.com
$ docker pull registry.cn-hangzhou.aliyuncs.com/yinweiwen/public:[镜像版本号]

# 推送镜像
$ docker login --username=yww3571373 --password=${{secrets.ALI_DOCKER_CREDENTIALS }} registry.cn-hangzhou.aliyuncs.com
$ docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/yinweiwen/public:[镜像版本号]
$ docker push registry.cn-hangzhou.aliyuncs.com/yinweiwen/public:[镜像版本号]
```



workflow github

```xml
```

