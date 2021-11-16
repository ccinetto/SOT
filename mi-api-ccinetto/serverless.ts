import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getMongoString from '@functions/get-mongo-string';

const serverlessConfiguration: AWS = {
  service: 'mi-api-ccinetto',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MONGO_SRV: '${env:MONGO_SRV}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, getMongoString },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
