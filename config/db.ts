import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
// import Log from '../middlewares/Log';

export class Database {
	// Initialize your database pool
	public static init (): any {
		var dsn:any = process.env.MONGODB_URI;
		const options: any  = { useNewUrlParser: true, useUnifiedTopology: true};

		// (<any>mongoose).Promise = bluebird;

		// mongoose.set('useCreateIndex', true);

		mongoose.connect(dsn, options, (error: any) => {
			// handle the error case
			if (error) {
				// Log.info('Failed to connect to the Mongo server!!');
				console.log(error);
				throw error;
			} else {
        console.log("connected to mongo server at:" + dsn)
				// Log.info('connected to mongo server at: ' + dsn);
			}
		});
	}
}

export default mongoose;