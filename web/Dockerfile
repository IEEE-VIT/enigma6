# FROM node:latest as builder
# WORKDIR '/app'
# COPY package.json ./
# RUN npm install --build-from-resource --unsafe-perm
# COPY ./ ./
# RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
COPY /build /usr/share/nginx/html
