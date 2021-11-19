import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'ccinetto-sqs-example1',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
    queueName: 'receiverQueue',
  },
  plugins: ['serverless-esbuild'],
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
      QUEUE_NAME: '${self:custom.queueName}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sqs:SendMessage'],
            Resource: {
              'Fn::GetAtt': ['${self:custom.queueName}', 'Arn'],
            },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    sender: {
      handler: 'src/lambdas/sender/index.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'sender',
          },
        },
      ],
    },
    receiver: {
      handler: 'src/lambdas/receiver/index.handler',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['${self:custom.queueName}', 'Arn'],
            },
            batchSize: 10,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      receiverQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:custom.queueName}',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
