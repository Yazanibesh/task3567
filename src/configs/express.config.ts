import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import constants from '../constants';
import indexRoute from '../routes/index.route';
import joiErrorHandler from '../middlewares/joi-error-handler.middleware';
import { notFoundErrorHandler, errorHandler } from '../middlewares/api-error-handler.middleware';

const app = express();

require('dotenv').config();

app.use((req, res, next) => {
  const origin = req.get('origin');

  console.log(req.method, origin);

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(cors({ credentials: true }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(helmet());

// Router
app.use(constants.APPLICATION.url.basePath, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);

// Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
