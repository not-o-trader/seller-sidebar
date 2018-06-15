FROM node:10.4.1-alpine
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 5500
ENV PORT 5500
CMD ["node", "server/index.js"]
