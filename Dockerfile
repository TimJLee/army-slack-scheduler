FROM node:14-alpine as base
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start"]