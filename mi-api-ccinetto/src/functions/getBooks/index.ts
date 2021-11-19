import { handlerPath } from '@libs/handlerResolver';
import { formatJSONResponse } from '@libs/apiGateway';
import { MongoAtlas } from 'src/services/mongo';

export const handler = async (event, context) => {
  // Make sure to add this so you can re-use global variables between function calls.
  context.callbackWaitsForEmptyEventLoop = false;

  const output = {
    statusCode: 200,
    data: undefined,
  };

  try {
    await MongoAtlas.connect();

    const { LibroModel } = await MongoAtlas.getModels();

    if (event.pathParameters && event.pathParameters.id) {
      const { id } = event.pathParameters;

      if (!MongoAtlas.isValidId(id)) {
        output.statusCode = 400;
        output.data = { msg: 'Id Invalido' };
        return formatJSONResponse(output);
      }

      const object = await LibroModel.findById(event.pathParameters.id);

      if (!object) {
        output.statusCode = 404;
        output.data = { msg: 'Libro no encontrado' };
        return formatJSONResponse(output);
      }

      output.data = object;
      return formatJSONResponse(output);
    }

    output.data = await LibroModel.find();

    return formatJSONResponse(output);
  } catch (err) {
    output.statusCode = 500;
    output.data = err.message;
    return formatJSONResponse(output);
  }
};

export const GetBooks = {
  handler: `${handlerPath(__dirname)}/index.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'books',
      },
    },
    {
      http: {
        method: 'get',
        path: 'books/{id}',
      },
    },
  ],
};
