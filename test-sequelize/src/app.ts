const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require("morgan");
const router = express.Router();
const user = require("./controller/user.controller");
const port: number = 3000;

import apiRouter from './routers';
import { Request, Response } from "express";
import { sequelize } from './config/Connection';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use('/api', apiRouter);
app.use('/', router);

app.use((err, req, res, next) => {
    res.status(404).json({
      message: err.message,
    });
});

app.listen(port, () => {
    console.log("app listening on port 3000!");
});