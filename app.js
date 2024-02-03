const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));
const connectDatabase = require("./config/database.js")
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');

const { IPlog } = require("./controllers/ipController");

// setup config vars
dotenv.config({
  path: "./config/config.env",
});

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});


app.use(IPlog);
// Set up body parser
app.use(bodyParser.urlencoded({ extended : true }));
 
// parse application/json
app.use(bodyParser.json())

connectDatabase()
// import routes
const ips = require('./routes/ip.js');

// register routes
app.use('/',ips)

// register test endpoint on root domain : For testing purpose
// app.use('/',jobs)

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);
app.use(express.json())

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled promise rejection.')
    server.close( () => {
        process.exit(1);
    }) 
});
