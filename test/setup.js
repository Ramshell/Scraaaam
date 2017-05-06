import mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

let mockgoose = new Mockgoose(mongoose);

export function setupMocha() {
  before("Mock mongoose", async() => {
    await mockgoose.prepareStorage().then(() => {
  	mongoose.createConnection('mongodb://localhost/projects');
  	mongoose.connection.on('connected', () => {
    	  console.log('db connection is now open');
    	});
    });
  })

  afterEach("Reset mock mongo database", done => {
    mockgoose.helper.reset().then(() => {
      done()
    });
  })
}
