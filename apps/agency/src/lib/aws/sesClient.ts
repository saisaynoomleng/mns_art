import { SESClient } from '@aws-sdk/client-ses';
import { env } from '../env/server';

export const sesClient = () => {
  return new SESClient({
    region: env.AWS_REGION,
    credentials: {
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: env.AWS_ACCESS_KEY,
    },
  });
};
