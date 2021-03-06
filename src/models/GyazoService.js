import Base from './Base';

class GyazoService extends Base {
  get storeName() {
    return 'GyazoService';
  }

  get schema() {
    return {
      properties: {
        name: {
          type: 'string'
        },
        uri: {
          type: 'string'
        },
        gyazoId: {
          type: 'string'
        },
        useProxy: {
          type: 'boolean'
        }
      }
    };
  }
}

export default GyazoService;
