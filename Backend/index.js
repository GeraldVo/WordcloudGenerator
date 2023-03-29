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