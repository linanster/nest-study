FROM acr-on-enterprise-registry.cn-hangzhou.cr.aliyuncs.com/on-common/node:18.18.2

ARG PACKAGE

WORKDIR /app
 
RUN echo ${PACKAGE}
RUN wget ${PACKAGE} -O package.tgz
RUN tar xf package.tgz

# EXPOSE 8080

WORKDIR /app/micro-gateway-tcp
CMD [ "npm", "run", "start:prod" ]
