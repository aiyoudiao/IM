# FROM node:16

# ENV port=8090
# COPY . .

# RUN yarn
# RUN yarn build

# EXPOSE 8090
# CMD [ "node", "./dist/main.js" ]

FROM node:20

WORKDIR /app

COPY package.json ./

COPY .env ./

COPY ./ ./

RUN yarn install


# # RUN rm -f apps/api/.env

RUN yarn build



EXPOSE 5003
CMD ["node", "./dist/main.js"]
