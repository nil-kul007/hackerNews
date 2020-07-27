# build ===============================
FROM node:10 as build

WORKDIR /hackerNews

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM node:10-alpine as run

WORKDIR /hackerNews

COPY --from=build /hackerNews .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
