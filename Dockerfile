FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev
COPY . .

EXPOSE 3000

# Run your app
CMD ["node", "server.js"]
