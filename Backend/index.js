const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const routes = require('./routes/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(cors());
const session = require('express-session');




app.use(session({
  secret: 'mysecret', // change this to a unique secret key
  resave: false,
  saveUninitialized: true
}));


/*
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//#region 
// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API'
    },
  },
  apis: ['./Backend/routes/*.js'] // Path to the API routes

};
// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//#endregion
app.use('/', routes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = { app };