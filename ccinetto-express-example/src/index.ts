import expressApp from './services/server';
import serverless from 'serverless-http';
import { handlerPath } from './utils/handlerResolver';
import { MongoAtlas } from './services/mongoDB';
const handler = serverless(expressApp);

module.exports.handler = async (event, context) => {
  // you can do other things here
  await MongoAtlas.init();
  const result = await handler(event, context);
  // and here
  return result;
};

export const api = {
  handler: `${handlerPath(__dirname)}/index.handler`,
  events: [
    {
      httpApi: '*',
    },
  ],
};
