import { miApp } from './services/server';
import serverless from 'serverless-http';
import { handlerPath } from './utils/handlerResolver';
import { MongoAtlas } from './services/mongoDB';
const handler = serverless(miApp);

module.exports.handler = async (event, context) => {
  // Make sure to add this so you can re-use global variables between function calls.
  context.callbackWaitsForEmptyEventLoop = false;
  await MongoAtlas.connect();
  const result = await handler(event, context);
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
