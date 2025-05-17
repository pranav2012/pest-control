import { getEnvSafely } from './config';

const NODE_ENV = getEnvSafely('NODE_ENV'); 

const env = {
  NODE_ENV,
};

export default env;
