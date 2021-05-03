import { ConnectionOptions, connect } from 'mongoose';
import logger from './configs/logger.config';
import app from './configs/express.config';

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    let auth = '';
    if (process.env.MONGO_USERNAME !== '' && process.env.MONGO_PASSWORD !== '') {
      auth = `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@`;
    }
    const mongoUri: string = `mongodb://${auth}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoUri, options);

    logger.info('Connect to database successfully');

    app.listen(PORT, () => {
      logger.info(`Server is running at ${PORT}`);
    });
  } catch (e) {
    logger.info(`The connection to database was failed with error: ${e}`);
  }
}

bootstrap();
