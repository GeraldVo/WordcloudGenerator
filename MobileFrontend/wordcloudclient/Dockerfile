FROM node:14
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve","--", "--port 8081"]
EXPOSE 8081

