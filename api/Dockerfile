FROM node:8.10.0
WORKDIR '/app'
COPY package.json ./
RUN npm install --unsafe-perm
COPY . .
EXPOSE 8080
CMD ["npm","start"]

