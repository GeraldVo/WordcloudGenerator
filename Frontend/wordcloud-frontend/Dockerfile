FROM node:14
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve"]
EXPOSE 8080