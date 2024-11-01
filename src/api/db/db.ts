import mongoose, { Error } from 'mongoose';

const connectDB = async (): Promise<void> => {
  // DB Config
  const db: string | undefined = process.env.MONGO_URL;

  if (!db) {
    throw new Error('Please define the MONGO_URL environment variable');
  }

  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  } catch (error: any) {
    console.error('Error', error.message);
    process.exit(1);
  }
};

export default connectDB;
