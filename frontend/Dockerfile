FROM node:alpine
WORKDIR './app'

COPY package.json .
COPY package-lock.json .
COPY . .
CMD ["npm", "start"]