import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { MongoAtlas } from 'src/services/mongo';

const hello = async (event) => {
  try {
    const result = await MongoAtlas.connect();
    return formatJSONResponse({
      message: `Hello desde mi nueva lambda`,
      mensage: result.connection.readyState,
    });
  } catch (err) {
    return formatJSONResponse({
      statusCode: 500,
      message: `Error`,
      mensage: err.message,
    });
  }
};

export const main = middyfy(hello);
