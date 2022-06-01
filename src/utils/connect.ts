import mongoose from 'mongoose';
import config from 'config';

const connectDB = async () => {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        console.log('DB Connected successfully')
    } catch (error) {
        console.error("Could not connect to DB")
        process.exit(1)
    }
}


export default connectDB;