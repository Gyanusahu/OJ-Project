# alpine For Lighter Version
FROM node:24-alpine  
WORKDIR /App
RUN apk update && apk add --no-cache g++
# COPY <local_Directory> <docker_Directory>
COPY . .
RUN npm install
EXPOSE 7000
CMD ["node","index.js"]
