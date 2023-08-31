import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.lfz09.mongodb.net/mySecondDatabase?retryWrites=true&w=majority`;

const databaseConnection = {
    getConnect: () => {
        mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database connected successfully'))
            .catch((err) => console.log(err));
    }
};

export default databaseConnection;