import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import mainRouter from '../routes';

const app = express();
const publicPath = path.resolve(__dirname, '../../public');

app.use(express.static(publicPath));
app.use(express.json());

app.use('/api', mainRouter);

//https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.code || 500;
  const message = err.message || 'Internal Server Error';
  console.log(`HUBO UN ERROR ${err}`);
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

app.use(errorHandler);

export default app;
