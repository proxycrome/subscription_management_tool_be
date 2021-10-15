import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

let mongoServer;


// Connect to the in-memory database.
export const connect = async () => {
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const mongoURI = await mongoServer.getUri();
    
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

// Drop database, close the connection and stop mongod.
export const closeDatabase = async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
}; 

// Remove all the data for all db collections.

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}