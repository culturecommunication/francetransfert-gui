import Flow from '@flowjs/flow.js';
import { environment as env } from '../../../environments/environment';
export const FLOW_CONFIG: Flow.FlowOptions = {
  target: `${env.host}${env.apis.upload}`,
  chunkSize: 1024 * 1024 * 5, // 5 Mo
  testChunks: false
};
